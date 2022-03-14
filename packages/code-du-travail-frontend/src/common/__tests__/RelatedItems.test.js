import { push as matopush } from "@socialgouv/matomo-next";
import { render } from "@testing-library/react";
import React from "react";

import { RelatedItems } from "../RelatedItems";

jest.mock("next/link", () => {
  return ({ children }) => children;
});

jest.mock("@socialgouv/matomo-next", () => {
  return {
    push: jest.fn(),
  };
});

const items = [
  {
    slug: "fiche.sp.url",
    source: "fiches_service_public",
    title: "fiche sp",
  },
  {
    action: "voir",
    icon: "Custom",
    source: "external",
    title: "externalTool",
    url: "external.tools",
  },
  {
    slug: "modele.url",
    source: "modeles_de_courriers",
    title: "modele de courrier",
  },
  {
    action: "simuler",
    icon: "Depart",
    slug: "outils.url",
    source: "outils",
    title: "Simulateur",
  },
  {
    slug: "contrib.url",
    source: "contributions",
    title: "contrib",
  },
  {
    action: "tester",
    icon: "Contract",
    slug: "outil-2.slug",
    source: "outils",
    title: "fiche sp",
  },
];

describe("<RelatedItems />", () => {
  test("should render", () => {
    const { container } = render(<RelatedItems items={items} />);
    expect(container).toMatchSnapshot();
  });

  it("should track related items clicks", async () => {
    jest.resetAllMocks();
    const { getByText } = render(<RelatedItems items={items} />);
    const link = getByText(/fiche sp/);
    link.click();

    expect(matopush).toHaveBeenCalledWith([
      "trackEvent",
      "selectRelated",
      '{"selection":"fiche-service-public/fiche.sp.url"}',
    ]);
  });
});
