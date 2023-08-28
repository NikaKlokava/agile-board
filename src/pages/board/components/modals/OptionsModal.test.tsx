import renderer from "react-test-renderer";
import { OptionsModal } from "./OptionsModal";

describe("Test the OptionsModal component", () => {
  test("The OptionsModal renders correctly", () => {
    const optionsModalSnap = renderer.create(<OptionsModal />).toJSON();
    expect(optionsModalSnap).toMatchSnapshot();
  });
});
