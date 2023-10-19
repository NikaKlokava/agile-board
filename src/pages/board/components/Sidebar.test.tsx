import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import renderer from "react-test-renderer";
import { Sidebar } from "./Sidebar";
import { Provider } from "react-redux";
import store from "../../../redux/store/store";
import { BoardContent } from "./BoardContent";
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
      <Provider store={store}>
        <BoardContent isLoading={false} />
      </Provider>
    );
    const boardNameInpt = screen.getByTestId("board-name-inpt");
    const newBoardBtn = screen.getByTestId("create-new-board-btn");

    fireEvent.change(boardNameInpt, { target: { value: "mockname" } });
    fireEvent.click(newBoardBtn);

    await waitFor(() => {
      const newBoardEl = screen.getByTestId("new-board");
      newBoardEl.click();
      const newBoardModal = screen.queryByTestId("new-board-modal");

      expect(newBoardModal).toBeInTheDocument();
    });
  });
});
