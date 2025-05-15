import { render, getAllByRole as getByRole } from "@testing-library/react";
import { ContributionsList } from "../ContributionsList";
import userEvent from "@testing-library/user-event";

const contribs = {
  "Thème A": [
    {
      title: "Contribution AA",
      slug: "contribution-aa",
      description: "Description contribution AA",
      source: "contributions",
    },
    {
      title: "Contribution AB",
      slug: "contribution-ab",
      description: "Description contribution AB",
      source: "contributions",
    },
  ],
  "Thème B": [
    {
      title: "Contribution BA",
      slug: "contribution-ba",
      description: "Description contribution BA",
      source: "contributions",
    },
  ],
};

describe("<ContributionsList />", () => {
  it("affiche la liste des fiches pratiques", () => {
    const { container, getByLabelText } = render(
      <ContributionsList contribs={contribs} />
    );
    const selectThemes = getByLabelText("Sélectionnez un thème");
    expect(selectThemes).toBeInTheDocument();
    const themeOptions = getByRole(selectThemes, "option");
    expect(themeOptions).toHaveLength(3);
    expect(themeOptions[0]).toHaveTextContent("Tous les thèmes");
    expect(themeOptions[1]).toHaveTextContent("Thème A");
    expect(themeOptions[2]).toHaveTextContent("Thème B");
    expect(container).toMatchSnapshot();
  });

  it("filtre sur le thème sélectionné", () => {
    const { getAllByRole, getByLabelText } = render(
      <ContributionsList contribs={contribs} />
    );

    const themes = getAllByRole("heading", { level: 2 });
    expect(themes).toHaveLength(2);
    expect(themes[0]).toHaveTextContent("Thème A");
    expect(themes[1]).toHaveTextContent("Thème B");
    const documents = getAllByRole("heading", { level: 3 });
    expect(documents).toHaveLength(3);
    expect(documents[0]).toHaveTextContent("Contribution AA");
    expect(documents[1]).toHaveTextContent("Contribution AB");
    expect(documents[2]).toHaveTextContent("Contribution BA");

    const selectThemes = getByLabelText("Sélectionnez un thème");
    userEvent.selectOptions(selectThemes, "Thème B");
    const themesFiltered = getAllByRole("heading", { level: 2 });
    expect(themesFiltered).toHaveLength(1);
    expect(themesFiltered[0]).toHaveTextContent("Thème B");
    const documentsFiltered = getAllByRole("heading", { level: 3 });
    expect(documentsFiltered).toHaveLength(1);
    expect(documentsFiltered[0]).toHaveTextContent("Contribution BA");
  });
});
