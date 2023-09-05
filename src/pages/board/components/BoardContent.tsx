import { EditBoardModal } from "./modals";
import { useState } from "react";
import { Sidebar } from "./Sidebar";
import cl from "./styles/board_content.module.css";
import { useSelector } from "react-redux";

export const BoardContent = () => {
  const [editBoardVisible, setEditBoardVisible] = useState<boolean>(false);
  // const [taskModalVisile, setTaskModalVisile] = useState<boolean>(false);
  // const [currentColumn, setCurrentColumn] = useState<ColumnType>();
  // const [currentTask, setCurrentTask] = useState<TaskType>();

  const activeBoard = useSelector<RootState, BoardType>(
    (state) => state.activeBoard
  );

  return (
    <>
      <Sidebar />
      <div className={cl.board_content_wrapper}>
        {activeBoard &&
          activeBoard.columns.map((column, index) => {
            return (
              <div className={cl.content_column} key={index}>
                <div className={cl.title_container}>
                  <div className={cl.column_circle} />
                  <div className={cl.column_title}>{column.title}</div>
                </div>
                {/* {column.tasks &&
                  column.tasks.map((task, index) => {
                    return (
                      <div
                        className={cl.tasks_container}
                        key={index}
                        data-testid="task-container"
                        onClick={() => {
                          setCurrentColumn(column);
                          setCurrentTask(task);
                          setTaskModalVisile(true);
                        }}
                      >
                        <div className={cl.task_title}>{task.taskName}</div>
                        <div
                          className={cl.task_success}
                        >{`0 of ${task.subtasks.length} completed tasks`}</div>
                      </div>
                    );
                  })} */}
              </div>
            );
          })}
        <div
          className={cl.add_column}
          onClick={() => setEditBoardVisible(true)}
          data-testid="add_column"
        >
          <p className={cl.add_column_title}>{"+ New Column"}</p>
        </div>
        {editBoardVisible && (
          <EditBoardModal onClose={() => setEditBoardVisible(false)} />
        )}
        {/* {taskModalVisile && (
          <TaskModal
            onClose={() => setTaskModalVisile(false)}
            task={currentTask!}
            column={currentColumn!}
          />
        )} */}
      </div>
    </>
  );
};
