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

export const slugSummaryRecursive = (
  questionTree: QuestionnaireQuestion,
  previousResponses: PreviousResponse[] = []
): SlugResponses => {
  return questionTree.responses.reduce(
    (
      acc: SlugResponses,
      { question, slug }: QuestionnaireResponse,
      index: number
    ) => {
      const { infoStatement: text } = questionTree.responses[index];
      let slugSummary = {};
      const responses = previousResponses.concat({ index, text });
      if (question) {
        slugSummary = slugSummaryRecursive(question, responses);
      } else if (slug) {
        slugSummary = {
          [slug]: responses,
        };
      }
      return { ...acc, ...slugSummary };
    },
    {}
  );
};
