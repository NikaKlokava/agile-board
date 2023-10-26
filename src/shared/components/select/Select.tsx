import { Field } from "formik";
import { memo } from "react";
import { useAppSelector } from "../../../redux/hooks/hook";
import { FieldWrapper } from "../field_wrapper";

export const Select = memo(() => {
  const activeBoard = useAppSelector((state) => state.activeBoard);

  return (
    <FieldWrapper fieldName={"Current Status"}>
      <Field as="select" name="columnTitle">
        {activeBoard.columns.map((column, i) => (
          <option key={i} value={column.title}>
            {column.title}
          </option>
        ))}
      </Field>
    </FieldWrapper>
  );
});
