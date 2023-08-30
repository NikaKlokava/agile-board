import { EditBoardModal, TaskModal } from "./modals";
import { useState } from "react";
import { Sidebar } from "./Sidebar";
import cl from "./styles/board_content.module.css";

export const BoardContent = () => {
  const [editBoardVisible, setEditBoardVisible] = useState<boolean>(false);
  const [taskModalVisile, setTaskModalVisile] = useState<boolean>(false);

  return (
    <>
      <Sidebar />
      <div className={cl.board_content_wrapper}>
        {/* {data[0].board_column.map((column, index) => {
          return (
            <div className={cl.content_column} key={index}>
              <div className={cl.title_container}>
                <div className={cl.column_circle} />
                <div className={cl.column_title}>{column.title}</div>
              </div>
              {column.tasks.map((task, index) => {
                return (
                  <div
                    className={cl.tasks_container}
                    key={index}
                    data-testid="task-container"
                    onClick={() => setTaskModalVisile(true)}
                  >
                    <div className={cl.task_title}>{task.name}</div>
                    <div
                      className={cl.task_success}
                    >{`0 of 5 completed tasks`}</div>
                  </div>
                );
              })}
            </div>
          );
        })} */}
        <div
          className={cl.add_column}
          onClick={() => setEditBoardVisible(true)}
          data-testid="add_column"
        >
          <p className={cl.add_column_title}>{"+ New Column"}</p>
        </div>
        {editBoardVisible && (
          <EditBoardModal onWrapperClick={() => setEditBoardVisible(false)} />
        )}
        {taskModalVisile && (
          <TaskModal onWrapperClick={() => setTaskModalVisile(false)} />
        )}
      </div>
    </>
  );
};
