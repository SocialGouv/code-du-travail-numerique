import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Hierarchy from "../Hierarchy";

describe("<Hierarchy />", () => {
  it("renders correctly", () => {
    const { container } = render(<Hierarchy />);
    expect(container).toMatchSnapshot();
  });

  it("displays the main title", () => {
    render(<Hierarchy />);
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
      "Existe-t-il une hiérarchie entre les textes ?"
    );
  });

  it("displays the introduction text", () => {
    render(<Hierarchy />);
    expect(
      screen.getByText(/Le principe général en droit du travail est le suivant/)
    ).toBeInTheDocument();
  });

  it("renders all ExpandableCard components with correct titles", () => {
    render(<Hierarchy />);

    const expectedTitles = [
      "Les textes internationaux et européens",
      "La Constitution",
      "Lois, ordonnances et décrets (Code du travail)",
      "Les conventions et accords collectifs",
      "Les usages et les engagements unilatéraux",
      "Le règlement intérieur de l'entreprise",
      "Le contrat de travail",
    ];

    expectedTitles.forEach((title) => {
      expect(screen.getByText(title)).toBeInTheDocument();
    });
  });

  it("renders the correct number of ExpandableCard components", () => {
    render(<Hierarchy />);
    const cards = screen.getAllByRole("button");
    expect(cards).toHaveLength(7);
  });

  it("renders the conventions collectives card with id='hierarchie'", () => {
    render(<Hierarchy />);

    // Find the card with title "Les conventions et accords collectifs"
    const conventionsCard = screen
      .getByText("Les conventions et accords collectifs")
      .closest("div[id]");
    expect(conventionsCard).toHaveAttribute("id", "hierarchie");
  });
});
