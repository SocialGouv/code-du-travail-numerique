import { render } from "@testing-library/react";
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
        popularSlugs={[]}
      />
    );
    const headingsH2 = getAllByRole("heading", { level: 2 });
    expect(headingsH2).toHaveLength(4);
    expect(headingsH2[0]).toHaveTextContent("Sommaire");
    expect(headingsH2[1]).toHaveTextContent("Contenus populaires");
    expect(headingsH2[2]).toHaveTextContent("Congés et repos");
    expect(headingsH2[3]).toHaveTextContent("Embauche et contrat");
    const documents = getAllByRole("heading", { level: 3 });
    expect(documents).toHaveLength(3);
    expect(documents[0]).toHaveTextContent("Congés payés");
    expect(documents[1]).toHaveTextContent("Jours fériés");
    expect(documents[2]).toHaveTextContent("Période d'essai");
    expect(container).toMatchSnapshot();
  });
});
