import { push as matopush } from "@socialgouv/matomo-next";
import { render } from "@testing-library/react";
import { RelatedItems } from "../RelatedItems";
import { RelatedItem } from "../../../api/modules/related-items/type";

jest.mock("@socialgouv/matomo-next", () => {
  return {
    push: jest.fn(),
  };
});
const items = [
  {
    items: [
      {
        source: "outils",
        title: "Heures d'absence pour rechercher un emploi",
        url: "/outils/heures-recherche-emploi",
      } as RelatedItem,
      {
        source: "outils",
        title: "Préavis de démission",
        url: "/outils/preavis-demission",
      } as RelatedItem,
    ],
    title: "Modèles et outils liés",
  },
  {
    items: [
      {
        source: "fiches_service_public",
        title:
          "Le salarié peut-il prendre des congés payés pendant son préavis ?",
        url: "/fiche-service-public/le-salarie-peut-il-prendre-des-conges-payes-pendant-son-preavis",
      } as RelatedItem,
      {
        source: "contributions",
        title: "Les congés pour événements familiaux",
        url: "/contribution/les-conges-pour-evenements-familiaux",
      } as RelatedItem,
      {
        source: "external",
        title: "Mon compte formation",
        url: "https://www.moncompteformation.gouv.fr",
      } as RelatedItem,
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

  it("should track related items clicks for internal link", async () => {
    jest.resetAllMocks();
    const { getByText } = render(<RelatedItems relatedItems={items} />);
    getByText(/événements familiaux/).click();

    expect(matopush).toHaveBeenCalledWith([
      "trackEvent",
      "selectRelated",
      '{"selection":"contribution/les-conges-pour-evenements-familiaux"}',
    ]);
  });
  it("should track related items clicks for external link", async () => {
    jest.resetAllMocks();
    const { getByText } = render(<RelatedItems relatedItems={items} />);
    getByText(/événements familiaux/).click();

    expect(matopush).toHaveBeenCalledWith([
      "trackEvent",
      "selectRelated",
      '{"selection":"contribution/les-conges-pour-evenements-familiaux"}',
    ]);

    getByText(/compte formation/).click();

    expect(matopush).toHaveBeenCalledWith([
      "trackEvent",
      "selectRelated",
      '{"selection":"https://www.moncompteformation.gouv.fr"}',
    ]);
  });
});
