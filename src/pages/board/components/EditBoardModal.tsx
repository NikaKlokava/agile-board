import { Button } from "../../../shared/components/button";
import { FieldWrapper } from "../../../shared/components/field_wrapper";
import { Input } from "../../../shared/components/input";
import { ModalWrapper } from "../../../shared/components/modal_wrapper";
import cl from "./styles/edit_board_modal.module.css";

export const EditBoardModal = () => {
  return (
    <ModalWrapper>
      <h2 className={cl.add_task_title}>Edit Board</h2>
      <FieldWrapper fieldName="Board Name">
        <Input withDelete={false} />
      </FieldWrapper>
      <FieldWrapper fieldName="Board Columns" clName="style_container">
        <Input withDelete={true} />
        <Input withDelete={true} />
        <Input withDelete={true} />
      </FieldWrapper>
      <Button text={"Add New Column"} withIcon={true} />
      <Button text={"Save Changes"} withIcon={false} newClass="center" />
    </ModalWrapper>
  );
};
