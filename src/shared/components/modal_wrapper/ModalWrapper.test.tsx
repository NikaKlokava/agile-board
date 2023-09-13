import renderer from "react-test-renderer";
import { ModalWrapper } from "./ModalWrapper";

describe("Test the ModalWrapper component", () => {
  test("The ModalWrapper renders correctly", () => {
    const modalWrapperSnap = renderer
      .create(<ModalWrapper children={undefined} />)
      .toJSON();
    expect(modalWrapperSnap).toMatchSnapshot();
  });
});
