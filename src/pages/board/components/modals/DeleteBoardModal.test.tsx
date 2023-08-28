import renderer from "react-test-renderer";
import { DeleteBoardModal } from "./DeleteBoardModal";

describe("Test the DeleteBoardModal component", () => {
  test("The DeleteBoardModal renders correctly", () => {
    const deleteBoardModalSnap = renderer.create(<DeleteBoardModal />).toJSON();
    expect(deleteBoardModalSnap).toMatchSnapshot();
  });
});
