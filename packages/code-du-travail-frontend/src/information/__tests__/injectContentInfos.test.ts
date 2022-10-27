import { injectContentInfos } from "../information.service";
import {
  BlockDisplayMode,
  Content,
  ContentBlockContent,
  ContentBlockContentItem,
  ContentType,
  EditorialContentData,
} from "cdtn-types";

describe("function injectContentInfos", () => {
  const mockedContent: Content = {
    blocks: [],
    name: "name",
    references: [],
    title: "title",
  };
  const mockedBlock: ContentBlockContent = {
    type: ContentType.content,
    blockDisplayMode: BlockDisplayMode.line,
    title: "title1",
    contents: [],
  };
  const mockedContentItem: ContentBlockContentItem = {
    cdtnId: "cdtnId",
    title: "title",
    description: "description",
    slug: "slug",
    source: "source",
  };
  let contentsProp: Content[];
  let fetchedContentsProp: EditorialContentData[];
  let result;
  beforeEach(() => {
    result = injectContentInfos(contentsProp, fetchedContentsProp);
  });
  describe(`
    Given parameters:
      - contentProps containing two blocks with (cdtnId:id1) & (cdtnId:id2)
      - fetchedContentProps with two contents (cdtnId:id1,icon:icon1) & (cdtnId:id2,icon:icon2)
  `, () => {
    beforeAll(() => {
      contentsProp = [{ ...mockedContent }];
      contentsProp[0].blocks = [
        {
          ...mockedBlock,
          contents: [
            {
              ...mockedContentItem,
              cdtnId: "id1",
            },
            {
              ...mockedContentItem,
              cdtnId: "id2",
            },
          ],
        },
      ];
      fetchedContentsProp = [
        {
          _source: {
            ...mockedContentItem,
            cdtnId: "id1",
            icon: "icon1",
          },
          slug: "",
        },
        {
          _source: {
            ...mockedContentItem,
            cdtnId: "id2",
            icon: "icon2",
          },
          slug: "",
        },
      ];
    });
    it("should return contents containing icon1 & icon2", () => {
      expect(result[0].blocks[0].contents[0].icon).toBe("icon1");
      expect(result[0].blocks[0].contents[1].icon).toBe("icon2");
    });
  });
});
