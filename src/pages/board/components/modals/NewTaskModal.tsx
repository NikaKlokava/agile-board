import { ModalWrapper } from "../../../../shared/components/modal_wrapper";
import { Button } from "../../../../shared/components/button";
import { FieldWrapper } from "../../../../shared/components/field_wrapper";
import cl from "./modal_styles.module.css";
import { Select } from "../../../../shared/components/select";
import { Formik } from "formik";
import { initialData } from "../../../../utils/utils";

type Props = {
  onClose?: () => void;
};

export const NewTaskModal = ({ onClose }: Props) => {
  return (
    <ModalWrapper onWrapperClick={onClose}>
      <Formik
        initialValues={initialData}
        onSubmit={(values) => {
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
                // name={`board_columns[${index}]`}
              />
            </FieldWrapper>
            <FieldWrapper fieldName={"Description"}>
              <textarea
                className={cl.textarea}
                spellCheck={false}
                placeholder="e.g. It's always good to take a break..."
                onChange={props.handleChange}
              />
            </FieldWrapper>
            <FieldWrapper fieldName={"Subtasks"} clName="style_container">
              {/* <Input  />
        <Input /> */}
              <Button
                text="Add New Subtask"
                withIcon={true}
                testid={"add-new-subtask-btn"}
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
            />
          </>
        )}
      </Formik>
    </ModalWrapper>
  );
};
