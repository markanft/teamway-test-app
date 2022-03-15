import { render, screen, fireEvent } from "@testing-library/react";
import TestSlider from "./TestSlider";
import { Question } from "../../types";

const MOCK_QUESTIONS: Question[] = [
  {
    id: "question1",
    title: "Question 1",
    answers: [
      { id: "ans-1", text: "Answer 1", score: 5 },
      { id: "ans-2", text: "Answer 2", score: 10 },
    ],
  },
  {
    id: "question-2",
    title: "Question 2",
    answers: [
      { id: "ans-3", text: "Answer 3", score: 5 },
      { id: "ans-4", text: "Answer 4", score: 10 },
    ],
  },
  {
    id: "question-3",
    title: "Question 3",
    answers: [
      { id: "ans-5", text: "Answer 5", score: 5 },
      { id: "ans-6", text: "Answer 6", score: 10 },
    ],
  },
];

const mockCallback = jest.fn();

test("questions listed", async () => {
  render(<TestSlider questions={MOCK_QUESTIONS} onFinish={mockCallback} />);
  const questions = screen
    .getByTestId("carousel-quesitons")
    .getElementsByClassName("question-title");
  expect(questions.length).toBe(3);
  expect(questions[0]).toHaveTextContent(MOCK_QUESTIONS[0].title);
  expect(questions[1]).toHaveTextContent(MOCK_QUESTIONS[1].title);
  expect(questions[2]).toHaveTextContent(MOCK_QUESTIONS[2].title);
});

test("answers listed", async () => {
  render(<TestSlider questions={MOCK_QUESTIONS} onFinish={mockCallback} />);
  const answers = screen
    .getByTestId("carousel-quesitons")
    .getElementsByClassName("answer-text");
  expect(answers.length).toBe(6);
  expect(answers[0]).toHaveTextContent(MOCK_QUESTIONS[0].answers[0].text);
  expect(answers[1]).toHaveTextContent(MOCK_QUESTIONS[0].answers[1].text);
  expect(answers[2]).toHaveTextContent(MOCK_QUESTIONS[1].answers[0].text);
  expect(answers[3]).toHaveTextContent(MOCK_QUESTIONS[1].answers[1].text);
  expect(answers[4]).toHaveTextContent(MOCK_QUESTIONS[2].answers[0].text);
  expect(answers[5]).toHaveTextContent(MOCK_QUESTIONS[2].answers[1].text);
});

test("get clicked answers", async () => {
  render(<TestSlider questions={MOCK_QUESTIONS} onFinish={mockCallback} />);
  const answers = screen
    .getByTestId("carousel-quesitons")
    .getElementsByClassName("answer-text");
  const nextButton = screen
    .getByTestId("carousel-quesitons")
    .getElementsByClassName("next-button");
  const finishButton = screen
    .getByTestId("carousel-quesitons")
    .getElementsByClassName("finish-button");

  fireEvent.click(answers[0].parentElement as HTMLElement);
  fireEvent.click(nextButton[0]);
  fireEvent.click(answers[3].parentElement as HTMLElement);
  fireEvent.click(nextButton[0]);
  fireEvent.click(answers[5].parentElement as HTMLElement);
  fireEvent.click(finishButton[0]);

  const expectedFinishResult = [
    { id: "ans-1", score: 5, text: "Answer 1" },
    { id: "ans-4", score: 10, text: "Answer 4" },
    { id: "ans-6", score: 10, text: "Answer 6" },
  ];

  expect(mockCallback.mock.calls.length).toBe(1);
  expect(mockCallback.mock.calls[0][0]).toStrictEqual(expectedFinishResult);
});
