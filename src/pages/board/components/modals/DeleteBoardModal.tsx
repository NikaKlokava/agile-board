import { useDispatch, useSelector } from "react-redux";
import {
  deleteACtiveBoard,
  deleteBoard,
} from "../../../../redux/actionCreators/newBoardCreator";
import { Button } from "../../../../shared/components/button";
import { ModalWrapper } from "../../../../shared/components/modal_wrapper";
import cl from "./modal_styles.module.css";

type Props = {
  type: "board" | "task";
  activeName: string;
  onClose?: () => void;
};

export const DeleteBoardModal = ({ type, activeName, onClose }: Props) => {
  const activeBoard = useSelector<RootState, BoardType>(
    (state) => state.activeBoard
  );

  const dispatch = useDispatch();
  return (
    <ModalWrapper onWrapperClick={onClose}>
      <h2 className={cl.title} data-testid="delete-board">
        {`Delete this ${type}?`}
      </h2>
      <p className={cl.description}>
        {`Are you sure you want to delete the "${activeName}" ${type}? ${
          type === "board"
            ? "This action will remove all columns and tasks and cannot be reversed."
            : "This action will remove task and cannot be reversed."
        }`}
      </p>
      <div className={cl.btns_container}>
        <Button
          text={"Delete"}
          withIcon={false}
          testid={"delete-btn"}
          newClass="delete"
          onClick={() => {
            if (type === "board") {
              onClose!();
              dispatch(deleteBoard(activeBoard.uuid));
              dispatch(deleteACtiveBoard());
            }
          }}
        />
        <Button
          text={"Cancel"}
          withIcon={false}
          testid={"delete-btn"}
          newClass="cancel"
          onClick={onClose}
        />
      </div>
    </ModalWrapper>
  );
};
