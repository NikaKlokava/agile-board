import { ModalWrapper } from "../../../../shared/components/modal_wrapper";
import { Button } from "../../../../shared/components/button";
import { FieldWrapper } from "../../../../shared/components/field_wrapper";
import { Formik } from "formik";
import { Input } from "../../../../shared/components/input";
import { useDispatch, useSelector } from "react-redux";
import { addNewTask } from "../../../../redux/actionCreators/newBoardCreator";
import cl from "./modal_styles.module.css";
import { useState } from "react";
import { Select } from "../../../../shared/components/select";
import { initialTaskData, TaskSchema } from "../../../../utils/utils";
import { FieldName } from "../../../../shared/components/field_name";
import { DescriptionField } from "../../../../shared/components/description/DescriptionField";

type Props = {
  onClose: () => void;
};

export const NewTaskModal = ({ onClose }: Props) => {
  const [subtasks, setSubtasks] = useState<number>(2);

  const activeBoard = useSelector<RootState, BoardType>(
    (state) => state.activeBoard
  );
  const dispatch = useDispatch();

  const initialData = {
    ...initialTaskData,
    columnTitle: activeBoard.columns[0].title,
  };

  const handleSubmit = (values: NewTaskType) => {
    const columnIndex = activeBoard.columns.findIndex(
      (column) => column.title === values.columnTitle
    );
    const columnUuid = activeBoard.columns[columnIndex].uuid;

    const subtasks = values.subtasks.filter(
      (subtask) =>
        subtask?.text  && subtask.text.trimStart().length !== 0
    );
    dispatch(
      addNewTask({
        boardUuid: activeBoard.uuid,
        columnUuid: columnUuid,
        title: values.title,
        description: values.description,
        subtasks: subtasks,
      })
    );
    onClose();
  };

  return (
    <ModalWrapper onWrapperClick={onClose}>
      <Formik
        initialValues={initialData}
        validationSchema={TaskSchema}
        onSubmit={(values) => handleSubmit(values)}
      >
        {(props) => (
          <>
            <h2 className={cl.modal_title} data-testid="new-task-modal">
              Add New Task
            </h2>
            <FieldName formikName="title" />
            <DescriptionField />
            <FieldWrapper fieldName={"Subtasks"}>
              {Array.from({ length: subtasks }, (_, index) => (
                <Input key={index} formikName={`subtasks[${index}].text`} />
              ))}
            </FieldWrapper>
            <Button
              text="Add New Subtask"
              withIcon={true}
              testid={"add-new-subtask-btn"}
              onClick={() => setSubtasks((prev) => prev + 1)}
            />
            <FieldWrapper fieldName="Current Status">
              <Select />
            </FieldWrapper>
            <Button
              text="Create Task"
              withIcon={false}
              newClass="center"
              testid={"create-task-btn"}
              onClick={props.handleSubmit}
            />
          </>
        )}
      </Formik>
    </ModalWrapper>
  );
};
