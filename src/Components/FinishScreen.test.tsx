import { render, screen } from "@testing-library/react";
import FinishScreen from "./FinishScreen";
import { Result } from "../../types";

const MOCK_RESULT: Result = {
  title: "Result title",
  description: "Descirption of the result",
};

const mockCallback = jest.fn();

test("result", async () => {
  render(<FinishScreen result={MOCK_RESULT} restart={mockCallback} />);
  expect(screen.getByTestId("result-title")).toHaveTextContent(
    MOCK_RESULT.title
  );
  expect(screen.getByTestId("result-description")).toHaveTextContent(
    MOCK_RESULT.description
  );
});
