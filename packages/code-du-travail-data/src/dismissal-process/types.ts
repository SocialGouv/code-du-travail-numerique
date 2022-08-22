export type QuizResponse = {
  text: string;
  info?: string;
  description?: string;
  slug?: string;
  question?: QuizQuestion;
};

export type QuizQuestion = {
  text: string;
  statement: string;
  info?: string;
  description?: string;
  responses: QuizResponse[];
};
