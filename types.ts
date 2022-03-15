export type Answer = {
  id: string;
  text: string;
  score: number;
};
export type Question = {
  id: string;
  title: string;
  answers: Answer[];
};

export type Result = {
  title: string;
  description: string;
};
