// import { MockBoards } from "../../../mocks/BoardMocks";
// import {
//   EditBoardModal,
//   NewBoardModal,
//   NewTaskModal,
//   TaskModal,
// } from "./modals";
import { MockBoards } from "../../../mocks/BoardMocks";
import { Sidebar } from "./Sidebar";
import cl from "./styles/board_content.module.css";

export const BoardContent = () => {
  const data = MockBoards;
  return (
    <>
      <Sidebar />
      <div className={cl.board_content_wrapper}>
        {data[0].board_column.map((column) => {
          return (
            <div className={cl.content_column}>
              <div className={cl.title_container}>
                <div className={cl.column_circle} />
                <div className={cl.column_title}>{column.title}</div>
              </div>
              {column.tasks.map((task) => {
                return (
                  <div className={cl.tasks_container}>
                    <div className={cl.task_title}>{task.name}</div>
                    <div
                      className={cl.task_success}
                    >{`0 of 5 completed tasks`}</div>
                  </div>
                );
              })}
            </div>
          );
        })}
        <div className={cl.add_column}>
          <p className={cl.add_column_title}>{"+ New Column"}</p>
        </div>
        {/* <NewTaskModal /> */}
        {/* <EditBoardModal /> */}
        {/* <NewBoardModal /> */}
        {/* <TaskModal /> */}
      </div>
    </>
  );
};
