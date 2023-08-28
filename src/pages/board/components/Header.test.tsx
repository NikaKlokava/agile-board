import { render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { MemoryRouter } from "react-router-dom";
import renderer from "react-test-renderer";
import { Header } from "./Header";
import App from "../../../App";

describe("Test the Header component", () => {
  test("The Header renders correctly", () => {
    const headerSnap = renderer.create(<Header />).toJSON();
    expect(headerSnap).toMatchSnapshot();
  });
});

describe("Test the button Add New Task", () => {
  test("The NewTaskModal should be visible on click", () => {
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
