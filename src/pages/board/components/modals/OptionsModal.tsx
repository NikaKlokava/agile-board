import classes from "classnames";
import cl from "./modal_styles.module.css";

type Props = {
  type: "Board" | "Task";
  onEditClick?: () => void;
  onDeleteClick?: () => void;
};

export const OptionsModal = ({ type, onEditClick, onDeleteClick }: Props) => {
  return (
    <div className={cl.options_modal_wrapper} data-testid="options-modal">
      <p
        className={classes(cl.option_text, cl.edit)}
        data-testid="options-edit-board"
        onClick={onEditClick}
      >
        {`Edit ${type}`}
      </p>
      <p
        className={classes(cl.option_text, cl.delete)}
        data-testid="options-delete-board"
        onClick={onDeleteClick}
      >
        {`Delete ${type}`}
      </p>
    </div>
  );
};
