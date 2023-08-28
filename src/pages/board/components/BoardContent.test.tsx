import renderer from "react-test-renderer";
import { BoardContent } from "./BoardContent";

describe("Test the BoardContent component", () => {
  test("The BoardContent renders correctly", () => {
    const boardContentSnap = renderer.create(<BoardContent />).toJSON();
    expect(boardContentSnap).toMatchSnapshot();
  });
});
