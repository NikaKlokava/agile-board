import renderer from "react-test-renderer";
import { TaskModal } from "./TaskModal";

describe("Test the TaskModal component", () => {
  test("The TaskModal renders correctly", () => {
    const taskModalSnap = renderer.create(<TaskModal />).toJSON();
    expect(taskModalSnap).toMatchSnapshot();
  });
});
