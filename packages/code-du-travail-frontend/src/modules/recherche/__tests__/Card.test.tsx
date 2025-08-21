import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { SearchCard } from "../Card";
import { summarize } from "src/modules/utils";

// Mock des dépendances
jest.mock("src/modules/utils", () => ({
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

  it("should render in a grid column", () => {
    const { container } = render(<SearchCard {...defaultProps} />);

    // Vérifier que la carte est dans une colonne de grille
    const gridColumn = container.querySelector(".fr-col-12.fr-col-md-6");
    expect(gridColumn).toBeInTheDocument();
  });

  it("should pass horizontal prop to Card component", () => {
    render(<SearchCard {...defaultProps} />);

    const card = screen.getByRole("link").closest(".fr-card");
    expect(card).toHaveClass("fr-card--horizontal");
  });
});
