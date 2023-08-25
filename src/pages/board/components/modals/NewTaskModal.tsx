import { ModalWrapper } from "../../../../shared/components/modal_wrapper";
import { Button } from "../../../../shared/components/button";
import { Input } from "../../../../shared/components/input";
import { FieldWrapper } from "../../../../shared/components/field_wrapper";
import cl from "./modal_styles.module.css";

export const NewTaskModal = () => {
  return (
    <ModalWrapper>
      <h2 className={cl.modal_title}>Add New Task</h2>
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
        <Button text="Add New Subtask" withIcon={true} />
      </FieldWrapper>
      <FieldWrapper fieldName="Current Status">
        <select className={cl.select_container}>
          <option>Todo</option>
          <option>Doing</option>
          <option>Done</option>
        </select>
      </FieldWrapper>
      <Button text="Create Task" withIcon={false} newClass="center" />
    </ModalWrapper>
  );
};
