import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";
import { MemoryRouter } from "react-router-dom";

test("renders learn react link", () => {
  render(
    <MemoryRouter initialEntries={["/agile-board"]}>
      <App />
    </MemoryRouter>
  );
  const linkElement = screen.getByText(/AGILE-BOARD/i);
  expect(linkElement).toBeInTheDocument();
});
