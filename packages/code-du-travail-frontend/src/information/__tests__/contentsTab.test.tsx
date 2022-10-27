import { fireEvent, render, screen } from "@testing-library/react";
import { Contents } from "../Components";
import { ui } from "./ui";
import { SectionDisplayMode } from "cdtn-types";

jest.mock("../htmlProcess.service");

test(`Information Contents
  - Vérifier l'affichage en mode onglet
  - Vérifier le changement d'onglet
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
          blocks: [{ type: "markdown", markdown: "myText1", html: "myText1" }],
        },
        {
          name: "tab2",
          title: "Tab2",
          blocks: [{ type: "markdown", markdown: "myText2", html: "myText2" }],
        },
      ]}
    />
  );
  // Vérifier l'affichage en mode onglet
  expect(ui.tabButton(0).query()).toBeInTheDocument();
  expect(ui.tabButton(1).query()).toBeInTheDocument();
  expect(screen.queryByText("myText1")).toBeInTheDocument();
  // Vérifier le changement d'onglet
  fireEvent.click(ui.tabButton(1).get());
  expect(screen.queryByText("myText2")).toBeInTheDocument();
  expect(screen.queryByText("myText1")).not.toBeInTheDocument();
});
