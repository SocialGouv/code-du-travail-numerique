import { ContentType, BlockDisplayMode, Content } from "cdtn-types";

export const mockedContents: Omit<Content, "references">[] = [
  {
    name: "tab1",
    title: "Tab1",
    blocks: [
      {
        type: ContentType.markdown,
        markdown: "myText1",
        html: "myText1",
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
  },
];
