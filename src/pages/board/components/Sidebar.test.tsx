import renderer from "react-test-renderer";
import { Sidebar } from "./Sidebar";

describe("Test the Sidebar component", () => {
  test("The Sidebar renders correctly", () => {
    const sidebarSnap = renderer.create(<Sidebar />).toJSON();
    expect(sidebarSnap).toMatchSnapshot();
  });
});
