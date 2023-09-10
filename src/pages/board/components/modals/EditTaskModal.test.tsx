import { Provider } from "react-redux";
import renderer from "react-test-renderer";
import store from "../../../../redux/store/store";
import { EditTaskModal } from "./EditTaskModal";

describe("Test the EditTaskModal component", () => {
  test("The EditTaskModal renders correctly", () => {
    const editTaskModalSnap = renderer
      .create(
        <Provider store={store}>
          <EditTaskModal
            taskUuid={"test id"}
            onTaskModalClose={() => {
              console.log("test");
            }}
          />
        </Provider>
      )
      .toJSON();
    expect(editTaskModalSnap).toMatchSnapshot();
  });
});
