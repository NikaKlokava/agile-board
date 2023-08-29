import { Button } from "../../../../shared/components/button";
import { ModalWrapper } from "../../../../shared/components/modal_wrapper";
import cl from "./modal_styles.module.css";

type Props = {
  onWrapperClick?: () => void;
};

export const DeleteBoardModal = ({ onWrapperClick }: Props) => {
  return (
    <ModalWrapper onWrapperClick={onWrapperClick}>
      <h2 className={cl.title} data-testid="delete-board">
        Delete this board?
      </h2>
      <p className={cl.description}>
        Are you sure you want to delete the "Platform Launch" board? This action
        will remove all columns and tasks and cannot be reversed.
      </p>
      <div className={cl.btns_container}>
        <Button
          text={"Delete"}
          withIcon={false}
          testid={"delete-btn"}
          newClass="delete"
        />
        <Button
          text={"Cancel"}
          withIcon={false}
          testid={"delete-btn"}
          newClass="cancel"
          onClick={onWrapperClick}
        />
      </div>
    </ModalWrapper>
  );
};
