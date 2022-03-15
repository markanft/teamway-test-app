import { VFC } from "react";
import { Result } from "../../types";

const FinishScreen: VFC<{ result: Result; restart: () => void }> = ({
  result,
  restart,
}) => {
  return (
    <div className="bg-gray-100 p-4">
      <span className="text-2xl text-center block text-red-400 font-bold">
        Result
      </span>
      <span data-testid="result-title" className="text-4xl text-center block">
        {result.title}
      </span>
      <p data-testid="result-description" className="mt-4">
        {result.description}
      </p>
      <button onClick={restart} className="btn btn-red mt-4">
        Restart Test
      </button>
    </div>
  );
};

export default FinishScreen;
