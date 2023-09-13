import { EditBoardModal, TaskModal } from "./modals";
import React, { useState } from "react";
import { Sidebar } from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { checkedStatus } from "../../../utils/utils";
import cl from "./styles/board_content.module.css";
import { moveTask } from "../../../redux/actionCreators/newBoardCreator";

export const BoardContent = () => {
  const [editBoardVisible, setEditBoardVisible] = useState<boolean>(false);
  const [taskModalVisile, setTaskModalVisile] = useState<boolean>(false);
  const [currentTaskUuid, setCurrentTaskUuid] = useState<string>();

  const activeBoard = useSelector<RootState, BoardType>(
    (state) => state.activeBoard
  );
  const isBoardExist = activeBoard.name !== "";

  const tasks = useSelector<RootState, TasksType>((state) => state.tasks.tasks);

  const dispatch = useDispatch();

  const handleOnDrag = (e: React.DragEvent, taskUuid: string) => {
    e.dataTransfer.setData("task", taskUuid);
  };

  const handleOnDrop = (e: React.DragEvent, colUuid: string) => {
    const data = e.dataTransfer.getData("task");
    dispatch(moveTask(data, colUuid));
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <div className={cl.board_content_wrapper}>
      <Sidebar />
      <div className={cl.board_data_wrapper}>
        <div className={cl.board_data}>
          {isBoardExist &&
            activeBoard.columns.map((column, index) => {
              return (
                <div
                  className={cl.content_column}
                  key={index}
                  onDrop={(e) => handleOnDrop(e, column.uuid)}
                  onDragOver={handleDragOver}
                >
                  <div className={cl.title_container}>
                    <div className={cl.column_circle} />
                    <div className={cl.column_title}>{column.title}</div>
                  </div>
                  {tasks &&
                    tasks
                      .sort((a, b) => a.time - b.time)
                      .map((task, index) => {
                        if (task.columnUuid === column.uuid) {
                          return (
                            <div
                              className={cl.tasks_container}
                              key={index}
                              data-testid="task-container"
                              draggable
                              onDragStart={(e) => handleOnDrag(e, task.uuid)}
                              onClick={() => {
                                setTaskModalVisile(true);
                                setCurrentTaskUuid(task.uuid);
                              }}
                            >
                              <div className={cl.task_title}>{task.title}</div>
                              <div
                                className={cl.task_success}
                              >{`${checkedStatus(task!)} of ${
                                task.subtasks.length
                              } completed tasks`}</div>
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
      </div>
    </div>
  );
};
