import { render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { MemoryRouter } from "react-router-dom";
import renderer from "react-test-renderer";
import App from "../../../../App";
import { OptionsModal } from "./OptionsModal";

describe("Test the OptionsModal component", () => {
  test("The OptionsModal renders correctly", () => {
    const optionsModalSnap = renderer.create(<OptionsModal />).toJSON();
    expect(optionsModalSnap).toMatchSnapshot();
  });

  test("The EditBoardModal should be visible by click on edit board", () => {
    render(
      <MemoryRouter initialEntries={["/agile-board"]}>
        <App />
      </MemoryRouter>
    );
    const optionsIcon = screen.getByTestId("options-icon");

    act(() => {
      optionsIcon.click();
    });

    const editBoardEl = screen.getByTestId("options-edit-board");

    act(() => {
      editBoardEl.click();
    });

    const editBoardModal = screen.queryByTestId("edit-board-modal");
    expect(editBoardModal).toBeInTheDocument();
  });

  test("The DeleteBoardModal should be visible by click on delete board", () => {
    render(
      <MemoryRouter initialEntries={["/agile-board"]}>
        <App />
      </MemoryRouter>
    );
    const optionsIcon = screen.getByTestId("options-icon");

    act(() => {
      optionsIcon.click();
    });

    const deleteBoardEl = screen.getByTestId("options-delete-board");

    act(() => {
      deleteBoardEl.click();
    });

    const deleteBoardModal = screen.queryByTestId("delete-board");
    expect(deleteBoardModal).toBeInTheDocument();
  });
});
