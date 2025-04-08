import React from "react";
import { render, screen } from "@testing-library/react";
import { GlossaryNavigation } from "../GlossaryNavigation";

describe("GlossaryNavigation", () => {
  it("should render all letter links", () => {
    const mockLetters = ["A", "B", "C"];

    render(<GlossaryNavigation letters={mockLetters} />);

    // Vérifier que chaque lettre est affichée
    expect(screen.getByText("A")).toBeInTheDocument();
    expect(screen.getByText("B")).toBeInTheDocument();
    expect(screen.getByText("C")).toBeInTheDocument();

    // Vérifier que les liens pointent vers les bons ancres
    expect(screen.getByText("A").closest("a")).toHaveAttribute(
      "href",
      "#ancre-A"
    );
    expect(screen.getByText("B").closest("a")).toHaveAttribute(
      "href",
      "#ancre-B"
    );
    expect(screen.getByText("C").closest("a")).toHaveAttribute(
      "href",
      "#ancre-C"
    );
  });

  it("should render separators between letters", () => {
    const mockLetters = ["A", "B", "C"];

    render(<GlossaryNavigation letters={mockLetters} />);

    // Vérifier que les séparateurs sont affichés (sauf pour le premier élément)
    const separators = screen.getAllByText("-");
    expect(separators).toHaveLength(2); // 2 séparateurs pour 3 lettres
  });

  it("should render empty container when no letters provided", () => {
    const { container } = render(<GlossaryNavigation letters={[]} />);
    const listItems = container.querySelectorAll("li");
    expect(listItems).toHaveLength(0);
  });
});
