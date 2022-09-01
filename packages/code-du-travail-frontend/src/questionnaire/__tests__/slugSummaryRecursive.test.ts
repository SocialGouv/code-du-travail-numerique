import { slugSummaryRecursive } from "../service";
import { QuestionnaireQuestion } from "@cdt/data";
import { questionMock, responseMock } from "./mocks";
import { SlugResponses } from "../type";

describe("function getCurrentQuestion", () => {
  let result: SlugResponses;
  describe(`Given:
  - a questionTreeParam with 1 level deep ending with slug1 & slug2 as slugReference
  - a previousResponse of index [0, 1]`, () => {
    beforeAll(() => {
      const questionTreeParam: QuestionnaireQuestion = {
        ...questionMock(1),
        responses: [
          {
            ...responseMock(1),
            question: {
              ...questionMock(11),
              responses: [
                {
                  ...responseMock(11),
                  slug: "slug1",
                },
                {
                  ...responseMock(12),
                  slug: "slug2",
                  isSlugReference: true,
                },
              ],
            },
          },
        ],
      };
      result = slugSummaryRecursive(questionTreeParam);
    });
    it("should return slug2", () => {
      const keys = Object.keys(result);
      expect(keys[0]).toEqual("slug2");
    });
    it("should not return slug1", () => {
      const keys = Object.keys(result);
      expect(keys.indexOf("slug1")).toEqual(-1);
    });
    it("should return responses leading to slug2", () => {
      expect(result.slug2.length).toEqual(2);
      const [{ index: index1 }, { index: index2 }] = result.slug2;
      expect(index1).toEqual(0);
      expect(index2).toEqual(1);
    });
  });
});
