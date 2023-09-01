import { ModalWrapper } from "../../../../shared/components/modal_wrapper";
import { Button } from "../../../../shared/components/button";
import { FieldWrapper } from "../../../../shared/components/field_wrapper";
import { Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { addNewTask } from "../../../../redux/actionCreators/newBoardCreator";
import { Input } from "../../../../shared/components/input";
import { useState } from "react";
import { Field } from "formik";
import cl from "./modal_styles.module.css";

type Props = {
  onClose?: () => void;
};

export const NewTaskModal = ({ onClose }: Props) => {
  const [subtasks, setSubtasks] = useState<number>(2);
  const storeData = useSelector<RootState, Boards>((state) => state.boards);

  const selectedBoard = storeData.find((elem) => elem.selected === true);

  const dispatch = useDispatch();

  const initialTaskData = {
    column: selectedBoard?.board_columns[0].title,
    taskName: "",
    description: "",
    subtasks: [],
  };

  return (
    <ModalWrapper onWrapperClick={onClose}>
      <Formik
        initialValues={initialTaskData}
        onSubmit={(values) => {
          dispatch(
            addNewTask(
              selectedBoard!.name,
              values.column!,
              values.taskName,
              values.description,
              values.subtasks
            )
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
                name={"taskName"}
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
                <Input
                  index={index}
                  key={index}
                  formikName={`subtasks[${index}]`}
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
              {/* <Select /> */}
              <Field
                as="select"
                name="column"
                onChange={props.handleChange}
                // onBlur={props.handleBlur}
              >
                {/* <option selected disabled hidden value=""></option> */}
                {selectedBoard?.board_columns.map((column, i) => (
                  <option key={i}>{column.title}</option>
                ))}
              </Field>
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
