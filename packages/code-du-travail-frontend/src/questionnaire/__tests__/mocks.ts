import { QuestionnaireQuestion, QuestionnaireResponse } from "@cdt/data";

export const responseMock = (index: number): QuestionnaireResponse => ({
  text: `Response${index}`,
});
export const questionMock = (index: number): QuestionnaireQuestion => ({
  text: `Question${index}`,
  responses: [],
  responseStatement: `statement${index}`,
});
