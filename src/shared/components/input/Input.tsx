import cl from "./input.module.css";

type Props = {
  withDelete: boolean;
  value?: string;
};

export const Input = ({ withDelete, value }: Props) => {
  return (
    <div className={cl.input_container}>
      <input
        type={"text"}
        placeholder="e.g Take coffee break"
        spellCheck={false}
        className={cl.input_style}
        value={value}
      />
      {withDelete && <div className={cl.delete_icon} />}
    </div>
  );
};
