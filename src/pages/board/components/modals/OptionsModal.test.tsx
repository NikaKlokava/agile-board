import { render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import renderer from "react-test-renderer";
import App from "../../../../App";
import { MockTestAddBoard } from "../../../../mocks/TestMocks";
import { addBoard } from "../../../../redux/reducers/boardsSlice";
import store from "../../../../redux/store/store";
import { OptionsModal } from "./OptionsModal";

jest.mock("../../../../shared/hooks/useAuthorization", () => ({
  useAuthorization: () => ({ isUserExist: true }),
}));

afterEach(() => jest.clearAllMocks());

describe("Test the OptionsModal component", () => {
  test("The OptionsModal renders correctly", () => {
    jest.mock("./OptionsModal.tsx");
    const optionsModalSnap = renderer
      .create(
        <Provider store={store}>
          <OptionsModal
            type={"Board"}
            onDeleteClick={() => {}}
            onEditClick={() => {}}
          />
        </Provider>
      )
      .toJSON();
    expect(optionsModalSnap).toMatchSnapshot();
  });

  test("The EditBoardModal should be visible by click on edit board", () => {
    render(
      <MemoryRouter initialEntries={["/agile-board"]}>
        <App />
      </MemoryRouter>
    );

    act(() => {
      store.dispatch(addBoard(MockTestAddBoard));
    });

    const optionsIcon = screen.getByTestId("options-icon");

    act(() => {
      optionsIcon.click();
    });

    const editBoardEl = screen.getByTestId("options-edit-board");

    act(() => {
      editBoardEl.click();
    });

    const editBoardModal = screen.getByTestId("edit-board-modal");

    expect(editBoardModal).toBeInTheDocument();
  });

  test("The DeleteBoardModal should be visible by click on delete board", () => {
    render(
      <MemoryRouter initialEntries={["/agile-board"]}>
        <App />
      </MemoryRouter>
    );
    act(() => {
      store.dispatch(addBoard(MockTestAddBoard));
      console.log();
    });

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
