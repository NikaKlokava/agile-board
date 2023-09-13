import { Provider } from "react-redux";
import renderer from "react-test-renderer";
import store from "../../../redux/store/store";
import { Select } from "./Select";

jest.mock("./Select");

describe("Test the Select component", () => {
  test("The Select renders correctly", () => {
    const selectSnap = renderer
      .create(
        <Provider store={store}>
          <Select />
        </Provider>
      )
      .toJSON();
    expect(selectSnap).toMatchSnapshot();
  });
});
