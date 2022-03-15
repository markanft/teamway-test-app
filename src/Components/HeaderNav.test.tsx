import { render, screen } from "@testing-library/react";
import HeaderNav from "./HeaderNav";

test("renders title", () => {
  render(<HeaderNav />);
  const linkElement = screen.getByText(/Personality test/i);
  expect(linkElement).toBeInTheDocument();
});
