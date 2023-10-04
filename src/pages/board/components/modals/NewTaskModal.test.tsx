import { Provider } from "react-redux";
import renderer from "react-test-renderer";
import store from "../../../../redux/store/store";
import { NewTaskModal } from "./NewTaskModal";

describe("Test the NewTaskModal component", () => {
  test("The NewTaskModal renders correctly", () => {
    const newTaskModalSnap = renderer
      .create(
        <Provider store={store}>
          <NewTaskModal onClose={() => {}} />
        </Provider>
      )
      .toJSON();
    expect(newTaskModalSnap).toMatchSnapshot();
  });
});
