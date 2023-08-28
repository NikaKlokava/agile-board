import renderer from "react-test-renderer";
import { NewTaskModal } from "./NewTaskModal";

describe("Test the NewTaskModal component", () => {
  test("The NewTaskModal renders correctly", () => {
    const newTaskModalSnap = renderer.create(<NewTaskModal />).toJSON();
    expect(newTaskModalSnap).toMatchSnapshot();
  });
});
