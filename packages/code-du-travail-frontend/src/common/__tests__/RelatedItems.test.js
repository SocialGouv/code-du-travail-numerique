import React from "react";
import { render } from "@testing-library/react";
// import { matopush } from "../../piwik";
import { RelatedItems } from "../RelatedItems";

/*
jest.mock("../../piwik", () => ({
  matopush: jest.fn()
}));

jest.mock("next/link", () => {
  return ({ children }) => children;
});
*/

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

describe("<RelatedItems />", () => {
  test("should render", () => {
    const { container } = render(<RelatedItems items={items} />);
    expect(container).toMatchSnapshot();
  });

  /*
  it("should track related items clicks", async () => {
    jest.resetAllMocks();
    const { getByText } = render(<RelatedItems items={items} />);
    const link = getByText(/fiche sp/);
    link.click();

    expect(matopush).toHaveBeenCalledWith([
      "trackEvent",
      "selectRelated",
      "fiche-service-public/fiche.sp.url"
    ]);
  });*/
});
