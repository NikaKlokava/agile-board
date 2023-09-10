import { useState } from "react";
import { useSelector } from "react-redux";
import { Button } from "../../../shared/components/button";
import { OptionsIcon } from "../../../shared/components/options_icon";
import { EditBoardModal, NewTaskModal } from "./modals";
import { DeleteBoardModal } from "./modals/DeleteBoardModal";
import { OptionsModal } from "./modals/OptionsModal";
import cl from "./styles/header.module.css";

export const Header = () => {
  const [newTaskVisible, setNewTaskVisible] = useState<boolean>(false);
  const [optionsVisible, setOptionsVisible] = useState<boolean>(false);
  const [editBoardVisible, setEditBoardVisible] = useState<boolean>(false);
  const [deleteBoardVisible, setDeleteBoardVisible] = useState<boolean>(false);

  const activeBoard = useSelector<RootState, BoardType>(
    (state) => state.activeBoard
  );
  const isBoardExist = activeBoard.name !== "";

  return (
    <div className={cl.header_wrapper}>
      <div className={cl.app_title}>
        <div className={cl.app_logo}></div>
        <h1 className={cl.title}>AGILE-BOARD</h1>
        <p className={cl.board_name}>{activeBoard.name}</p>
        <div className={cl.navbar}></div>
      </div>
      <div className={cl.options}>
        {isBoardExist && (
          <Button
            text={"Add New Task"}
            withIcon={true}
            onClick={() => setNewTaskVisible(true)}
            testid={"add-new-task-btn"}
            newClass={"add-new-task"}
          />
        )}
        {isBoardExist && (
          <OptionsIcon onOpen={() => setOptionsVisible((prev) => !prev)} />
        )}
      </div>
      {newTaskVisible && isBoardExist && (
        <NewTaskModal onClose={() => setNewTaskVisible(false)} />
      )}
      {optionsVisible && !editBoardVisible && !deleteBoardVisible && (
        <OptionsModal
          type="Board"
          onEditClick={() => setEditBoardVisible(true)}
          onDeleteClick={() => setDeleteBoardVisible(true)}
        />
      )}
      {editBoardVisible && isBoardExist && (
        <EditBoardModal
          onClose={() => {
            setEditBoardVisible(false);
            setOptionsVisible(false);
          }}
        />
      )}
      {deleteBoardVisible && isBoardExist && (
        <DeleteBoardModal
          type="board"
          activeName={activeBoard.name}
          onClose={() => {
            setDeleteBoardVisible(false);
            setOptionsVisible(false);
          }}
        />
      )}
    </div>
  );
};
