import { ModalWrapper } from "../../../../shared/components/modal_wrapper";
import { Button } from "../../../../shared/components/button";
import { Input } from "../../../../shared/components/input";
import { FieldWrapper } from "../../../../shared/components/field_wrapper";
import cl from "./modal_styles.module.css";
import { Select } from "../../../../shared/components/select";

type Props = {
  onWrapperClick?: () => void;
};

export const NewTaskModal = ({ onWrapperClick }: Props) => {
  return (
    <ModalWrapper onWrapperClick={onWrapperClick}>
      <h2 className={cl.modal_title} data-testid="new-task-modal">
        Add New Task
      </h2>
      <FieldWrapper fieldName={"Task name"}>
        <Input withDelete={false} />
      </FieldWrapper>
      <FieldWrapper fieldName={"Description"}>
        <textarea
          className={cl.textarea}
          spellCheck={false}
          placeholder="e.g. It's always good to take a break..."
        />
      </FieldWrapper>
      <FieldWrapper fieldName={"Subtasks"} clName="style_container">
        <Input withDelete={true} />
        <Input withDelete={true} />
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
    </ModalWrapper>
  );
};
