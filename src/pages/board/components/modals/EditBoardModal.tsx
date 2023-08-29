import { MockBoards } from "../../../../mocks/BoardMocks";
import { Button } from "../../../../shared/components/button";
import { FieldWrapper } from "../../../../shared/components/field_wrapper";
import { Input } from "../../../../shared/components/input";
import { ModalWrapper } from "../../../../shared/components/modal_wrapper";
import cl from "./modal_styles.module.css";

type Props = {
  onWrapperClick?: () => void;
};

export const EditBoardModal = ({ onWrapperClick }: Props) => {
  const data = MockBoards;
  return (
    <ModalWrapper onWrapperClick={onWrapperClick}>
      <h2 className={cl.modal_title} data-testid="edit-board-modal">
        Edit Board
      </h2>
      <FieldWrapper fieldName="Board Name">
        <Input withDelete={false} value={data[0].name} />
      </FieldWrapper>
      <FieldWrapper fieldName="Board Columns" clName="style_container">
        {data[0].board_column.map((column) => {
          return <Input withDelete={true} value={column.title} />;
        })}
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
