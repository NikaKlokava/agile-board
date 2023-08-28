import renderer from "react-test-renderer";
import { EditBoardModal } from "./EditBoardModal";

describe("Test the EditBoardModal component", () => {
  test("The EditBoardModal renders correctly", () => {
    const editBoardModalSnap = renderer.create(<EditBoardModal />).toJSON();
    expect(editBoardModalSnap).toMatchSnapshot();
  });
});
