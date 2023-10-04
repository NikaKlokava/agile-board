import { useDispatch, useSelector } from "react-redux";
import {
  deleteACtiveBoard,
  deleteBoard,
  deleteTask,
} from "../../../../redux/actionCreators/newBoardCreator";
import { Button } from "../../../../shared/components/button";
import { ModalWrapper } from "../../../../shared/components/modal_wrapper";
import cl from "./modal_styles.module.css";

type Props = {
  type: "board" | "task";
  activeName: string | undefined;
  taskUuid: string;
  onClose: () => void;
};

export const DeleteModal = ({ type, activeName, taskUuid, onClose }: Props) => {
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
          type="button"
          onClick={() => {
            if (type === "board") {
              dispatch(deleteBoard(activeBoard.uuid));
              dispatch(deleteACtiveBoard());
            } else {
              dispatch(deleteTask(taskUuid));
            }
            onClose();
          }}
        />
        <Button
          text={"Cancel"}
          withIcon={false}
          testid={"delete-btn"}
          newClass="cancel"
          type="button"
          onClick={onClose}
        />
      </div>
    </ModalWrapper>
  );
};
