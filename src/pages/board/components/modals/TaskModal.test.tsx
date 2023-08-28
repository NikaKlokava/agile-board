import { render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { MemoryRouter } from "react-router-dom";
import renderer from "react-test-renderer";
import App from "../../../../App";
import { TaskModal } from "./TaskModal";

describe("Test the TaskModal component", () => {
  test("The TaskModal renders correctly", () => {
    const taskModalSnap = renderer.create(<TaskModal />).toJSON();
    expect(taskModalSnap).toMatchSnapshot();
  });
});

describe("Test the icon Options in the task container", () => {
  test("The OptionsModal should be visible by click on", () => {
    render(
      <MemoryRouter initialEntries={["/agile-board"]}>
        <App />
      </MemoryRouter>
    );
    const taskContainerEl = screen.getAllByTestId("task-container");

    act(() => {
      taskContainerEl.forEach((task) => {
        task.click();
      });
    });

    const optionsIcon = screen.getByTestId("task-options-icon");

    act(() => {
      optionsIcon.click();
    });

    const optionsModal = screen.queryByTestId("options-modal");
    expect(optionsModal).toBeInTheDocument();
  });
});
