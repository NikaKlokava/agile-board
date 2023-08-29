import { FieldWrapper } from "../../../../shared/components/field_wrapper";
import { ModalWrapper } from "../../../../shared/components/modal_wrapper";
import { Select } from "../../../../shared/components/select";
import cl from "./modal_styles.module.css";

type Props = {
  onWrapperClick?: () => void;
};

export const TaskModal = ({ onWrapperClick }: Props) => {
  return (
    <ModalWrapper onWrapperClick={onWrapperClick}>
      <h2 className={cl.modal_task_title} data-testid="task-modal">
        Task name
      </h2>
      <p className={cl.description}>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aut porro
        placeat voluptatum eius!
      </p>
      <FieldWrapper fieldName={"Subtasks (0 of 2)"}>
        <div className={cl.subtasks_checkbox}>
          <input type={"checkbox"} className={cl.checkbox} id="first" />
          <p>Something doing...</p>
        </div>
      </FieldWrapper>
      <FieldWrapper fieldName={"Current Status"}>
        <Select />
      </FieldWrapper>
    </ModalWrapper>
  );
};
