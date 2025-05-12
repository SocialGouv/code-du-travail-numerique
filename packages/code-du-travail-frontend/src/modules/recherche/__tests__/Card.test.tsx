import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { SearchCard } from "../Card";
import { summarize } from "../../../search/utils";

// Mock des dépendances
jest.mock("../../../search/utils", () => ({
  summarize: jest.fn((text) => `Résumé: ${text}`),
}));

// Mock du composant Card de @codegouvfr/react-dsfr
jest.mock("@codegouvfr/react-dsfr/Card", () => ({
  Card: jest.fn(
    ({
      title,
      desc,
      linkProps,
      start,
      titleAs,
      border,
      horizontal,
      size,
      classes,
    }) => (
      <div
        className={`fr-card ${horizontal ? "fr-card--horizontal" : ""} ${border ? "fr-card--border" : ""} ${size ? `fr-card--${size}` : ""}`}
      >
        {start && <div className="fr-card__start">{start}</div>}
        <div className="fr-card__body">
          {titleAs === "h3" ? (
            <h3 className={`fr-card__title ${classes?.title || ""}`}>
              {title}
            </h3>
          ) : (
            <div className={`fr-card__title ${classes?.title || ""}`}>
              {title}
            </div>
          )}
          <p className="fr-card__desc">{desc}</p>
          <div className="fr-card__footer">
            <a href={linkProps?.href} onClick={linkProps?.onClick}>
              Voir plus
            </a>
          </div>
        </div>
      </div>
    )
  ),
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

  it("should pass border prop to Card component", () => {
    render(<SearchCard {...defaultProps} />);

    const card = screen.getByRole("link").closest(".fr-card");
    expect(card).toHaveClass("fr-card--border");
  });

  it("should pass medium size to Card component", () => {
    render(<SearchCard {...defaultProps} />);

    const card = screen.getByRole("link").closest(".fr-card");
    expect(card).toHaveClass("fr-card--medium");
  });

  it("should render title as h3", () => {
    render(<SearchCard {...defaultProps} />);

    const title = screen.getByText("Titre du document");
    expect(title.tagName).toBe("H3");
  });

  it("should apply blue-france class to title", () => {
    render(<SearchCard {...defaultProps} />);

    const title = screen.getByText("Titre du document");
    expect(title).toHaveClass("fr-card__title--blue-france");
  });
});
