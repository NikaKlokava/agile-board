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
  taskUuid: string | undefined;
  onClose?: () => void;
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
  const task = tasks.find((task) => task.uuid === taskUuid);
  const column = activeBoard.columns.find(
    (column) => column.uuid === task?.columnUuid
  )?.title;

  const [subtasks, setSubtasks] = useState<number>(
    task ? task.subtasks.length : 2
  );

  const dispatch = useDispatch();

  return (
    <ModalWrapper onWrapperClick={onClose}>
      <Formik
        initialValues={{
          title: task?.title,
          description: task?.description,
          subtasks: task?.subtasks,
          columnTitle: column,
        }}
        validationSchema={EditTaskSchema}
        onSubmit={(values) => {
          const columnUuid = activeBoard.columns.find(
            (column) => column.title === values.columnTitle
          )?.uuid;
          const subtasks = values.subtasks?.filter(
            (subtask) => subtask?.text.trimStart().length !== 0
          );
          if (taskUuid && columnUuid) dispatch(moveTask(taskUuid, columnUuid));

          if (taskUuid && values.title && values.description && subtasks)
            dispatch(
              editTask(taskUuid, values.title, values.description, subtasks)
            );

          onClose?.();
          onTaskModalClose();
        }}
      >
        {({ values, handleSubmit }) => (
          <>
            <h2 className={cl.modal_title} data-testid="new-task-modal">
              Add New Task
            </h2>
            <FieldName name={values.title} formikName="title" />
            <DescriptionField description={values.description} />
            <FieldWrapper fieldName={"Subtasks"} clName="style_container">
              {Array.from({ length: subtasks }, (_, index) => (
                <Input
                  key={index}
                  formikName={`subtasks[${index}].text`}
                  defaultVal={task?.subtasks[index]?.text}
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
              <Select colUuid={task?.columnUuid} />
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
