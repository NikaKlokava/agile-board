import cl from "./options_icon.module.css";

type Props = {
  onOpen: () => void;
};

export const OptionsIcon = ({ onOpen }: Props) => {
  return (
    <div
      className={cl.options_icon}
      data-testid="options-icon"
      onClick={onOpen}
    />
  );
};
