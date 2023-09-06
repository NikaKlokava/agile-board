import { ModalWrapper } from "../../../../shared/components/modal_wrapper";
import { Button } from "../../../../shared/components/button";
import { FieldWrapper } from "../../../../shared/components/field_wrapper";
import { Formik } from "formik";
import { Input } from "../../../../shared/components/input";
import { useDispatch, useSelector } from "react-redux";
// import { initialTaskData } from "../../../../utils/utils";
import { addNewTask } from "../../../../redux/actionCreators/newBoardCreator";
import cl from "./modal_styles.module.css";
import { useState } from "react";
import { Select } from "../../../../shared/components/select";

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
    boardUuid: "init",
    columnTitle: activeBoard.columns[0].title,
    title: "init",
    description: "init",
    subtasks: [{ uuid: "", text: "init", checked: false }],
  };

  return (
    <ModalWrapper onWrapperClick={onClose}>
      <Formik
        initialValues={initialTaskData}
        onSubmit={(values) => {
          const columnUuid = activeBoard.columns.find(
            (column) => column.title === values.columnTitle
          )?.uuid;

          const subtasks = values.subtasks.filter(
            (subtask) => subtask.text !== undefined
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
            <FieldWrapper fieldName={"Task name"}>
              <input
                type={"text"}
                placeholder="e.g Take coffee break"
                spellCheck={false}
                className={cl.input_style}
                autoComplete="off"
                onChange={props.handleChange}
                name={"title"}
              />
            </FieldWrapper>
            <FieldWrapper fieldName={"Description"}>
              <textarea
                className={cl.textarea}
                spellCheck={false}
                placeholder="e.g. It's always good to take a break..."
                onChange={props.handleChange}
                name="description"
              />
            </FieldWrapper>
            <FieldWrapper fieldName={"Subtasks"} clName="style_container">
              {Array.from({ length: subtasks }, (_, index) => (
                <Input key={index} formikName={`subtasks[${index}].text`} />
              ))}
              <Button
                text="Add New Subtask"
                withIcon={true}
                testid={"add-new-subtask-btn"}
                onClick={() => setSubtasks((prev) => prev + 1)}
              />
            </FieldWrapper>
            <FieldWrapper fieldName="Current Status">
              <Select />
            </FieldWrapper>
            <Button
              text="Create Task"
              withIcon={false}
              newClass="center"
              testid={"create-tas-btn"}
              onClick={props.handleSubmit}
            />
          </>
        )}
      </Formik>
    </ModalWrapper>
  );
};
