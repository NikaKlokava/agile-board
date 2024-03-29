import { render, screen, waitFor } from "@testing-library/react";
import renderer, { act } from "react-test-renderer";
import App from "../../../App";
import store from "../../../redux/store/store";
import { BoardContent } from "./BoardContent";
import { Provider } from "react-redux";
import { addBoard, changeStatus } from "../../../redux/reducers/boardsSlice";
import { MockBoard } from "../../../mocks/BoardMocks";

jest.mock("../../../shared/hooks/useAuthorization", () => ({
  useAuthorization: () => ({ isUserExist: true }),
}));

beforeEach(() => jest.clearAllMocks());

describe("Test the BoardContent component", () => {
  test("The BoardContent renders correctly", () => {
    const boardContentSnap = renderer
      .create(
        <Provider store={store}>
          <BoardContent />
        </Provider>
      )
      .toJSON();
    expect(boardContentSnap).toMatchSnapshot();
  });
});

describe("Test the New Column element", () => {
  test("The New Column element should not be visible if we have no active board", () => {
    render(
        <App />
    );
    const newColumnEl = screen.queryByTestId("add_column");

    expect(newColumnEl).not.toBeInTheDocument();
  });

  test("The New Column element should be visible if we have active board", async () => {
    render(<App />);

    act(() => {
      store.dispatch(changeStatus({ isLoading: false }));
      store.dispatch(addBoard(MockBoard));
    });

    await waitFor(() => {
      const newColumnEl = screen.queryByTestId("add-column-element");
      expect(newColumnEl).toBeInTheDocument();
    });
  });
});

describe("Test the Task Container", () => {
  test("The task container should not be visible if there is no task", () => {
    render(<App />);
    const taskContainerElements = screen.queryAllByTestId("task-container");

    taskContainerElements.forEach((taskElement) => {
      expect(taskElement).not.toBeInTheDocument();
    });
  });
});
