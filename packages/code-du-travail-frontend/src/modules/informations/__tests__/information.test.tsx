import { render, within } from "@testing-library/react";
import { Information } from "../Information";
import { information } from "./data";
import { format } from "../queries";

jest.mock("@socialgouv/matomo-next", () => {
  return {
    push: jest.fn(),
  };
});

afterEach(() => {
  jest.resetAllMocks();
});

describe("<Information />", () => {
  it("affiche une page information classique", () => {
    const data = format(information);
    const { getByRole, getAllByRole, getByText } = render(
      <Information
        date={data!.information.date}
        title={data!.information.title}
        breadcrumbs={data!.information.breadcrumbs}
        description={data!.information.description}
        intro={data!.information.intro}
        contents={data!.information.contents}
        references={data?.information.references}
        relatedItems={[
          {
            title: "Articles liés",
            items: [
              {
                title:
                  "L'accompagnement des personnes sans emploi pour la création et la reprise d’entreprise",
                url: "/fiche-ministere-travail/accompagnement-des-personnes-sans-emploi-pour-la-creation-et-la-reprise-dentreprise",
                source: "fiches_ministere_travail",
              },
            ],
          },
        ]}
      />
    );

    expect(getByRole("heading", { level: 1 })).toHaveTextContent(
      "Personnes vulnérables : accompagnement de la reprise d'activité"
    );
    expect(
      getByText(
        "Les personnes à risque de forme grave de Covid-19 peuvent reprendre leur activité professionnelle en présentiel, sous réserve de certaines mesures de protection."
      )
    ).toBeInTheDocument();
    const heading2 = getAllByRole("heading", { level: 2 });
    // Le bloc « Partager la page » (role heading niveau 2) n'est plus affiché
    expect(heading2).toHaveLength(4);
    expect(heading2[0]).toHaveTextContent("Quelle situation ou pathologie ?");
    expect(heading2[1]).toHaveTextContent(
      "Retour en présentiel et mesures d'accompagnement"
    );
  });

  // Le fil d'Ariane et son JSON-LD sont assertés dans le même test, sur le
  // modèle des contributions : les deux ne doivent pas diverger.
  it("remonte vers les fiches pratiques, pas vers les thèmes (#7464)", () => {
    const data = format(information)!;
    const rendering = render(
      <Information
        date={data.information.date}
        title={data.information.title}
        breadcrumbs={[
          { label: "Santé, sécurité", position: 1, slug: "/themes/sante" },
          { label: "Covid-19", position: 2, slug: "/themes/covid-19" },
        ]}
        description={data.information.description}
        intro={data.information.intro}
        contents={data.information.contents}
        references={data.information.references}
        relatedItems={[]}
      />
    );

    const nav = rendering.getByRole("navigation");
    expect(
      within(nav)
        .getAllByRole("link")
        .map((link) => [link.textContent, link.getAttribute("href")])
    ).toEqual([
      ["Accueil", "/"],
      ["Fiches pratiques", "/contribution"],
    ]);
    expect(
      within(nav).getByText(
        (_, el) => el?.getAttribute("aria-current") === "page"
      )
    ).toHaveTextContent(
      "Personnes vulnérables : accompagnement de la reprise d'activité"
    );

    const jsonLd = JSON.parse(
      rendering.container.querySelector("#jsonld-breadcrumbs")?.textContent ??
        "{}"
    );
    expect(jsonLd.itemListElement.map(({ name }) => name)).toEqual([
      "Accueil",
      "Fiches pratiques",
      data.information.title,
    ]);

    // Les thèmes restent accessibles sous le titre, via les tags cliquables.
    const tagsGroup = rendering.container.querySelector("ul.fr-tags-group");
    const tags = within(tagsGroup as HTMLElement).getAllByRole("link");
    expect(tags.map((tag) => tag.getAttribute("href"))).toEqual([
      "/themes/sante",
      "/themes/covid-19",
    ]);
  });
});
