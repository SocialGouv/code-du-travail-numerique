import { QuestionnaireQuestion, QuestionnaireResponse } from "@cdt/data";

export type PreviousResponse = {
  index: number;
  text: string;
};

export const getCurrentQuestion = (
  questionTree: QuestionnaireQuestion,
  previousResponses: PreviousResponse[]
): {
  currentQuestion: QuestionnaireQuestion;
  lastResponse?: QuestionnaireResponse;
} => {
  if (!previousResponses.length) {
    return { currentQuestion: questionTree };
  }
  return previousResponses.reduce(
    ({ currentQuestion: currentQuestionOld }, { index }: PreviousResponse) => {
      const lastResponse = currentQuestionOld.responses[index];
      const currentQuestion =
        currentQuestionOld.responses[index].question ?? currentQuestionOld;
      return { currentQuestion, lastResponse };
    },
    { currentQuestion: questionTree }
  );
};

export const getResponseStatement = (
  question: QuestionnaireQuestion,
  responseIndex: number
): string => {
  const { statement, text } = question.responses[responseIndex];
  return statement ?? `${question.statement} ${text.toLowerCase()}`;
};
