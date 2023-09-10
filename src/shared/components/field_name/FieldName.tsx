import { useFormikContext } from "formik";
import { FieldWrapper } from "../field_wrapper";

type FormikType = {
  name: string;
  title: string;
  taskName: string;
};
type Props = {
  name?: string;
  formikName: string;
};

export const FieldName = ({ name, formikName }: Props) => {
  const { handleChange, errors, touched } = useFormikContext<FormikType>();
  return (
    <FieldWrapper fieldName={"Task name"}>
      <input
        type={"text"}
        placeholder="e.g Take coffee break"
        spellCheck={false}
        autoComplete="off"
        onChange={handleChange}
        defaultValue={name && name}
        name={formikName}
      />
      {formikName === "title" && errors.title && touched.title && (
        <p style={{ color: "red" }}>{errors.title}</p>
      )}
      {formikName === "name" && errors.name && touched.name && (
        <p style={{ color: "red" }}>{errors.name}</p>
      )}
    </FieldWrapper>
  );
};
