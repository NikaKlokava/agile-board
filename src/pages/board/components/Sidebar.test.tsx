import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { act } from "react-dom/test-utils";
import renderer from "react-test-renderer";
import App from "../../../App";
import { Sidebar } from "./Sidebar";

describe("Test the Sidebar component", () => {
  test("The Sidebar renders correctly", () => {
    const sidebarSnap = renderer.create(<Sidebar />).toJSON();
    expect(sidebarSnap).toMatchSnapshot();
  });
});

describe("Test the New Board element", () => {
  test("The NewBoardModal should be visible on click", () => {
    render(
      <MemoryRouter initialEntries={["/agile-board"]}>
        <App />
      </MemoryRouter>
    );
    const newBoardEl = screen.getByTestId("new-board");

    act(() => {
      newBoardEl.click();
    });

    const newBoardModal = screen.queryByTestId("new-board-modal");

    expect(newBoardModal).toBeInTheDocument();
  });
});
