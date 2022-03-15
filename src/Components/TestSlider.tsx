import { useState, VFC } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { Question, Answer } from "../../types";
import "./TestSlider.css";

const options = ["A", "B", "C", "D"];

const TestSlider: VFC<{
  questions: Question[];
  onFinish: (answers: Answer[]) => void;
}> = ({ questions, onFinish }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<Answer[]>([]);

  const updateAnswer = (answer: Answer, index: number) => {
    if (answers.length < index + 1) setAnswers([...answers, answer]);
    else {
      const updAnswer = [...answers];
      updAnswer[index] = answer;
      setAnswers(updAnswer);
    }
  };

  return (
    <div data-testid="carousel-quesitons" className="bg-gray-200 rounded-lg">
      <Carousel
        showThumbs={false}
        showIndicators={false}
        selectedItem={currentQuestionIndex}
        showArrows={false}
        showStatus={false}
      >
        {questions.map((question, index) => (
          <div key={question.id} className="text-left m-6">
            <span className="question-title text-xl">{question.title}</span>
            {question.answers.map((answer, ansIndex) => (
              <div
                key={answer.id}
                className={`p-4 mt-2 rounded-lg border bg-white hover:bg-gray-100 cursor-pointer ${
                  answers[index]?.id === answer.id && "border-red-400"
                }`}
                onClick={() => updateAnswer(answer, index)}
              >
                <span className="bg-green-100 p-2 mr-2">
                  {options[ansIndex]}
                </span>
                <span className="answer-text">{answer.text}</span>
              </div>
            ))}
            <div className="mt-4">
              {index !== 0 && (
                <button
                  onClick={() => setCurrentQuestionIndex(index - 1)}
                  className="btn btn-blue"
                >
                  Previous question
                </button>
              )}
              {questions.length > index + 1 && (
                <button
                  onClick={() =>
                    answers.length === index + 1 &&
                    setCurrentQuestionIndex(index + 1)
                  }
                  className={`next-button btn btn-blue tablet:float-right block tablet:inline mobile:mt-2 ${
                    answers.length < index + 1 && "disabled"
                  }`}
                >
                  Next question
                </button>
              )}
              {questions.length === index + 1 && (
                <button
                  onClick={() => onFinish(answers)}
                  className={`finish-button btn btn-red tablet:float-right tablet:block mobile:mt-2 ${
                    answers.length < index + 1 && "disabled"
                  }`}
                >
                  Finish Test
                </button>
              )}
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default TestSlider;
