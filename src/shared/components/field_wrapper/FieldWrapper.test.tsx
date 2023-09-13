import renderer from "react-test-renderer";
import { FieldWrapper } from "./FieldWrapper";

describe("Test the FieldWrapper component", () => {
  test("The FieldWrapper renders correctly", () => {
    const fieldWrapperSnap = renderer
      .create(<FieldWrapper children={undefined} fieldName={"TestName"} />)
      .toJSON();
    expect(fieldWrapperSnap).toMatchSnapshot();
  });
});
