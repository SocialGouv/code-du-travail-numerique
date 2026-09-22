import { render, screen, within } from "@testing-library/react";
import { ListLayout } from "../ListLayout";
import { SOURCES } from "@socialgouv/cdtn-utils";

const contribs = [
  {
    theme: {
      label: "Congés et repos",
      position: 0,
      slug: "conges-et-repos",
    },
    documents: [
      {
        title: "Congés payés",
        slug: "conges-payes",
        description: "Tout savoir sur les congés payés",
        source: "contributions",
        breadcrumbs: [{ label: "Congés et repos" }],
        theme: "Congés et repos",
        idcc: "0000",
      },
      {
        title: "Jours fériés",
        slug: "jours-feries",
        description: "Informations sur les jours fériés",
        source: "contributions",
        breadcrumbs: [{ label: "Congés et repos" }],
        theme: "Congés et repos",
        idcc: "0000",
      },
    ],
  },
  {
    theme: {
      label: "Embauche et contrat",
      position: 1,
      slug: "embauche-et-contrat",
    },
    documents: [
      {
        title: "Période d'essai",
        slug: "periode-essai",
        description: "Tout savoir sur la période d'essai",
        source: "contributions",
        breadcrumbs: [{ label: "Embauche et contrat" }],
        theme: "Embauche et contrat",
        idcc: "0000",
      },
    ],
  },
];

describe("<ListLayout />", () => {
  it("affiche la liste des contenus", () => {
    const { container, getAllByRole } = render(
      <ListLayout
        source={SOURCES.CONTRIBUTIONS}
        title={""}
        description={""}
        data={contribs}
        popularDocuments={[
          { source: SOURCES.CONTRIBUTIONS, slug: "periode-essai" },
        ]}
      />
    );
    const headingsH2 = getAllByRole("heading", { level: 2 });
    expect(headingsH2).toHaveLength(4);
    expect(headingsH2[0]).toHaveTextContent("Sommaire");
    expect(headingsH2[1]).toHaveTextContent("Contenus populaires");
    expect(headingsH2[2]).toHaveTextContent("Congés et repos");
    expect(headingsH2[3]).toHaveTextContent("Embauche et contrat");
    const documents = getAllByRole("heading", { level: 3 });
    expect(documents).toHaveLength(4);
    expect(documents[0]).toHaveTextContent("Période d'essai");
    expect(documents[1]).toHaveTextContent("Congés payés");
    expect(documents[2]).toHaveTextContent("Jours fériés");
    expect(documents[3]).toHaveTextContent("Période d'essai");
    expect(container).toMatchSnapshot();
  });

  describe("fiches pratiques (#7464)", () => {
    // Une contribution et une fiche infos de même slug, dans une même section.
    const mixed = [
      {
        theme: { label: "Congés et repos", position: 0, slug: "conges" },
        documents: [
          {
            title: "Les congés payés",
            slug: "conges-payes",
            description: "",
            source: "contributions",
          },
          {
            title: "Tout sur les congés payés",
            slug: "conges-payes",
            description: "",
            source: "information",
          },
        ],
      },
    ];

    it("apparie les contenus populaires sur le couple (source, slug)", () => {
      render(
        <ListLayout
          source={SOURCES.CONTRIBUTIONS}
          title=""
          description=""
          data={mixed}
          popularDocuments={[
            { source: SOURCES.EDITORIAL_CONTENT, slug: "conges-payes" },
          ]}
        />
      );

      const popular = screen
        .getByRole("heading", { level: 2, name: "Contenus populaires" })
        .closest("section") as HTMLElement;
      const links = within(popular).getAllByRole("link");
      expect(links).toHaveLength(1);
      expect(links[0]).toHaveTextContent("Tout sur les congés payés");
      expect(links[0]).toHaveAttribute("href", "/information/conges-payes");
    });

    it("tague chaque carte, contenus populaires inclus", () => {
      render(
        <ListLayout
          source={SOURCES.CONTRIBUTIONS}
          title=""
          description=""
          data={mixed}
          popularDocuments={[
            { source: SOURCES.CONTRIBUTIONS, slug: "conges-payes" },
          ]}
        />
      );

      // 1 carte populaire (contribution) + 2 cartes dans la section du thème.
      expect(
        screen.getAllByText("Selon ma convention collective")
      ).toHaveLength(2);
      expect(screen.getAllByText("Fiche infos")).toHaveLength(1);
    });

    it("ne tague pas les cartes des autres rubriques", () => {
      render(
        <ListLayout
          source={SOURCES.LETTERS}
          title=""
          description=""
          data={mixed}
          popularDocuments={[]}
        />
      );

      expect(
        screen.queryByText("Selon ma convention collective")
      ).not.toBeInTheDocument();
      expect(screen.queryByText("Fiche infos")).not.toBeInTheDocument();
    });
  });
});
