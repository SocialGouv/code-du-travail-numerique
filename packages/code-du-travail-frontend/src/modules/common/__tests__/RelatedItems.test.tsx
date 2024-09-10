import { push as matopush } from "@socialgouv/matomo-next";
import { render } from "@testing-library/react";
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
    reco: "search",
  },
  {
    action: "voir",
    icon: "Custom",
    source: "external",
    title: "externalTool",
    url: "external.tools",
    reco: "search",
  },
  {
    slug: "modele.url",
    source: "modeles_de_courriers",
    title: "modele de courrier",
    reco: "search",
  },
  {
    action: "simuler",
    icon: "Depart",
    slug: "outils.url",
    source: "outils",
    title: "Simulateur",
    reco: "search",
  },
  {
    slug: "contrib.url",
    source: "contributions",
    title: "contrib",
    reco: "search",
  },
  {
    action: "tester",
    icon: "Contract",
    slug: "outil-2.slug",
    source: "outils",
    title: "fiche sp",
    reco: "search",
  },
];

describe("<RelatedItems />", () => {
  test("if no items", () => {
    const { container } = render(<RelatedItems items={[]} />);
    expect(container).toMatchInlineSnapshot(`<div />`);
  });
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
      '{"reco":"search","selection":"fiche-service-public/fiche.sp.url"}',
    ]);
  });
});
