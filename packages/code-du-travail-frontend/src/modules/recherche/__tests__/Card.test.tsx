import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { SearchCard } from "../Card";
import { summarize } from "../../../search/utils";

// Mock des dépendances
jest.mock("../../../search/utils", () => ({
  summarize: jest.fn((text) => `Résumé: ${text}`),
}));

describe("<SearchCard />", () => {
  const defaultProps = {
    title: "Titre du document",
    description:
      "Description détaillée du document qui sera résumée par la fonction summarize",
    link: "/chemin/vers/document",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render with required props", () => {
    render(<SearchCard {...defaultProps} />);

    expect(screen.getByText("Titre du document")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Résumé: Description détaillée du document qui sera résumée par la fonction summarize"
      )
    ).toBeInTheDocument();

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/chemin/vers/document");
  });

  it("should render with category", () => {
    render(<SearchCard {...defaultProps} category="Catégorie Test" />);

    expect(screen.getByText("Catégorie Test")).toBeInTheDocument();
  });

  it("should not render category when not provided", () => {
    render(<SearchCard {...defaultProps} />);

    // Vérifier qu'aucun élément avec la classe fr-tag n'est présent
    const tagElements = document.querySelectorAll(".fr-tag");
    expect(tagElements.length).toBe(0);
  });

  it("should call onClick when clicked", () => {
    const mockOnClick = jest.fn();
    render(<SearchCard {...defaultProps} onClick={mockOnClick} />);

    const link = screen.getByRole("link");
    fireEvent.click(link);

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  it("should use summarize function for description", () => {
    render(<SearchCard {...defaultProps} />);

    expect(summarize).toHaveBeenCalledWith(defaultProps.description);
  });

  it("should render with empty description", () => {
    render(<SearchCard {...defaultProps} description="" />);

    expect(summarize).toHaveBeenCalledWith("");
    expect(screen.getByText("Résumé: ")).toBeInTheDocument();
  });

  it("should render in a grid column", () => {
    const { container } = render(<SearchCard {...defaultProps} />);

    // Vérifier que la carte est dans une colonne de grille
    const gridColumn = container.querySelector(".fr-col-12.fr-col-md-6");
    expect(gridColumn).toBeInTheDocument();
  });

  it("should render with horizontal layout", () => {
    const { container } = render(<SearchCard {...defaultProps} />);

    // Vérifier que la carte a un layout horizontal
    const card = container.querySelector(".fr-card");
    expect(card).toHaveClass("fr-card--horizontal");
  });

  it("should render with border", () => {
    const { container } = render(<SearchCard {...defaultProps} />);

    // Vérifier que la carte a une bordure
    const card = container.querySelector(".fr-card");
    expect(card).toHaveClass("fr-card--border");
  });

  it("should render with medium size", () => {
    const { container } = render(<SearchCard {...defaultProps} />);

    // Vérifier que la carte a une taille moyenne
    const card = container.querySelector(".fr-card");
    expect(card).toHaveClass("fr-card--medium");
  });

  it("should render with title as h3", () => {
    const { container } = render(<SearchCard {...defaultProps} />);

    // Vérifier que le titre est un h3
    const title = container.querySelector("h3");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Titre du document");
  });

  it("should render with blue title", () => {
    const { container } = render(<SearchCard {...defaultProps} />);

    // Vérifier que le titre a la classe blue-france
    const title = container.querySelector(".fr-card__title");
    expect(title).toHaveClass("fr-card__title--blue-france");
  });
});
