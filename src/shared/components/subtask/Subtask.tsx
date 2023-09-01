import classes from "classnames";
import cl from "./subtask.module.css";

type Props = {
  subtask: string;
  index: number;
  active: boolean;
  onChecked: () => void;
};
export const Subtask = ({ subtask, index, active, onChecked }: Props) => {
  return (
    <div
      className={classes(cl.subtasks_checkbox, active && cl.active)}
      key={index}
    >
      <input
        type={"checkbox"}
        className={cl.checkbox}
        id="first"
        onChange={onChecked}
      />
      <p>{subtask}</p>
    </div>
  );
};
