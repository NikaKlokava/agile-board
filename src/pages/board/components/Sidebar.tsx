import classes from "classnames";
import { MockBoards } from "../../../mocks/BoardMocks";
import cl from "./styles/sidebar.module.css";

export const Sidebar = () => {
  const data = MockBoards;
  return (
    <div className={cl.sidebar_wrapper}>
      <div className={cl.sidebar_title}>{`ALL BOARDS (${data.length})`}</div>
      <div className={cl.board_title_items}>
        {data.map((board, index) => {
          return (
            <div className={cl.title_item} key={index}>
              <div className={cl.icon} />
              <p className={cl.title}>{board.name}</p>
            </div>
          );
        })}
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
