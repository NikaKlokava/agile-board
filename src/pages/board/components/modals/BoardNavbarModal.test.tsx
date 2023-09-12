import { Provider } from "react-redux";
import renderer from "react-test-renderer";
import store from "../../../../redux/store/store";
import { BoardNavbarModal } from "./BoardNavbarModal";

describe("Test the BoardNavbarModal component", () => {
  test("The BoardNavbarModal renders correctly", () => {
    const boardNavbarModalSnap = renderer
      .create(
        <Provider store={store}>
          <BoardNavbarModal onClose={() => {}} />
        </Provider>
      )
      .toJSON();
    expect(boardNavbarModalSnap).toMatchSnapshot();
  });
});
