import renderer from "react-test-renderer";
import { NewBoardModal } from "./NewBoardModal";

describe("Test the NewBoardModal component", () => {
  test("The NewBoardModal renders correctly", () => {
    const newBoardModalSnap = renderer.create(<NewBoardModal />).toJSON();
    expect(newBoardModalSnap).toMatchSnapshot();
  });
});