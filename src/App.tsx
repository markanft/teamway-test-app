import { useEffect, useState } from "react";
import { Answer, Question, Result } from "../types";
import "./App.css";
import HeaderNav from "./Components/HeaderNav";
import TestSlider from "./Components/TestSlider";
import FinishScreen from "./Components/FinishScreen";

function App() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [result, setResult] = useState<Result | null>(null);

  const submitAnswers = (answers: Answer[]) => {
    const score = answers.reduce((a, b) => a + b.score, 0);
    fetch(`http://localhost:3001/result?score=${score}`)
      .then((result) => result.json())
      .then(setResult);
  };

  const restartHandler = () => {
    setResult(null);
  };

  useEffect(() => {
    fetch("http://localhost:3001/questions")
      .then((result) => result.json())
      .then(setQuestions);
  }, []);

  return (
    <div data-testid="AppContainer" className="App">
      <div className="w-1/2 m-auto">
        <HeaderNav />
        {!result && (
          <TestSlider onFinish={submitAnswers} questions={questions} />
        )}
        {result && <FinishScreen result={result} restart={restartHandler} />}
      </div>
    </div>
  );
}

export default App;
