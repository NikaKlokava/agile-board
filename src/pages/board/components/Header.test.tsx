import { render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { BrowserRouter } from "react-router-dom";
import renderer from "react-test-renderer";
import { Header } from "./Header";
import App from "../../../App";
import { Provider } from "react-redux";
import store from "../../../redux/store/store";
import { addBoard, changeStatus } from "../../../redux/reducers/boardsSlice";
import { MockBoard, MockBoardWithoutColumn } from "../../../mocks/BoardMocks";
import { selectBoard } from "../../../redux/reducers/activeBoardSlice";

jest.mock("../../../shared/hooks/useAuthorization", () => ({
  useAuthorization: () => ({ isUserExist: true }),
}));

beforeEach(() => jest.clearAllMocks());

describe("Test the Header component", () => {
  test("The Header renders correctly", () => {
    const headerSnap = renderer
      .create(
        <BrowserRouter>
          <Provider store={store}>
            <Header />
          </Provider>
        </BrowserRouter>
      )
      .toJSON();
    expect(headerSnap).toMatchSnapshot();
  });
});
describe("Test the button Add New Task", () => {
  test("The button Add New Task should be visible when you open the page and have at least one column", () => {
    render(<App />);
    act(() => {
      store.dispatch(changeStatus({ isLoading: false }));
      store.dispatch(addBoard(MockBoard));
      store.dispatch(selectBoard(MockBoard));
    });

    const addNewTaskBtn = screen.queryByTestId("add-new-task-btn");

    expect(addNewTaskBtn).toBeInTheDocument();
  });

  test("The button Add New Task should not be visible if have not at least one column", () => {
    render(<App />);
    act(() => {
      store.dispatch(addBoard(MockBoardWithoutColumn));
      store.dispatch(selectBoard(MockBoardWithoutColumn));
    });

    const addNewTaskBtn = screen.queryByTestId("add-new-task-btn");
    expect(addNewTaskBtn).not.toBeInTheDocument();
  });

  test("The NewTaskModal should be visible on button Add New Task click", () => {
    render(<App />);
    act(() => {
      store.dispatch(selectBoard(MockBoard));
    });
    const addNewTaskBtn = screen.getByTestId("add-new-task-btn");

    act(() => {
      addNewTaskBtn.click();
    });

    const newTaskModal = screen.queryByTestId("new-task-modal");

    expect(newTaskModal).toBeInTheDocument();
  });
});

describe("Test the icon Options", () => {
  test("The OptionsModal should be visible by clicking", () => {
    render(<App />);
    const optionsIcon = screen.getByTestId("options-icon");

    act(() => {
      optionsIcon.click();
    });

    const optionsModal = screen.queryByTestId("options-modal");
    expect(optionsModal).toBeInTheDocument();
  });
});
