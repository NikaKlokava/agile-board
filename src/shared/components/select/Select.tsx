import { Field } from "formik";
import { memo } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store/store";
import { FieldWrapper } from "../field_wrapper";

export const Select = memo(() => {
  const activeBoard = useSelector((state: RootState) => state.activeBoard);

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
