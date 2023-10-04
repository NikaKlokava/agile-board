import { Field } from "formik";
import { memo } from "react";
import cl from "./input.module.css";

type Props = {
  formikName: string;
  index?: number;
  remove?: any;
  uuids?: string[];
  checked?: boolean[];
};

export const Input = memo(
  ({ formikName, remove, index, uuids, checked }: Props) => {
    return (
      <div className={cl.input_container}>
        <Field
          placeholder="e.g Take coffee break"
          autoComplete="off"
          type="text"
          as="input"
          name={formikName}
          maxLength={14}
          className={cl.input_style}
        ></Field>
        <DeleteIcon
          onDelete={() => {
            if (typeof index === "number")
              uuids?.splice(index, 1) || checked?.splice(index, 1);

            remove?.(index);
          }}
        />
      </div>
    );
  }
);
type IconProps = {
  onDelete?: any;
};

const DeleteIcon = ({ onDelete }: IconProps) => {
  return <div className={cl.delete_icon} onClick={onDelete} />;
};
