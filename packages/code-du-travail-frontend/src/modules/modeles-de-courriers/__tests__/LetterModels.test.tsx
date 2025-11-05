import { getAllByRole, getByLabelText, render } from "@testing-library/react";
import { LetterModels } from "../LetterModels";
import { ModelDescriptionByRootTheme } from "../queries";
import userEvent from "@testing-library/user-event";

const modeles: ModelDescriptionByRootTheme = [
  {
    theme: "Thème A",
    modeles: [
      {
        title: "Modele AA",
        slug: "modele-aa",
        description: "Description modèle AA",
        breadcrumbs: [
          {
            label: "Theme A",
            slug: "theme-a",
            position: 0,
          },
        ],
      },
      {
        title: "Modele AB",
        slug: "modele-ab",
        description: "Description modèle AB",
        breadcrumbs: [
          {
            label: "Theme A",
            slug: "theme-a",
            position: 0,
          },
        ],
      },
    ],
  },
  {
    theme: "Thème B",
    modeles: [
      {
        title: "Modele BA",
        slug: "modele-ba",
        description: "Description modèle BA",
        breadcrumbs: [
          {
            label: "Theme B",
            slug: "theme-b",
            position: 0,
          },
        ],
      },
    ],
  },
];

describe("<LetterModels />", () => {
  it("affiche la liste des modèles de document", () => {
    const { container, getByLabelText } = render(
      <LetterModels modeles={modeles} />
    );
    const selectThemes = getByLabelText("Sélectionnez un thème");
    expect(selectThemes).toBeInTheDocument();
    const themeOptions = getAllByRole(selectThemes, "option");
    expect(themeOptions).toHaveLength(3);
    expect(themeOptions[0]).toHaveTextContent("Tous les thèmes");
    expect(themeOptions[1]).toHaveTextContent("Thème A");
    expect(themeOptions[2]).toHaveTextContent("Thème B");
    expect(container).toMatchSnapshot();
  });
  it("filtre sur le thème sélectionné", async () => {
    const { getAllByRole, getByLabelText } = render(
      <LetterModels modeles={modeles} />
    );

    const themes = getAllByRole("heading", { level: 2 });
    expect(themes).toHaveLength(2);
    expect(themes[0]).toHaveTextContent("Thème A");
    expect(themes[1]).toHaveTextContent("Thème B");
    const documents = getAllByRole("heading", { level: 3 });
    expect(documents).toHaveLength(3);
    expect(documents[0]).toHaveTextContent("Modele AA");
    expect(documents[1]).toHaveTextContent("Modele AB");
    expect(documents[2]).toHaveTextContent("Modele BA");

    const selectThemes = getByLabelText("Sélectionnez un thème");
    await userEvent.selectOptions(selectThemes, "Thème B");
    const themesFiltered = getAllByRole("heading", { level: 2 });
    expect(themesFiltered).toHaveLength(1);
    expect(themesFiltered[0]).toHaveTextContent("Thème B");
    const documentsFiltered = getAllByRole("heading", { level: 3 });
    expect(documentsFiltered).toHaveLength(1);
    expect(documentsFiltered[0]).toHaveTextContent("Modele BA");
  });
});
