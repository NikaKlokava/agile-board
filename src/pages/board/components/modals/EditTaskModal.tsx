import { Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import {
  editTask,
  moveTask,
} from "../../../../redux/actionCreators/newBoardCreator";
import { Button } from "../../../../shared/components/button";
import { DescriptionField } from "../../../../shared/components/description/DescriptionField";
import { FieldWrapper } from "../../../../shared/components/field_wrapper";
import { Input } from "../../../../shared/components/input";
import { ModalWrapper } from "../../../../shared/components/modal_wrapper";
import { Select } from "../../../../shared/components/select";
import { FieldName } from "../../../../shared/components/field_name";
import { useState } from "react";
import cl from "./modal_styles.module.css";
import { EditTaskSchema } from "../../../../utils/utils";

type Props = {
  taskUuid: string;
  onClose: () => void;
  onTaskModalClose: () => void;
};

export const EditTaskModal = ({
  taskUuid,
  onClose,
  onTaskModalClose,
}: Props) => {
  const activeBoard = useSelector<RootState, BoardType>(
    (state) => state.activeBoard
  );

  const tasks = useSelector<RootState, TasksType>((state) => state.tasks.tasks);
  const taskIndex = tasks.findIndex((task) => task.uuid === taskUuid);
  const task = tasks[taskIndex];

  const columnIndex = activeBoard.columns.findIndex(
    (column) => column.uuid === task.columnUuid
  );
  const column = activeBoard.columns[columnIndex].title;

  const [subtasks, setSubtasks] = useState<number>(task.subtasks.length);

  const dispatch = useDispatch();

  const handleSubmit = (values: EditTaskType) => {
    const columnIndex = activeBoard.columns.findIndex(
      (column) => column.title === values.columnTitle
    );
    const columnUuid = activeBoard.columns[columnIndex].uuid;

    const subtasks = values.subtasks.filter(
      (subtask) => subtask?.text && subtask.text.trimStart().length !== 0
    );
    dispatch(moveTask(taskUuid, columnUuid));
    dispatch(editTask(taskUuid, values.title, values.description, subtasks));

    onClose();
    onTaskModalClose();
  };
  return (
    <ModalWrapper onWrapperClick={onClose}>
      <Formik
        initialValues={{
          title: task.title,
          description: task.description,
          subtasks: task.subtasks,
          columnTitle: column,
        }}
        validationSchema={EditTaskSchema}
        onSubmit={(values) => handleSubmit(values)}
      >
        {({ values, handleSubmit }) => (
          <>
            <h2 className={cl.modal_title} data-testid="new-task-modal">
              Add New Task
            </h2>
            <FieldName name={values.title} formikName="title" />
            <DescriptionField description={values.description} />
            <FieldWrapper fieldName={"Subtasks"}>
              {Array.from({ length: subtasks }, (_, index) => (
                <Input
                  key={index}
                  formikName={`subtasks[${index}].text`}
                  defaultVal={task.subtasks[index]?.text}
                />
              ))}
              <Button
                text="Add New Subtask"
                withIcon={true}
                testid={"add-new-subtask-btn"}
                onClick={() => setSubtasks((prev) => prev + 1)}
              />
            </FieldWrapper>
            <FieldWrapper fieldName="Current Status">
              <Select colUuid={task.columnUuid} />
            </FieldWrapper>
            <Button
              text="Save Edit"
              withIcon={false}
              newClass="center"
              testid={"create-task-btn"}
              onClick={handleSubmit}
            />
          </>
        )}
      </Formik>
    </ModalWrapper>
  );
};
