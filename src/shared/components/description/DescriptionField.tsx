import { FastField } from "formik";
import { memo } from "react";
import { FieldWrapper } from "../field_wrapper";
import cl from "./description.module.css";

export const DescriptionField = memo(() => {
  return (
    <FieldWrapper fieldName={"Description"}>
      <FastField
        className={cl.textarea}
        placeholder="e.g. It's always good to take a break..."
        autoComplete="off"
        type="text"
        as="textarea"
        name="description"
      />
    </FieldWrapper>
  );
});
