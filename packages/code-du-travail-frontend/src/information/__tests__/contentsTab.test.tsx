import { fireEvent, render, screen } from "@testing-library/react";
import { Contents } from "../Components";
import { ui } from "./ui";
import { SectionDisplayMode } from "@socialgouv/cdtn-utils";
import { mockedContents } from "./mockedContent";

jest.mock("../htmlProcess.service");

describe("Information Contents", () => {
  beforeEach(() => {
    render(
      <Contents
        anchor={""}
        dismissalProcess={false}
        sectionDisplayMode={SectionDisplayMode.tab}
        contents={mockedContents}
      />
    );
  });
  test("Vérifier l'affichage de l'onglet par défaut", () => {
    expect(ui.tabButton(0).query()).toBeInTheDocument();
    expect(ui.tabButton(1).query()).toBeInTheDocument();
    expect(screen.queryByText("myText1")).toBeInTheDocument();
    expect(screen.queryByText("myContentTitle")).toBeInTheDocument();
    expect(screen.queryByText("title1")).toBeInTheDocument();
    expect(screen.queryByText("description1")).toBeInTheDocument();
    expect(screen.queryByText("title2")).toBeInTheDocument();
    expect(screen.queryByText("description2")).toBeInTheDocument();
    expect(ui.separator.queryAll().length).toBe(2);
  });
  test("Vérifier l'affichage du détail de l'image", () => {
    fireEvent.click(ui.graphicBlock.seeDetail.get());
    expect(screen.queryByText("myGraphical")).toBeInTheDocument();
    expect(ui.graphicBlock.download.query()).toBeInTheDocument();
  });
  test("Vérifier l'affichage des références", () => {
    expect(screen.queryByText("referenceLink1")).toBeInTheDocument();
    expect(screen.queryByText("referenceLink2")).toBeInTheDocument();
  });
  test("Vérifier le changement d'onglet", () => {
    fireEvent.click(ui.tabButton(1).get());
    expect(screen.queryByText("myText1")).not.toBeInTheDocument();
    expect(screen.queryByText("myText2")).toBeInTheDocument();
    expect(ui.separator.query()).not.toBeInTheDocument();
  });
});
