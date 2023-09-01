import { useFormikContext } from "formik";
import cl from "./input.module.css";

type Props = {
  index: number;
  formikName: string;
};

export const Input = ({ index, formikName }: Props) => {
  const { handleChange } = useFormikContext();

  const handleDeleteCLick = (elem: any) => {
    elem.parentElement.remove();
  };

  return (
    <div className={cl.input_container}>
      <input
        type={"text"}
        placeholder="e.g Take coffee break"
        spellCheck={false}
        className={cl.input_style}
        autoComplete="off"
        onChange={handleChange}
        name={formikName}
      />
      <div
        className={cl.delete_icon}
        onClick={(e) => handleDeleteCLick(e.target)}
      />
    </div>
  );
};
