import { sendEvent } from "@socialgouv/matomo-next";
import { render, screen } from "@testing-library/react";
import { RelatedItems } from "../RelatedItems";
import { RelatedItem } from "../../documents";

jest.mock("@socialgouv/matomo-next", () => {
  return {
    sendEvent: jest.fn(),
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
  test("affiche l'introduction et ouvre les liens externes dans un nouvel onglet", () => {
    render(
      <RelatedItems
        relatedItems={[
          {
            title: "Contenus liés",
            items: [
              {
                source: "external",
                title: "Service-public.fr",
                url: "https://www.service-public.fr",
                intro: "Le site officiel",
                external: true,
              },
              {
                source: "outils",
                title: "Préavis de démission",
                url: "/outils/preavis-demission",
              },
            ],
          },
        ]}
      />
    );

    const items = screen.getAllByRole("listitem");
    expect(items[0]).toHaveTextContent("Le site officiel : Service-public.fr");
    const external = screen.getByRole("link", { name: /Service-public\.fr/ });
    expect(external).toHaveAttribute("target", "_blank");
    expect(external).toHaveAttribute("rel", "noopener noreferrer");
    expect(
      screen.getByRole("link", { name: "Préavis de démission" })
    ).not.toHaveAttribute("target");
  });

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

    expect(sendEvent).toHaveBeenCalledWith({
      category: "selectRelated",
      action:
        '{"selection":"contribution/les-conges-pour-evenements-familiaux"}',
    });
  });
  it("should track related items clicks for external link", async () => {
    jest.resetAllMocks();
    const { getByText } = render(<RelatedItems relatedItems={items} />);
    getByText(/événements familiaux/).click();

    expect(sendEvent).toHaveBeenCalledWith({
      category: "selectRelated",
      action:
        '{"selection":"contribution/les-conges-pour-evenements-familiaux"}',
    });

    getByText(/compte formation/).click();

    expect(sendEvent).toHaveBeenCalledWith({
      category: "selectRelated",
      action: '{"selection":"https://www.moncompteformation.gouv.fr"}',
    });
  });
});
