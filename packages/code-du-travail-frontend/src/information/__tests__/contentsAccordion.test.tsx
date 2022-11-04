import { fireEvent, render, screen } from "@testing-library/react";
import { Contents } from "../Components";
import { ui } from "./ui";
import { ContentType, SectionDisplayMode } from "cdtn-types";

jest.mock("../htmlProcess.service");

test(`Information Contents
  - Vérifier l'affichage en mode accordéon
  - Vérifier l'ouverture des accordéons
`, async () => {
  await render(
    <Contents
      anchor={[]}
      dismissalProcess={false}
      sectionDisplayMode={SectionDisplayMode.accordion}
      contents={[
        {
          name: "accordion1",
          title: "Accordion1",
          blocks: [
            {
              type: ContentType.markdown,
              markdown: "myText1",
              html: "myText1",
            },
          ],
        },
        {
          name: "accordion2",
          title: "Accordion2",
          blocks: [
            {
              type: ContentType.markdown,
              markdown: "myText2",
              html: "myText2",
            },
          ],
        },
      ]}
    />
  );
  // Vérifier l'affichage en mode accordéon
  expect(screen.queryByText("Accordion1")).toBeInTheDocument();
  expect(ui.accordionButton(0).query()).toBeInTheDocument();
  expect(screen.queryByText("Accordion2")).toBeInTheDocument();
  expect(ui.accordionButton(1).query()).toBeInTheDocument();
  // Vérifier l'ouverture des accordéons
  fireEvent.click(ui.accordionButton(0).get());
  expect(screen.queryByText("myText1")).toBeInTheDocument();
  fireEvent.click(ui.accordionButton(1).get());
  expect(screen.queryByText("myText2")).toBeInTheDocument();
});
