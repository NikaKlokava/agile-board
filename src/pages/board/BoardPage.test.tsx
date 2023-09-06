import { Provider } from "react-redux";
import renderer from "react-test-renderer";
import store from "../../redux/store/store";
import { BoardPage } from "./BoardPage";

describe("Test the BoardPage component", () => {
  test("The BoardPage renders correctly", () => {
    const boardPageSnap = renderer
      .create(
        <Provider store={store}>
          <BoardPage />
        </Provider>
      )
      .toJSON();
    expect(boardPageSnap).toMatchSnapshot();
  });
});
