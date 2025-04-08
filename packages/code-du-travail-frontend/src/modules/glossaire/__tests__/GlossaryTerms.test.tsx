import React from "react";
import { render, screen } from "@testing-library/react";
import { GlossaryTerms } from "../GlossaryTerms";
import { GlossaryLetter } from "../types";

// Mock des modules externes
jest.mock("next/link", () => {
  const MockNextLink = ({
    children,
    href,
  }: {
    children: React.ReactNode;
    href: string;
  }) => <a href={href}>{children}</a>;
  MockNextLink.displayName = "MockNextLink";
  return MockNextLink;
});

describe("GlossaryTerms", () => {
  it("should render letter headings and terms", () => {
    const mockLetters: GlossaryLetter[] = [
      {
        letter: "A",
        terms: [
          { term: "Accord", slug: "accord", definition: "Définition d'accord" },
          { term: "Arrêt", slug: "arret", definition: "Définition d'arrêt" },
        ],
      },
      {
        letter: "B",
        terms: [
          {
            term: "Bénéfice",
            slug: "benefice",
            definition: "Définition de bénéfice",
          },
        ],
      },
      {
        letter: "C",
        terms: [],
      },
    ];

    render(<GlossaryTerms letters={mockLetters} />);

    // Vérifier que les titres des lettres sont affichés
    expect(screen.getByText("A")).toBeInTheDocument();
    expect(screen.getByText("B")).toBeInTheDocument();
    expect(screen.queryByText("C")).not.toBeInTheDocument(); // C ne devrait pas apparaître car pas de termes

    // Vérifier que les termes sont affichés
    expect(screen.getByText("Accord")).toBeInTheDocument();
    expect(screen.getByText("Arrêt")).toBeInTheDocument();
    expect(screen.getByText("Bénéfice")).toBeInTheDocument();

    // Vérifier que les liens sont corrects
    expect(screen.getByText("Accord").closest("a")).toHaveAttribute(
      "href",
      "/glossaire/accord"
    );
    expect(screen.getByText("Arrêt").closest("a")).toHaveAttribute(
      "href",
      "/glossaire/arret"
    );
    expect(screen.getByText("Bénéfice").closest("a")).toHaveAttribute(
      "href",
      "/glossaire/benefice"
    );
  });

  it("should not render anything when no letters have terms", () => {
    const mockLetters: GlossaryLetter[] = [
      { letter: "A", terms: [] },
      { letter: "B", terms: [] },
    ];

    const { container } = render(<GlossaryTerms letters={mockLetters} />);

    // Container should be empty except for the wrapper div
    expect(container.firstChild?.childNodes.length).toBe(0);
  });
});
