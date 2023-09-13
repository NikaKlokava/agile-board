import { Provider } from "react-redux";
import renderer from "react-test-renderer";
import store from "../../../../redux/store/store";
import { NewBoardModal } from "./NewBoardModal";

describe("Test the NewBoardModal component", () => {
  test("The NewBoardModal renders correctly", () => {
    const newBoardModalSnap = renderer
      .create(
        <Provider store={store}>
          <NewBoardModal onClose={() => console.log("close")} />
        </Provider>
      )
      .toJSON();
    expect(newBoardModalSnap).toMatchSnapshot();
  });
});
