import {
  QuestionnaireQuestion,
  QuestionnaireResponse,
} from "@socialgouv/modeles-social";

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
      const {
        neutralStatement: text,
        neutralStatementRef,
        neutralStatementInfo: info,
      } = questionTree.responses[index];
      let slugSummary = {};
      if (text || neutralStatementRef) {
        const responses = previousResponses.concat({ index, text, info });
        if (question) {
          slugSummary = slugSummaryRecursive(question, responses);
        } else if (slug) {
          slugSummary = {
            [slug]: responses,
          };
        }
      }
      return { ...acc, ...slugSummary };
    },
    {}
  );
};
