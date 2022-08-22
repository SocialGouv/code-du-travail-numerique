import { getCurrentQuestion, PreviousResponse } from "../service";
import { QuizQuestion } from "@cdt/data";
import { questionMock, responseMock } from "./mocks";

describe("function getCurrentQuestion", () => {
  const previousResponseMock = (index: number): PreviousResponse => ({
    text: `previousResponse${index}`,
    index,
  });
  let questionTreeParam: QuizQuestion;
  let previousResponsesParam: PreviousResponse[];
  let result: QuizQuestion;
  beforeEach(() => {
    result = getCurrentQuestion(questionTreeParam, previousResponsesParam);
  });
  describe(`Given:
  - a questionTreeParam with 2 level deep
  - a previousResponse of index [0, 1]`, () => {
    beforeAll(() => {
      questionTreeParam = {
        ...questionMock(1),
        responses: [
          {
            ...responseMock(1),
            question: {
              ...questionMock(11),
              responses: [
                {
                  ...responseMock(11),
                  question: {
                    ...questionMock(111),
                  },
                },
                {
                  ...responseMock(12),
                  question: {
                    ...questionMock(121),
                  },
                },
              ],
            },
          },
        ],
      };
      previousResponsesParam = [
        previousResponseMock(0),
        previousResponseMock(1),
      ];
    });
    it("should return question 121", () => {
      expect(result).toEqual(questionMock(121));
    });
  });
});
