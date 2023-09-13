import renderer from "react-test-renderer";
import { Button } from "./Button";

describe("Test the Button component", () => {
  test("The Button renders correctly", () => {
    const buttonSnap = renderer
      .create(<Button text={"Test Btn"} withIcon={false} testid={"test"} />)
      .toJSON();
    expect(buttonSnap).toMatchSnapshot();
  });
});
