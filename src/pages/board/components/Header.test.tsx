import { render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { MemoryRouter } from "react-router-dom";
import renderer from "react-test-renderer";
import { Header } from "./Header";
import App from "../../../App";
import { Provider } from "react-redux";
import store from "../../../redux/store/store";
import { addBoard } from "../../../redux/actionCreators/newBoardCreator";
import { MockTestAddBoard } from "../../../mocks/TestMocks";

describe("Test the Header component", () => {
  test("The Header renders correctly", () => {
    const headerSnap = renderer
      .create(
        <Provider store={store}>
          <Header />
        </Provider>
      )
      .toJSON();
    expect(headerSnap).toMatchSnapshot();
  });
});
describe("Test the button Add New Task", () => {
  test("The button Add New Task should not be visible if there are no boards", () => {
    render(
      <MemoryRouter initialEntries={["/agile-board"]}>
        <App />
      </MemoryRouter>
    );
    const addNewTaskBtn = screen.queryByTestId("add-new-task-btn");

    expect(addNewTaskBtn).not.toBeInTheDocument();
  });

  test("The button Add New Task should be visible if there is one board or more", () => {
    render(
      <MemoryRouter initialEntries={["/agile-board"]}>
        <App />
      </MemoryRouter>
    );

    act(() => {
      store.dispatch(addBoard(MockTestAddBoard));
    });

    const addNewTaskBtn = screen.queryByTestId("add-new-task-btn");

    expect(addNewTaskBtn).toBeInTheDocument();
  });

  test("The NewTaskModal should be visible on button Add New Task click", () => {
    render(
      <MemoryRouter initialEntries={["/agile-board"]}>
        <App />
      </MemoryRouter>
    );
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
    render(
      <MemoryRouter initialEntries={["/agile-board"]}>
        <App />
      </MemoryRouter>
    );
    const optionsIcon = screen.getByTestId("options-icon");

    act(() => {
      optionsIcon.click();
    });

    const optionsModal = screen.queryByTestId("options-modal");
    expect(optionsModal).toBeInTheDocument();
  });
});
