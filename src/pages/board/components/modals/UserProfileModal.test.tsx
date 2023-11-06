import { Provider } from "react-redux";
import renderer from "react-test-renderer";
import store from "../../../../redux/store/store";
import { UserProfileModal } from "./UserProfileModal";

describe("Test the UserProfileModal component", () => {
  test("The UserProfileModal renders correctly", () => {
    const userProfileModalSnap = renderer
      .create(
        <Provider store={store}>
          <UserProfileModal onClose={() => console.log("close")} />
        </Provider>
      )
      .toJSON();
    expect(userProfileModalSnap).toMatchSnapshot();
  });
});
