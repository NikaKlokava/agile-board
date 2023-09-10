import { Provider } from "react-redux";
import renderer from "react-test-renderer";
import store from "../../../../redux/store/store";
import { DeleteBoardModal } from "./DeleteBoardModal";

describe("Test the DeleteBoardModal component", () => {
  test("The DeleteBoardModal renders correctly", () => {
    const deleteBoardModalSnap = renderer
      .create(
        <Provider store={store}>
          <DeleteBoardModal type={"board"} activeName={"test"} />
        </Provider>
      )
      .toJSON();
    expect(deleteBoardModalSnap).toMatchSnapshot();
  });
});
