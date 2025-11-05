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

const themes = Object.keys(contribs);

describe("<ContributionsList />", () => {
  it("affiche la liste des fiches pratiques", () => {
    const { container, getByLabelText } = render(
      <ContributionsList contribs={contribs} themes={themes} />
    );
    const selectThemes = getByLabelText("Sélectionnez un thème");
    expect(selectThemes).toBeInTheDocument();
    const themeOptions = within(selectThemes).getAllByRole("option");
    expect(themeOptions).toHaveLength(3);
    expect(themeOptions[0]).toHaveTextContent("Tous les thèmes");
    expect(themeOptions[1]).toHaveTextContent("Congés et repos");
    expect(themeOptions[2]).toHaveTextContent("Embauche et contrat");
    expect(container).toMatchSnapshot();
  });

  it("filtre sur le thème sélectionné", async () => {
    const { getAllByRole, getByLabelText } = render(
      <ContributionsList contribs={contribs} themes={themes} />
    );

    const themeHeadings = getAllByRole("heading", { level: 2 });
    expect(themeHeadings).toHaveLength(2);
    expect(themeHeadings[0]).toHaveTextContent("Congés et repos");
    expect(themeHeadings[1]).toHaveTextContent("Embauche et contrat");
    const documents = getAllByRole("heading", { level: 3 });
    expect(documents).toHaveLength(3);
    expect(documents[0]).toHaveTextContent("Congés payés");
    expect(documents[1]).toHaveTextContent("Jours fériés");
    expect(documents[2]).toHaveTextContent("Période d'essai");

    const selectThemes = getByLabelText("Sélectionnez un thème");
    await userEvent.selectOptions(selectThemes, "Embauche et contrat");
    const themeHeadingsFiltered = getAllByRole("heading", { level: 2 });
    expect(themeHeadingsFiltered).toHaveLength(1);
    expect(themeHeadingsFiltered[0]).toHaveTextContent("Embauche et contrat");
    const documentsFiltered = getAllByRole("heading", { level: 3 });
    expect(documentsFiltered).toHaveLength(1);
    expect(documentsFiltered[0]).toHaveTextContent("Période d'essai");
  });
});
