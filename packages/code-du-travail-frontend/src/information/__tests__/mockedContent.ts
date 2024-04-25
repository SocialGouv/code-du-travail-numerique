import {
  EditorialContentType,
  EditorialContentBlockDisplayMode,
  EditorialContentContent,
} from "@socialgouv/cdtn-types";

export const mockedContents: EditorialContentContent[] = [
  {
    name: "tab1",
    title: "Tab1",
    blocks: [
      {
        type: EditorialContentType.markdown,
        markdown: "myText1",
        html: "myText1",
      },
      {
        type: EditorialContentType.graphic,
        size: "50",
        fileUrl: "myImage.svg",
        imgUrl: "myImage.svg",
        altText: "myAltText",
        markdown: "myGraphical",
        html: "myGraphical",
      },
      {
        type: EditorialContentType.content,
        title: "myContentTitle",
        blockDisplayMode: EditorialContentBlockDisplayMode.line,
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
        type: EditorialContentType.markdown,
        markdown: "myText2",
        html: "myText2",
      },
    ],
    references: [],
  },
];
