import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { act } from "react-dom/test-utils";
import renderer from "react-test-renderer";
import App from "../../../App";
import { BoardContent } from "./BoardContent";
import { Provider } from "react-redux";
import store from "../../../redux/store/store";

describe("Test the BoardContent component", () => {
  test("The BoardContent renders correctly", () => {
    const boardContentSnap = renderer.create(
    <Provider store={store}>
    <BoardContent /></Provider>).toJSON();
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

// describe("Test the Task element", () => {
//   test("The TaskModal should be visible on click", () => {
//     render(
//       <MemoryRouter initialEntries={["/agile-board"]}>
//         <App />
//       </MemoryRouter>
//     );
//     const taskContainerEl = screen.getAllByTestId("task-container");

//     act(() => {
//       taskContainerEl.forEach((task) => {
//         task.click();
//       });
//     });

//     const taskModal = screen.queryByTestId("task-modal");

//     expect(taskModal).toBeInTheDocument();
//   });
// });
