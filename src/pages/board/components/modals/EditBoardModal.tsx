import { Button } from "../../../../shared/components/button";
import { FieldWrapper } from "../../../../shared/components/field_wrapper";
import { Input } from "../../../../shared/components/input";
import { ModalWrapper } from "../../../../shared/components/modal_wrapper";
import cl from "./modal_styles.module.css";

export const EditBoardModal = () => {
  return (
    <ModalWrapper>
      <h2 className={cl.modal_title} data-testid="edit-board-modal">
        Edit Board
      </h2>
      <FieldWrapper fieldName="Board Name">
        <Input withDelete={false} />
      </FieldWrapper>
      <FieldWrapper fieldName="Board Columns" clName="style_container">
        <Input withDelete={true} />
        <Input withDelete={true} />
        <Input withDelete={true} />
      </FieldWrapper>
      <Button
        text={"Add New Column"}
        withIcon={true}
        testid={"add-new-column-btn"}
      />
      <Button
        text={"Save Changes"}
        withIcon={false}
        newClass="center"
        testid={"save-changes-btn"}
      />
    </ModalWrapper>
  );
};
