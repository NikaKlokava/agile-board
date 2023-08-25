import cl from "./input.module.css";

type Props = {
  withDelete: boolean;
};

export const Input = ({ withDelete }: Props) => {
  return (
    <div className={cl.input_container}>
      <input
        type={"text"}
        placeholder="e.g Take coffee break"
        spellCheck={false}
        className={cl.input_style}
      />
      {withDelete && <div className={cl.delete_icon} />}
    </div>
  );
};
