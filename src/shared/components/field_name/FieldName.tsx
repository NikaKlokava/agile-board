import { FastField } from "formik";
import { memo } from "react";
import { FieldWrapper } from "../field_wrapper";

type Props = {
  name?: string;
  formikName: string;
  fieldName: string
};

export const FieldName = memo(({ name, formikName, fieldName }: Props) => {
  return (
    <FieldWrapper fieldName={fieldName}>
      <FastField
        placeholder="e.g Take coffee break"
        autoComplete="off"
        type="text"
        as="input"
        defaultValue={name && name}
        name={formikName}
        data-testid="board-name-inpt"
      ></FastField>
    </FieldWrapper>
  );
});
