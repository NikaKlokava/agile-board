import { useFormikContext } from "formik";
import cl from "./input.module.css";

type Props = {
  formikName: string;
  defaultVal?: string;
};

export const Input = ({ formikName, defaultVal }: Props) => {
  const { handleChange, setFieldValue } = useFormikContext();

  const handleDeleteCLick = (elem: any) => {
    elem.parentElement.remove();
    setFieldValue(formikName, undefined);
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
        defaultValue={defaultVal}
      />
      <div
        className={cl.delete_icon}
        onClick={(e) => handleDeleteCLick(e.target)}
      />
    </div>
  );
};
