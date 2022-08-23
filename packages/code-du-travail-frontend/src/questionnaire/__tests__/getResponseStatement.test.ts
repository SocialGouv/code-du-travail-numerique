import { getResponseStatement } from "../service";
import { QuestionnaireQuestion } from "@cdt/data";
import { questionMock, responseMock } from "./mocks";

describe("function getResponseStatement", () => {
  let questionParam: QuestionnaireQuestion;
  let indexParam: number;
  let result: string;
  describe(`Given
    - questionParam with question statement='statement1' & 2 response
    - indexParam = 1`, () => {
    beforeAll(() => {
      questionParam = {
        ...questionMock(1),
        responses: [responseMock(1), responseMock(2)],
      };
      indexParam = 1;
      result = getResponseStatement(questionParam, indexParam);
    });
    it("should return 'statement1 response2'", () => {
      expect(result).toBe("statement1 response2");
    });
  });
});
