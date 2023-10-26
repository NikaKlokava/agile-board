import { useAppDispatch, useAppSelector } from "../../../../redux/hooks/hook";
import { deleteActiveBoard } from "../../../../redux/reducers/activeBoardSlice";
import { deleteBoard } from "../../../../redux/reducers/boardsSlice";
import { deleteTask } from "../../../../redux/reducers/tasksSlice";
import {
  deleteUserBoard,
  deleteUserTask,
} from "../../../../redux/thunk/saveDataThunk";
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
  const activeBoard = useAppSelector((state) => state.activeBoard);

  const dispatch = useAppDispatch();
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
              dispatch(deleteBoard({ uuid: activeBoard.uuid }));
              dispatch(deleteActiveBoard());
              dispatch(deleteUserBoard(activeBoard.uuid));
            } else {
              dispatch(deleteTask({ uuid: taskUuid }));
              dispatch(deleteUserTask(taskUuid));
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
