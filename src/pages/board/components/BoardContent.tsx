import { EditBoardModal, NewBoardModal, TaskModal } from "./modals";
import React, { useState } from "react";
import { Sidebar } from "./Sidebar";
import { checkedStatus } from "../../../utils/utils";
import { moveTask } from "../../../redux/reducers/tasksSlice";
import { cloneDeep } from "lodash";
import { Loader } from "../../../shared/components/loader";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks/hook";
import cl from "./styles/board_content.module.css";
import { updateUserTaskData } from "../../../redux/thunk/saveDataThunk";

export const BoardContent = ({ isLoading }: { isLoading: boolean }) => {
  const [newBoardVisible, setNewBoardVisible] = useState<boolean>(false);
  const [editBoardVisible, setEditBoardVisible] = useState<boolean>(false);
  const [taskModalVisile, setTaskModalVisile] = useState<boolean>(false);
  const [currentTaskUuid, setCurrentTaskUuid] = useState<string>();

  const boards = useAppSelector((state) => state.boards.boards);

  const activeBoard = useAppSelector((state) => state.activeBoard);

  const tasks = useAppSelector((state) => state.tasks.tasks);
  const copyTasks = cloneDeep(tasks);

  const dispatch = useAppDispatch();

  const handleOnDrag = (e: React.DragEvent, taskUuid: string) => {
    e.dataTransfer.setData("task", taskUuid);
  };

  const handleOnDrop = (e: React.DragEvent, columnUuid: string) => {
    const data = e.dataTransfer.getData("task");
    const taskIndex = tasks.findIndex((task) => task.uuid === data);
    const task = tasks[taskIndex];

    const time = new Date().getTime();
    dispatch(
      moveTask({
        taskUuid: data,
        columnUuid,
        time,
      })
    );
    const newTask = {
      ...task,
      columnUuid,
      time,
    };
    dispatch(updateUserTaskData(newTask));
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const noBoards = boards.length === 0;

  if (!isLoading && (newBoardVisible || noBoards))
    return (
      <div>
        <NewBoardModal onClose={() => setNewBoardVisible(false)} />
      </div>
    );

  if (isLoading) return <Loader />;

  return (
    <div className={cl.board_content_wrapper}>
      <Sidebar />
      <div className={cl.board_data_wrapper}>
        <div className={cl.board_data}>
          {activeBoard.columns.map((column, index) => {
            return (
              <div
                className={cl.content_column}
                key={index}
                onDrop={(e) => column.uuid && handleOnDrop(e, column.uuid)}
                onDragOver={handleDragOver}
              >
                <div className={cl.title_container}>
                  <div className={cl.column_circle} />
                  <div className={cl.column_title}>{column.title}</div>
                </div>
                {copyTasks &&
                  copyTasks
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
                            <div className={cl.task_success}>{`${checkedStatus(
                              task
                            )} of ${
                              task.subtasks.length
                            } completed subtasks`}</div>
                          </div>
                        );
                      }
                      return null;
                    })}
              </div>
            );
          })}
          <div
            className={cl.add_column}
            onClick={() => setEditBoardVisible(true)}
            data-testid="add-column-element"
          >
            <p className={cl.add_column_title}>{"+ New Column"}</p>
          </div>
          {editBoardVisible && (
            <EditBoardModal onClose={() => setEditBoardVisible(false)} />
          )}
          {taskModalVisile && (
            <TaskModal
              taskUuid={currentTaskUuid}
              onClose={() => setTaskModalVisile(false)}
            />
          )}
        </div>
      </div>
    </div>
  );
};
