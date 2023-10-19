import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import renderer from "react-test-renderer";
import App from "../../../App";
import store from "../../../redux/store/store";
import { BoardContent } from "./BoardContent";
import { Provider } from "react-redux";

jest.mock("../../../shared/hooks/useAuthorization", () => ({
  useAuthorization: () => ({ isUserExist: true }),
}));

beforeEach(() => jest.clearAllMocks());

describe("Test the BoardContent component", () => {
  test("The BoardContent renders correctly", () => {
    const boardContentSnap = renderer
      .create(
        <Provider store={store}>
          <BoardContent isLoading={true} />
        </Provider>
      )
      .toJSON();
    expect(boardContentSnap).toMatchSnapshot();
  });
});

describe("Test the New Column element", () => {
  test("The New Column element should not be visible if we have no active board", () => {
    render(
      <MemoryRouter initialEntries={["/agile-board"]}>
        <App />
      </MemoryRouter>
    );
    const newColumnEl = screen.queryByTestId("add_column");

    expect(newColumnEl).not.toBeInTheDocument();
  });

  test("The New Column element should be visible if we have active board", async () => {
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
      const newColumnEl = screen.queryByTestId("add-column-element");
      expect(newColumnEl).toBeInTheDocument();
    });
  });
});

describe("Test the Task Container", () => {
  test("The task container should not be visible if there is no task", () => {
    render(
      <MemoryRouter initialEntries={["/agile-board"]}>
        <App />
      </MemoryRouter>
    );
    const taskContainerElements = screen.queryAllByTestId("task-container");

    taskContainerElements.forEach((taskElement) => {
      expect(taskElement).not.toBeInTheDocument();
    });
  });
});
