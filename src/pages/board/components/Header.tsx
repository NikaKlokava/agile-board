import { useState } from "react";
import { useSelector } from "react-redux";
import { Button } from "../../../shared/components/button";
import { OptionsIcon } from "../../../shared/components/options_icon";
import { EditBoardModal, NewTaskModal } from "./modals";
import { BoardNavbarModal } from "./modals/BoardNavbarModal";
import { DeleteModal } from "./modals/DeleteModal";
import { OptionsModal } from "./modals/OptionsModal";
import cl from "./styles/header.module.css";

export const Header = () => {
  const [newTaskVisible, setNewTaskVisible] = useState<boolean>(false);
  const [optionsVisible, setOptionsVisible] = useState<boolean>(false);
  const [editBoardVisible, setEditBoardVisible] = useState<boolean>(false);
  const [deleteBoardVisible, setDeleteBoardVisible] = useState<boolean>(false);
  const [boardNavbarVisible, setBoardNavbarVisible] = useState<boolean>(false);

  const activeBoard = useSelector<RootState, BoardType>(
    (state) => state.activeBoard
  );

  return (
    <div className={cl.header_wrapper}>
      <div className={cl.app_title}>
        <div className={cl.app_logo}></div>
        <h1 className={cl.title}>AGILE-BOARD</h1>
        <p className={cl.board_name}>{activeBoard.name}</p>
        <div
          className={cl.navbar}
          onClick={() => setBoardNavbarVisible(true)}
        ></div>
      </div>
      <div className={cl.options}>
        <Button
          text={"Add New Task"}
          withIcon={true}
          onClick={() => setNewTaskVisible(true)}
          testid={"add-new-task-btn"}
          newClass={"add-new-task"}
        />
        <OptionsIcon onOpen={() => setOptionsVisible((prev) => !prev)} />
      </div>
      {newTaskVisible && (
        <NewTaskModal onClose={() => setNewTaskVisible(false)} />
      )}
      {optionsVisible && (
        <OptionsModal
          type="Board"
          onEditClick={() => setEditBoardVisible(true)}
          onDeleteClick={() => setDeleteBoardVisible(true)}
        />
      )}
      {editBoardVisible && (
        <EditBoardModal
          onClose={() => {
            setEditBoardVisible(false);
            setOptionsVisible(false);
          }}
        />
      )}
      {deleteBoardVisible && (
        <DeleteModal
          type="board"
          activeName={activeBoard.name}
          onClose={() => {
            setDeleteBoardVisible(false);
            setOptionsVisible(false);
          }}
          taskUuid={""}
        />
      )}
      {boardNavbarVisible && (
        <BoardNavbarModal onClose={() => setBoardNavbarVisible(false)} />
      )}
    </div>
  );
};
