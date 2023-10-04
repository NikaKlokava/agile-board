import { Field } from "formik";
import { memo } from "react";
import { useSelector } from "react-redux";
import { FieldWrapper } from "../field_wrapper";
type Props = {
  colUuid?: string;
};

export const Select = memo(({ colUuid }: Props) => {
  const activeBoard = useSelector<RootState, BoardType>(
    (state) => state.activeBoard
  );

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
