import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import renderer from "react-test-renderer";
import store from "../../redux/store/store";
import { BoardPage } from "./BoardPage";

describe("Test the BoardPage component", () => {
  test("The BoardPage renders correctly", () => {
    const boardPageSnap = renderer
      .create(
        <BrowserRouter>
          <Provider store={store}>
            <BoardPage />
          </Provider>
        </BrowserRouter>
      )
      .toJSON();
    expect(boardPageSnap).toMatchSnapshot();
  });
});
