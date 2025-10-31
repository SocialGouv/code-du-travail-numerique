import { render, within } from "@testing-library/react";
import { ContributionsList } from "../ContributionsList";
import userEvent from "@testing-library/user-event";

const contribs = {
  "Congés et repos": [
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
  "Embauche et contrat": [
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
};

describe("<ContributionsList />", () => {
  it("affiche la liste des fiches pratiques", () => {
    const { container, getAllByRole } = render(
      <ContributionsList
        contributions={contribs}
        popularContributionSlugs={[]}
      />
    );
    const headingsH2 = getAllByRole("heading", { level: 2 });
    expect(headingsH2).toHaveLength(4);
    expect(headingsH2[0]).toHaveTextContent("Résumé");
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
