import { Field } from "formik";
import { memo } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks/hook";
import { deleteTaskData } from "../../../redux/reducers/tasksSlice";
import cl from "./input.module.css";

type Props = {
  formikName: string;
  index?: number;
  remove?: any;
  uuids?: string[];
  checked?: boolean[];
  type?: "email";
};

export const Input = memo(
  ({ formikName, remove, index, uuids, checked, type }: Props) => {
    const tasks = useAppSelector((state) => state.tasks.tasks);
    const dispatch = useAppDispatch();

    const handleDeleteClick = () => {
      const taskUuid = tasks?.find(
        (task) => task.columnUuid === uuids?.[index!]
      );
      if (formikName === `columns[${index}]` && taskUuid)
        dispatch(deleteTaskData(taskUuid));

      if (typeof index === "number")
        uuids?.splice(index, 1) || checked?.splice(index, 1);

      remove?.(index);
    };

    return (
      <div className={cl.input_container}>
        <Field
          placeholder={type ? "Enter email" : "e.g Take coffee break"}
          autoComplete="off"
          type="text"
          as="input"
          name={formikName}
          maxLength={type ? 100 : 14}
          className={cl.input_style}
        ></Field>
        <DeleteIcon onDelete={handleDeleteClick} />
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
