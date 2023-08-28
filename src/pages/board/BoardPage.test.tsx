import renderer from "react-test-renderer";
import { BoardPage } from "./BoardPage";

describe("Test the BoardPage component", () => {
  test("The BoardPage renders correctly", () => {
    const boardPageSnap = renderer.create(<BoardPage />).toJSON();
    expect(boardPageSnap).toMatchSnapshot();
  });
});
