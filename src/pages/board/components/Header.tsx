import { useState } from "react";
import { MockBoards } from "../../../mocks/BoardMocks";
import { Button } from "../../../shared/components/button";
import { EditBoardModal, NewTaskModal } from "./modals";
import { DeleteBoardModal } from "./modals/DeleteBoardModal";
import { OptionsModal } from "./modals/OptionsModal";
import cl from "./styles/header.module.css";

export const Header = () => {
  const [newTaskVisible, setNewTaskVisible] = useState<boolean>(false);
  const [optionsVisible, setOptionsVisible] = useState<boolean>(false);
  const [editBoardVisible, setEditBoardVisible] = useState<boolean>(false);
  const [deleteBoardVisible, setDeleteBoardVisible] = useState<boolean>(false);

  const data = MockBoards;
  return (
    <div className={cl.header_wrapper}>
      <div className={cl.app_title}>
        <div className={cl.app_logo}></div>
        <h1 className={cl.title}>AGILE-BOARD</h1>
        <p className={cl.board_name}>{data[0].name}</p>
        <div className={cl.navbar}></div>
      </div>
      <div className={cl.options}>
        <Button
          text={"Add New Task"}
          withIcon={true}
          onClick={() => setNewTaskVisible(true)}
          testid={"add-new-task-btn"}
        />
        <div
          className={cl.options_icon}
          data-testid="options-icon"
          onClick={() => setOptionsVisible((prev) => !prev)}
        />
      </div>
      {newTaskVisible && <NewTaskModal />}
      {optionsVisible && !editBoardVisible && (
        <OptionsModal
          onEditClick={() => setEditBoardVisible(true)}
          onDeleteClick={() => setDeleteBoardVisible(true)}
        />
      )}
      {editBoardVisible && <EditBoardModal />}
      {deleteBoardVisible && <DeleteBoardModal />}
    </div>
  );
};
