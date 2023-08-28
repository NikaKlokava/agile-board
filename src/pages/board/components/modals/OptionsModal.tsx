import classes from "classnames";
import cl from "./modal_styles.module.css";

export const OptionsModal = () => {
  return (
    <div className={cl.options_modal_wrapper}>
      <p className={classes(cl.option_text, cl.edit)}>Edit Boards</p>
      <p className={classes(cl.option_text, cl.delete)}>Delete Boards</p>
    </div>
  );
};
