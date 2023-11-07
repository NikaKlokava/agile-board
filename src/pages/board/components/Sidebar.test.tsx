import { render, screen, waitFor } from "@testing-library/react";
import renderer from "react-test-renderer";
import { Sidebar } from "./Sidebar";
import { Provider } from "react-redux";
import store from "../../../redux/store/store";
import { act } from "react-dom/test-utils";
import { BrowserRouter } from "react-router-dom";
import App from "../../../App";
import { addBoard, changeStatus } from "../../../redux/reducers/boardsSlice";
import { MockBoard } from "../../../mocks/BoardMocks";
jest.mock("../../../shared/hooks/useAuthorization", () => ({
  useAuthorization: () => ({ isUserExist: true }),
}));

beforeEach(() => jest.clearAllMocks());

describe("Test the Sidebar component", () => {
  test("The Sidebar renders correctly", () => {
    const sidebarSnap = renderer
      .create(
        <BrowserRouter>
          <Provider store={store}>
            <Sidebar />
          </Provider>
        </BrowserRouter>
      )
      .toJSON();
    expect(sidebarSnap).toMatchSnapshot();
  });
});

describe("Test the New Board element", () => {
  test("The NewBoardModal should be visible on click", async () => {
    render(<App />);
    act(() => {
      store.dispatch(changeStatus({ isLoading: false }));
      store.dispatch(addBoard(MockBoard));
    });

    await waitFor(() => {
      const newBoardEl = screen.getByTestId("new-board");
      newBoardEl.click();
      const newBoardModal = screen.queryByTestId("new-board-modal");

      expect(newBoardModal).toBeInTheDocument();
    });
  });
});
