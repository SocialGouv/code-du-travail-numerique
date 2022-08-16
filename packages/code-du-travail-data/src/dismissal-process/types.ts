export type QuizResponse = {
  text: string;
  info?: string;
  description?: string;
  slug?: string;
  question?: QuizQuestion;
};

export type QuizQuestion = {
  text: string;
  info?: string;
  responses: QuizResponse[];
};
