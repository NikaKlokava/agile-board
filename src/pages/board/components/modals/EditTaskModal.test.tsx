import { Provider } from "react-redux";
import renderer from "react-test-renderer";
import store from "../../../../redux/store/store";
import { EditTaskModal } from "./EditTaskModal";

describe("Test the EditTaskModal component", () => {
  test("The EditTaskModal renders correctly", () => {
    jest.mock("./EditTaskModal.tsx");
    const editTaskModalSnap = renderer
      .create(
        <Provider store={store}>
          <EditTaskModal
            taskUuid={"test id"}
            onTaskModalClose={() => {}}
            onClose={() => {}}
          />
        </Provider>
      )
      .toJSON();
    expect(editTaskModalSnap).toMatchSnapshot();
  });
});
