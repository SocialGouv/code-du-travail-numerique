import { getResponseStatement } from "../service";
import { QuizQuestion } from "@cdt/data";
import { questionMock, responseMock } from "./mocks";

describe("function getResponseStatement", () => {
  let questionParam: QuizQuestion;
  let indexParam: number;
  let result: string;
  beforeEach(() => {
    result = getResponseStatement(questionParam, indexParam);
  });
  describe(`Given
    - questionParam with question statement='statement1' & 2 response
    - indexParam = 1`, () => {
    beforeAll(() => {
      questionParam = {
        ...questionMock(1),
        responses: [responseMock(1), responseMock(2)],
      };
      indexParam = 1;
    });
    it("should return 'statement1 response2'", () => {
      expect(result).toBe("statement1 response2");
    });
  });
});
