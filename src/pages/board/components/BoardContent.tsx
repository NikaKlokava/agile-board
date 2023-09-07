import { EditBoardModal, TaskModal } from "./modals";
import { useState } from "react";
import { Sidebar } from "./Sidebar";
import cl from "./styles/board_content.module.css";
import { useSelector } from "react-redux";
import { checkedStatus } from "../../../utils/utils";

export const BoardContent = () => {
  const [editBoardVisible, setEditBoardVisible] = useState<boolean>(false);
  const [taskModalVisile, setTaskModalVisile] = useState<boolean>(false);
  const [currentTaskUuid, setCurrentTaskUuid] = useState<string>();

  const activeBoard = useSelector<RootState, BoardType>(
    (state) => state.activeBoard
  );
  const isBoardExist = activeBoard.name !== "";

  const tasks = useSelector<RootState, TasksType>((state) => state.tasks.tasks);
  return (
    <>
      <Sidebar />
      <div className={cl.board_content_wrapper}>
        {isBoardExist &&
          activeBoard.columns.map((column, index) => {
            return (
              <div className={cl.content_column} key={index}>
                <div className={cl.title_container}>
                  <div className={cl.column_circle} />
                  <div className={cl.column_title}>{column.title}</div>
                </div>
                {tasks &&
                  tasks.map((task, index) => {
                    if (task.columnUuid === column.uuid) {
                      return (
                        <div
                          className={cl.tasks_container}
                          key={index}
                          data-testid="task-container"
                          onClick={() => {
                            setTaskModalVisile(true);
                            setCurrentTaskUuid(task.uuid);
                          }}
                        >
                          <div className={cl.task_title}>{task.title}</div>
                          <div className={cl.task_success}>{`${checkedStatus(
                            task!
                          )} of ${task.subtasks.length} completed tasks`}</div>
                        </div>
                      );
                    }
                    return null;
                  })}
              </div>
            );
          })}
        {isBoardExist && (
          <div
            className={cl.add_column}
            onClick={() => setEditBoardVisible(true)}
            data-testid="add_column"
          >
            <p className={cl.add_column_title}>{"+ New Column"}</p>
          </div>
        )}
        {isBoardExist && editBoardVisible && (
          <EditBoardModal onClose={() => setEditBoardVisible(false)} />
        )}
        {isBoardExist && taskModalVisile && (
          <TaskModal
            taskUuid={currentTaskUuid!}
            onClose={() => setTaskModalVisile(false)}
          />
        )}
      </div>
    </>
  );
};
