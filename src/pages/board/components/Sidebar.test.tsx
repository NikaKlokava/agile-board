import { render, screen, waitFor } from "@testing-library/react";
import renderer from "react-test-renderer";
import { Sidebar } from "./Sidebar";
import { Provider } from "react-redux";
import store from "../../../redux/store/store";
import { act } from "react-dom/test-utils";
import { MemoryRouter } from "react-router-dom";
import App from "../../../App";
import { addBoard } from "../../../redux/reducers/boardsSlice";
import { MockTestAddBoard } from "../../../mocks/TestMocks";
jest.mock("../../../shared/hooks/useAuthorization", () => ({
  useAuthorization: () => ({ isUserExist: true }),
}));

beforeEach(() => jest.clearAllMocks());

describe("Test the Sidebar component", () => {
  test("The Sidebar renders correctly", () => {
    const sidebarSnap = renderer
      .create(
        <Provider store={store}>
          <Sidebar />
        </Provider>
      )
      .toJSON();
    expect(sidebarSnap).toMatchSnapshot();
  });
});

describe("Test the New Board element", () => {
  test("The NewBoardModal should be visible on click", async () => {
    render(
      <MemoryRouter initialEntries={["/agile-board"]}>
        <App />
      </MemoryRouter>
    );
    act(() => {
      store.dispatch(addBoard(MockTestAddBoard));
    });

    await waitFor(() => {
      const newBoardEl = screen.getByTestId("new-board");
      newBoardEl.click();
      const newBoardModal = screen.queryByTestId("new-board-modal");

      expect(newBoardModal).toBeInTheDocument();
    });
  });
});
