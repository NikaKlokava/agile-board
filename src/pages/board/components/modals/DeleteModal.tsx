import { auth } from "../../../../firebase";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks/hook";
import { deleteActiveBoard } from "../../../../redux/reducers/activeBoardSlice";
import { deleteBoard } from "../../../../redux/reducers/boardsSlice";
import {
  deleteTask,
  deleteTaskData,
} from "../../../../redux/reducers/tasksSlice";
import { deleteUserBoard } from "../../../../redux/thunk/saveDataThunk";
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
  const tasks = useAppSelector((state) => state.tasks.tasks);

  const dispatch = useAppDispatch();

  const handleDeleteClick = () => {
    if (type === "board") {
      const boardTasks = tasks?.filter(
        (task) => task.boardUuid === activeBoard.uuid
      );
      dispatch(deleteBoard({ uuid: activeBoard.uuid }));
      dispatch(deleteActiveBoard());
      dispatch(deleteUserBoard(activeBoard.uuid));
      boardTasks?.forEach((boardTask) => dispatch(deleteTaskData(boardTask)));
    } else {
      dispatch(deleteTask({ uuid: taskUuid }));
      dispatch(deleteTaskData({ uuid: taskUuid }));
    }
    onClose();
  };
  return (
    <ModalWrapper onWrapperClick={onClose}>
      {activeBoard.usersEmail?.[0] === auth.currentUser?.email && (
        <h2 className={cl.title} data-testid="delete-board">
          {`Delete this ${type}?`}
        </h2>
      )}
      {activeBoard.usersEmail?.[0] === auth.currentUser?.email ? (
        <p className={cl.description}>
          {`Are you sure you want to delete the "${activeName}" ${type}? ${
            type === "board"
              ? "This action will remove all columns and tasks and cannot be reversed."
              : "This action will remove task and cannot be reversed."
          }`}
        </p>
      ) : (
        <p
          className={cl.users_rights}
        >{`You can't delete this ${type}. Only the ${type}'s creator can delete it.`}</p>
      )}
      <div className={cl.btns_container}>
        {activeBoard.usersEmail?.[0] === auth.currentUser?.email && (
          <Button
            text={"Delete"}
            withIcon={false}
            testid={"delete-btn"}
            newClass="delete"
            type="button"
            onClick={handleDeleteClick}
          />
        )}
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
