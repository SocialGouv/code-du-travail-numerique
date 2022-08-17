import { getContentBlockIds } from "../information.service";
import {
  Content,
  ContentBlock,
  EditorialContent,
  SectionDisplayMode,
} from "cdtn-types";

describe("function getContentBlockIds", () => {
  const mockedContent: Content = {
    blocks: [],
    name: "name",
    references: [],
    title: "title",
  };
  const mockedBlock: ContentBlock = {
    type: "content",
  };
  const mockedContentItem: EditorialContent = {
    cdtnId: "cdtnId",
    title: "title",
    breadcrumbs: [],
    contents: [],
    date: "",
    metaDescription: "",
    references: [],
    sectionDisplayMode: SectionDisplayMode.accordion,
  };
  let props: Content[];
  let result: string[];
  beforeEach(() => {
    result = getContentBlockIds(props);
  });
  describe("Given a parameter containing two blocks with cdtnId id1 & id2", () => {
    beforeAll(() => {
      props = [{ ...mockedContent }];
      props[0].blocks = [
        {
          ...mockedBlock,
          contents: [
            { ...mockedContentItem, cdtnId: "id1" },
            { ...mockedContentItem, cdtnId: "id2" },
          ],
        },
      ];
    });
    it("should return an array ['id1', 'id2']", () => {
      expect(result).toStrictEqual(["id1", "id2"]);
    });
  });
});
