import { push as matopush } from "@socialgouv/matomo-next";
import { render } from "@testing-library/react";
import { RelatedItems } from "../RelatedItems";

jest.mock("@socialgouv/matomo-next", () => {
  return {
    push: jest.fn(),
  };
});
const items= [
  {
    items: [
      {
        source: "outils",
        title: "Heures d'absence pour rechercher un emploi",
        url: "/outils/heures-recherche-emploi",
      },
      {
        source: "outils",
        title: "Préavis de démission",
        url: "/outils/preavis-demission",
      },
    ],
    title: "Modèles et outils liés",
  },
  {
    items: [
      {
        source: "fiches_service_public",
        title: "Démission d'une assistante maternelle",
        url: "https://www.service-public.fr/particuliers/vosdroits/F33164",
      },
      {
        source: "fiches_service_public",
        title: "Certificat de travail",
        url: "https://www.service-public.fr/particuliers/vosdroits/F87",
      },
      {
        source: "contributions",
        title: "Les congés pour événements familiaux",
        url: "/contribution/les-conges-pour-evenements-familiaux",
      },
    ],
    title: "Articles liés",
  },
];

describe("<RelatedItems />", () => {
  test("if no items", () => {
    const { container } = render(<RelatedItems relatedItems={[]} />);
    expect(container).toMatchInlineSnapshot(`<div />`);
  });
  test("should render", () => {
    const { container } = render(<RelatedItems relatedItems={items} />);
    expect(container).toMatchSnapshot();
  });

  it("should track related items clicks", async () => {
    jest.resetAllMocks();
    const { getByText } = render(<RelatedItems relatedItems={items} />);
    const link = getByText(/Certificat de travail/);
    link.click();

    expect(matopush).toHaveBeenCalledWith([
      "trackEvent",
      "selectRelated",
      '{"selection":"https://www.service-public.fr/particuliers/vosdroits/F87"}',
    ]);
  });
});
