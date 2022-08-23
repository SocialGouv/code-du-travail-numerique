import { QuestionnaireQuestion } from "@cdt/data";

export type PreviousResponse = {
  index: number;
  text: string;
};

export const getCurrentQuestion = (
  questionTree: QuestionnaireQuestion,
  previousResponses: PreviousResponse[]
): QuestionnaireQuestion => {
  if (!previousResponses.length) {
    return questionTree;
  }
  return previousResponses.reduce(
    (q: QuestionnaireQuestion, { index }: PreviousResponse) => {
      return q.responses[index].question ?? q;
    },
    questionTree
  );
};

export const getResponseStatement = (
  question: QuestionnaireQuestion,
  responseIndex: number
): string => {
  return `${question.statement} ${question.responses[
    responseIndex
  ].text.toLowerCase()}`;
};
