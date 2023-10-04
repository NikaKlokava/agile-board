import { Provider } from "react-redux";
import renderer from "react-test-renderer";
import store from "../../../../redux/store/store";
import { DeleteModal } from "./DeleteModal";

describe("Test the DeleteBoardModal component", () => {
  test("The DeleteBoardModal renders correctly", () => {
    const deleteBoardModalSnap = renderer
      .create(
        <Provider store={store}>
          <DeleteModal
            type={"board"}
            activeName={"test"}
            taskUuid={"test id"}
            onClose={() => {}}
          />
        </Provider>
      )
      .toJSON();
    expect(deleteBoardModalSnap).toMatchSnapshot();
  });
});
