import { useFormikContext } from "formik";
import { FieldWrapper } from "../field_wrapper";
import cl from "./description.module.css";

type Props = {
  description?: string;
};

export const DescriptionField = ({ description }: Props) => {
  const { handleChange } = useFormikContext();
  return (
    <FieldWrapper fieldName={"Description"}>
      <textarea
        className={cl.textarea}
        spellCheck={false}
        placeholder="e.g. It's always good to take a break..."
        onChange={handleChange}
        defaultValue={description && description}
        name="description"
      />
    </FieldWrapper>
  );
};
