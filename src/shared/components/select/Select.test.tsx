import renderer from "react-test-renderer";
import { Select } from "./Select";

describe("Test the Select component", () => {
  test("The Select renders correctly", () => {
    const selectSnap = renderer.create(<Select />).toJSON();
    expect(selectSnap).toMatchSnapshot();
  });
});
