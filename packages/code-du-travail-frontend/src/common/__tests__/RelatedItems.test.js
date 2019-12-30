import React from "react";
import { render } from "@testing-library/react";
import { RelatedItems } from "../RelatedItems";
const items = [
  {
    source: "fiches_service_public",
    slug: "fiche.sp.url",
    title: "fiche sp"
  },
  {
    source: "external",
    url: "external.tools",
    title: "externalTool",
    action: "voir",
    icon: "Custom"
  },
  {
    source: "modeles_de_courriers",
    title: "modele de courrier",
    slug: "modele.url"
  },
  {
    source: "outils",
    slug: "outils.url",
    title: "Simulateur",
    action: "simuler",
    icon: "Depart"
  },
  {
    source: "contributions",
    slug: "contrib.url",
    title: "contrib"
  },
  {
    source: "outils",
    slug: "outil-2.slug",
    title: "fiche sp",
    icon: "Contract",
    action: "tester"
  }
];
describe("<Article />", () => {
  test("should render", () => {
    const { container } = render(<RelatedItems items={items} />);
    expect(container).toMatchSnapshot();
  });
});
