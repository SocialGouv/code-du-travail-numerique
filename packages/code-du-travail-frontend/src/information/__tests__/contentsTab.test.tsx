import { fireEvent, render, screen } from "@testing-library/react";
import { Contents } from "../Components";
import { ui } from "./ui";
import { SectionDisplayMode, ContentType, BlockDisplayMode } from "cdtn-types";

jest.mock("../htmlProcess.service");

test(`Information Contents
  - Vérifier l'affichage en mode onglet
  - Vérifier le changement d'onglet
  - Vérifier l'affichage markdown
  - Vérifier l'affichage graphic
  - Vérifier l'affichage content
`, async () => {
  await render(
    <Contents
      anchor={[]}
      dismissalProcess={false}
      sectionDisplayMode={SectionDisplayMode.tab}
      contents={[
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
      ]}
    />
  );
  // Vérifier l'affichage en mode onglet
  expect(ui.tabButton(0).query()).toBeInTheDocument();
  expect(ui.tabButton(1).query()).toBeInTheDocument();
  expect(screen.queryByText("myText1")).toBeInTheDocument();
  expect(ui.separator.query()).not.toBeInTheDocument();
  // Vérifier le changement d'onglet
  fireEvent.click(ui.tabButton(1).get());
  expect(ui.separator.queryAll().length).toBe(2);
  // Vérifier l'affichage markdown
  expect(screen.queryByText("myText1")).not.toBeInTheDocument();
  expect(screen.queryByText("myText2")).toBeInTheDocument();
  // Vérifier l'affichage graphic
  expect(ui.graphicBlock.seeDetail.query()).toBeInTheDocument();
  fireEvent.click(ui.graphicBlock.seeDetail.get());
  expect(screen.queryByText("myGraphical")).toBeInTheDocument();
  expect(ui.graphicBlock.download.query()).toBeInTheDocument();
  // Vérifier l'affichage content
  expect(screen.queryByText("myContentTitle")).toBeInTheDocument();
  expect(screen.queryByText("title1")).toBeInTheDocument();
  expect(screen.queryByText("description1")).toBeInTheDocument();
  expect(screen.queryByText("title2")).toBeInTheDocument();
  expect(screen.queryByText("description2")).toBeInTheDocument();
});
