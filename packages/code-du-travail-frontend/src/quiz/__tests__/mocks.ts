import { QuizQuestion, QuizResponse } from "@cdt/data";

export const responseMock = (index: number): QuizResponse => ({
  text: `Response${index}`,
});
export const questionMock = (index: number): QuizQuestion => ({
  text: `Question${index}`,
  responses: [],
  statement: `statement${index}`,
});
