import renderer from "react-test-renderer";
import { Header } from "./Header";

describe("Test the Header component", () => {
  test("The Header renders correctly", () => {
    const headerSnap = renderer.create(<Header />).toJSON();
    expect(headerSnap).toMatchSnapshot();
  });
});
