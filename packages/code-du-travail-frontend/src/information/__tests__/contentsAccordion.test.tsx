import { fireEvent, render, screen } from "@testing-library/react";
import { Contents } from "../Components";
import { ui } from "./ui";
import { ContentType, SectionDisplayMode } from "@socialgouv/cdtn-types";

jest.mock("../htmlProcess.service");

describe("Information Contents", () => {
  beforeEach(() => {
    render(
      <Contents
        anchor={""}
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
            name: "accordion2",
            title: "Accordion2",
            blocks: [
              {
                type: ContentType.markdown,
                markdown: "myText2",
                html: "myText2",
              },
            ],
            references: [],
          },
        ]}
      />
    );
  });
  test("Vérifier l'affichage en mode accordéon", () => {
    expect(screen.queryByText("Accordion1")).toBeInTheDocument();
    expect(ui.accordionButton(0).query()).toBeInTheDocument();
    expect(screen.queryByText("Accordion2")).toBeInTheDocument();
    expect(ui.accordionButton(1).query()).toBeInTheDocument();
  });
  test("Vérifier l'ouverture des accordéons", () => {
    fireEvent.click(ui.accordionButton(0).get());
    expect(screen.queryByText("myText1")).toBeInTheDocument();
    fireEvent.click(ui.accordionButton(1).get());
    expect(screen.queryByText("myText2")).toBeInTheDocument();
  });
  test("Vérifier l'affichage des références", () => {
    expect(screen.queryByText("referenceLink1")).toBeInTheDocument();
    expect(screen.queryByText("referenceLink2")).toBeInTheDocument();
  });
});
