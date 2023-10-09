import { Provider } from "react-redux";
import { LoginPage } from "./LoginPage";
import renderer from "react-test-renderer";
import store from "../../redux/store/store";

describe("Test the LoginPage component", () => {
  test("The LoginPage renders correctly", () => {
    const loginPageSnap = renderer
      .create(
        <Provider store={store}>
          <LoginPage />
        </Provider>
      )
      .toJSON();
    expect(loginPageSnap).toMatchSnapshot();
  });
});
