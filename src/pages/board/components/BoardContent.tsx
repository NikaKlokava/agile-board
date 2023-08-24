import cl from "./board_content.module.css";

export const BoardContent = () => {
  return (
    <div className={cl.board_content_wrapper}>
      <div className={cl.content_column}>
        <div className={cl.title_container}>
          <div className={cl.column_circle} />
          <div className={cl.column_title}>{"Todo (3)"}</div>
        </div>
        <div className={cl.tasks_container}>
          <div className={cl.task_title}>
            Lalala lala lalalala lala la lalala
          </div>
          <div className={cl.task_success}>0 of 3 completed tasks</div>
        </div>
      </div>
    </div>
  );
};
