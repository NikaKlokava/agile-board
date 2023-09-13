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
import { TaskSchema } from "../../../../utils/utils";
import { FieldName } from "../../../../shared/components/field_name";
import { DescriptionField } from "../../../../shared/components/description/DescriptionField";

type Props = {
  onClose?: () => void;
};

export const NewTaskModal = ({ onClose }: Props) => {
  const [subtasks, setSubtasks] = useState<number>(2);

  const activeBoard = useSelector<RootState, BoardType>(
    (state) => state.activeBoard
  );
  const dispatch = useDispatch();

  const initialTaskData = {
    boardUuid: "",
    columnTitle: activeBoard.columns[0]?.title,
    title: "",
    description: "",
    subtasks: [{ uuid: "", text: "", checked: false }],
  };

  return (
    <ModalWrapper onWrapperClick={onClose}>
      <Formik
        initialValues={initialTaskData}
        validationSchema={TaskSchema}
        onSubmit={(values) => {
          const columnUuid = activeBoard.columns.find(
            (column) => column?.title === values.columnTitle
          )?.uuid;
          const subtasks = values.subtasks.filter(
            (subtask) =>
              subtask?.text !== undefined && subtask?.text.trimStart().length !== 0
          );
          dispatch(
            addNewTask({
              boardUuid: activeBoard.uuid,
              columnUuid: columnUuid!,
              title: values.title,
              description: values.description,
              subtasks: subtasks,
            })
          );
          onClose!();
        }}
      >
        {(props) => (
          <>
            <h2 className={cl.modal_title} data-testid="new-task-modal">
              Add New Task
            </h2>
            <FieldName formikName="title" />
            <DescriptionField />
            <FieldWrapper fieldName={"Subtasks"} clName="style_container">
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
