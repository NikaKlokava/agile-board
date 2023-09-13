import { Provider } from "react-redux";
import renderer from "react-test-renderer";
import store from "../../../../redux/store/store";
import { EditBoardModal } from "./EditBoardModal";

describe("Test the EditBoardModal component", () => {
  test("The EditBoardModal renders correctly", () => {
    const editBoardModalSnap = renderer
      .create(
        <Provider store={store}>
          <EditBoardModal />
        </Provider>
      )
      .toJSON();
    expect(editBoardModalSnap).toMatchSnapshot();
  });
});
