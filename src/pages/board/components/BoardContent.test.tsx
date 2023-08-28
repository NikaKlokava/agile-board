import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { act } from "react-dom/test-utils";
import renderer from "react-test-renderer";
import App from "../../../App";
import { BoardContent } from "./BoardContent";

describe("Test the BoardContent component", () => {
  test("The BoardContent renders correctly", () => {
    const boardContentSnap = renderer.create(<BoardContent />).toJSON();
    expect(boardContentSnap).toMatchSnapshot();
  });
});

describe("Test the New Column element", () => {
  test("The EditBoardModal should be visible on click", () => {
    render(
      <MemoryRouter initialEntries={["/agile-board"]}>
        <App />
      </MemoryRouter>
    );
    const newColumnEl = screen.getByTestId("add_column");
    
    act(() => {
      newColumnEl.click();
    });
    
    const editBoardModal = screen.queryByTestId("edit-board-modal");

    expect(editBoardModal).toBeInTheDocument();
  });
});
