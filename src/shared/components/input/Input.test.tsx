import renderer from "react-test-renderer";
import { Input } from "./Input";

describe("Test the Input component", () => {
  test("The Input renders correctly", () => {
    const inputSnap = renderer.create(<Input withDelete={true} />).toJSON();
    expect(inputSnap).toMatchSnapshot();
  });
});
