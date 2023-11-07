import { useCallback, useState } from "react";
import { useAppSelector } from "../../../redux/hooks/hook";
import { Button } from "../../../shared/components/button";
import { OptionsIcon } from "../../../shared/components/options_icon";
import { EditBoardModal, NewTaskModal } from "./modals";
import { BoardNavbarModal } from "./modals/BoardNavbarModal";
import { DeleteModal } from "./modals/DeleteModal";
import { OptionsModal } from "./modals/OptionsModal";
import { UserProfileModal } from "./modals/UserProfileModal";
import cl from "./styles/header.module.css";

export const Header = () => {
  const [newTaskVisible, setNewTaskVisible] = useState<boolean>(false);
  const [optionsVisible, setOptionsVisible] = useState<boolean>(false);
  const [editBoardVisible, setEditBoardVisible] = useState<boolean>(false);
  const [deleteBoardVisible, setDeleteBoardVisible] = useState<boolean>(false);
  const [boardNavbarVisible, setBoardNavbarVisible] = useState<boolean>(false);
  const [userProfileVisible, setUserProfileVisible] = useState<boolean>(false);

  const activeBoard = useAppSelector((state) => state.activeBoard);

  const handleOptionsIconClick = useCallback(() => {
    setOptionsVisible((prev) => !prev);
  }, []);

  const handleAddNewTaskClick = useCallback(() => {
    setNewTaskVisible(true);
  }, []);

  return (
    <div className={cl.header_wrapper}>
      <div className={cl.app_title}>
        <div className={cl.app_logo}></div>
        <h1 className={cl.title}>AGILE-BOARD</h1>
        <div className={cl.board_name_container}>
          <p className={cl.board_name}>{activeBoard.name}</p>
          {activeBoard.usersEmail.length !== 0 && (
            <p className={cl.creator}>{`by ${activeBoard.usersEmail[0]}`}</p>
          )}
        </div>
        <div
          className={cl.navbar}
          onClick={() => setBoardNavbarVisible(true)}
        ></div>
      </div>
      <div className={cl.options}>
        {activeBoard.columns && activeBoard.columns?.length !== 0 && (
          <Button
            text={"Add New Task"}
            withIcon={true}
            onClick={handleAddNewTaskClick}
            testid={"add-new-task-btn"}
            newClass={"add-new-task"}
            type="button"
          />
        )}
        <OptionsIcon onOpen={handleOptionsIconClick} />
        <div
          className={cl.user_profile}
          onClick={() => setUserProfileVisible(true)}
        />
      </div>
      {newTaskVisible && (
        <NewTaskModal onClose={() => setNewTaskVisible(false)} />
      )}
      {optionsVisible && !editBoardVisible && !deleteBoardVisible && (
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
      {userProfileVisible && (
        <UserProfileModal onClose={() => setUserProfileVisible(false)} />
      )}
    </div>
  );
};
