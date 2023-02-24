import { ContentType, BlockDisplayMode, Content } from "cdtn-types";

export const mockedContents: Content[] = [
  {
    name: "tab1",
    title: "Tab1",
    blocks: [
      {
        type: ContentType.markdown,
        markdown: "myText1",
        html: "myText1",
      },
      {
        type: ContentType.graphic,
        size: "50",
        fileUrl: "myImage.svg",
        imgUrl: "myImage.svg",
        altText: "myAltText",
        markdown: "myGraphical",
        html: "myGraphical",
      },
      {
        type: ContentType.content,
        title: "myContentTitle",
        blockDisplayMode: BlockDisplayMode.line,
        contents: [
          {
            cdtnId: "id1",
            slug: "slug1",
            description: "description1",
            source: "source1",
            title: "title1",
          },
          {
            cdtnId: "id2",
            slug: "slug2",
            description: "description2",
            source: "source2",
            title: "title2",
          },
        ],
      },
    ],
    references: [
      {
        label: "referenceLabel",
        links: [
          {
            id: "id1",
            slug: "slug1",
            title: "referenceLink1",
            type: "external",
            url: "url1",
          },
          {
            id: "id2",
            slug: "slug2",
            title: "referenceLink2",
            type: "external",
            url: "url2",
          },
        ],
      },
    ],
  },
  {
    name: "tab2",
    title: "Tab2",
    blocks: [
      {
        type: ContentType.markdown,
        markdown: "myText2",
        html: "myText2",
      },
    ],
    references: [],
  },
];
