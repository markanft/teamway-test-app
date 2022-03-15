import { render, screen } from "@testing-library/react";
import App from "./App";

test("app container exists", () => {
  render(<App />);
  expect(screen.getByTestId("AppContainer")).toBeInTheDocument();
});
