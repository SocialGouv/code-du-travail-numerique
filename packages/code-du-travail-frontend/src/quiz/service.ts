import { QuizQuestion } from "@cdt/data";

export type PreviousResponse = {
  index: number;
  text: string;
};

export const getCurrentQuestion = (
  questionTree: QuizQuestion,
  previousResponses: PreviousResponse[]
): QuizQuestion => {
  if (!previousResponses.length) {
    return questionTree;
  }
  return previousResponses.reduce(
    (q: QuizQuestion, { index }: PreviousResponse) => {
      return q.responses[index].question ?? q;
    },
    questionTree
  );
};

export const getResponseStatement = (
  question: QuizQuestion,
  responseIndex: number
): string => {
  return `${question.statement} ${question.responses[
    responseIndex
  ].text.toLowerCase()}`;
};
