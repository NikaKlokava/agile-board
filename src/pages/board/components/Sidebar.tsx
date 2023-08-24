import classes from "classnames";
import cl from "./styles/sidebar.module.css";

export const Sidebar = () => {
  return (
    <div className={cl.sidebar_wrapper}>
      <div className={cl.sidebar_title}>{"ALL BOARDS (3)"}</div>
      <div className={cl.board_title_items}>
        <div className={cl.title_item}>
          <div className={cl.icon} />
          <p className={cl.title}>Board name</p>
        </div>
        <div className={cl.title_item}>
          <div className={cl.icon} />
          <p className={cl.title}>Board name</p>
        </div>
        <div className={cl.title_item}>
          <div className={cl.icon} />
          <p className={cl.title}>Board name</p>
        </div>
        <div className={cl.title_item}>
          <div className={cl.icon_new_board} />
          <p className={classes(cl.title, cl.new_board)}>New board</p>
        </div>
      </div>
      <div className={cl.hide_sidebar}>
        <div className={cl.hide_icon} />
        <div className={cl.hide_text}>Hide sidebar</div>
      </div>
    </div>
  );
};
