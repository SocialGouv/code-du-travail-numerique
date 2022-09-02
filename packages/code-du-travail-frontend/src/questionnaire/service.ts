import { QuestionnaireQuestion, QuestionnaireResponse } from "@cdt/data";

import { PreviousResponse, SlugResponses } from "./type";

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
  return statement ?? `${question.responseStatement} ${text.toLowerCase()}`;
};

export const slugSummaryRecursive = (
  questionTree: QuestionnaireQuestion,
  previousResponses?: PreviousResponse[]
): SlugResponses => {
  return questionTree.responses.reduce(
    (
      acc: SlugResponses,
      { question, slug, isSlugReference }: QuestionnaireResponse,
      index: number
    ) => {
      const text = getResponseStatement(questionTree, index);
      let slugSummary = {};
      const responses = [...(previousResponses ?? []), { index, text }];
      if (question) {
        slugSummary = slugSummaryRecursive(question, responses);
      } else if (isSlugReference && slug) {
        slugSummary = {
          [slug]: responses,
        };
      }
      return { ...acc, ...slugSummary };
    },
    {}
  );
};
