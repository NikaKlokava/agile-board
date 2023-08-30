import { useFormikContext } from "formik";
import cl from "./input.module.css";

type Props = {
  index: number;
};

export const Input = ({ index }: Props) => {
  const { handleChange } = useFormikContext();

  const handleDeleteCLick = (elem: any) => {
    elem.parentElement.remove();
    console.log(elem.parentElement);
  };

  return (
    <div className={cl.input_container}>
      <input
        type={"text"}
        placeholder="e.g Take coffee break"
        spellCheck={false}
        className={cl.input_style}
        onChange={handleChange}
        name={`board_columns[${index}]`}
      />
      <div
        className={cl.delete_icon}
        onClick={(e) => handleDeleteCLick(e.target)}
      />
    </div>
  );
};
