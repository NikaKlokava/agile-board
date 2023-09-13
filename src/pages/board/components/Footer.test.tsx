import renderer from "react-test-renderer";
import { Footer } from "./Footer";

describe("Test the Footer component", () => {
  test("The Footer renders correctly", () => {
    const footerSnap = renderer.create(<Footer />).toJSON();
    expect(footerSnap).toMatchSnapshot();
  });
});
