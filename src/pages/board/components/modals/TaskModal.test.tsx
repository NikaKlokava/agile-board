import { Provider } from "react-redux";
import renderer from "react-test-renderer";
import store from "../../../../redux/store/store";
import { TaskModal } from "./TaskModal";

describe("Test the TaskModal component", () => {
  test("The TaskModal renders correctly", () => {
    jest.mock("./TaskModal.tsx");
    const taskModalSnap = renderer
      .create(
        <Provider store={store}>
          <TaskModal
            onClose={() => console.log("test")}
            taskUuid={"test uuid"}
          />
        </Provider>
      )
      .toJSON();
    expect(taskModalSnap).toMatchSnapshot();
  });
});
