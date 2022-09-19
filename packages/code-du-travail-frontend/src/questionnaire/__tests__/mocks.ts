import { QuestionnaireQuestion, QuestionnaireResponse } from "@cdt/data";

export const responseMock = (index: number): QuestionnaireResponse => ({
  text: `Response${index}`,
  trackingName: "name1",
});
export const questionMock = (index: number): QuestionnaireQuestion => ({
  text: `Question${index}`,
  trackingName: "name1",
  responses: [],
  responseStatement: `statement${index}`,
});
