import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { act } from "react-dom/test-utils";
import renderer from "react-test-renderer";
import App from "../../../App";
import { BoardContent } from "./BoardContent";
import { Provider } from "react-redux";
import store from "../../../redux/store/store";
import { addBoard } from "../../../redux/actionCreators/newBoardCreator";
import { MockTestAddBoard } from "../../../mocks/TestMocks";

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
      <MemoryRouter initialEntries={["/agile-board"]}>
        <App />
      </MemoryRouter>
    );
    const newColumnEl = screen.queryByTestId("add_column");

    expect(newColumnEl).not.toBeInTheDocument();
  });

  test("The New Column element should be visible if we have active board", () => {
    render(
      <MemoryRouter initialEntries={["/agile-board"]}>
        <App />
      </MemoryRouter>
    );

    act(() => {
      store.dispatch(addBoard(MockTestAddBoard));
    });

    const newColumnEl = screen.queryByTestId("add_column");

    expect(newColumnEl).toBeInTheDocument();
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
