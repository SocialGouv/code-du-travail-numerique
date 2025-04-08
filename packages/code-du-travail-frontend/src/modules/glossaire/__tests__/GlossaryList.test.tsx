import React from "react";
import { render, screen } from "@testing-library/react";
import { GlossaryList } from "../GlossaryList";
import { GlossaryTerm } from "../types";
import { getGlossaryLetters } from "../utils";

// Mock des composants et fonctions utilisés
jest.mock("../GlossaryNavigation", () => ({
  GlossaryNavigation: ({ letters }: { letters: string[] }) => (
    <div data-testid="glossary-navigation">
      Navigation letters: {letters.join(", ")}
    </div>
  ),
}));

jest.mock("../GlossaryTerms", () => ({
  GlossaryTerms: ({ letters }: { letters: any[] }) => (
    <div data-testid="glossary-terms">
      Showing terms for {letters.filter((l) => l.terms.length > 0).length}{" "}
      letters
    </div>
  ),
}));

jest.mock("../utils", () => ({
  getGlossaryLetters: jest.fn(),
}));

jest.mock("../../layout/ContainerWithBreadcrumbs", () => ({
  ContainerWithBreadcrumbs: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="breadcrumbs-container">{children}</div>
  ),
}));

describe("GlossaryList", () => {
  it("should render the glossary with navigation and terms", () => {
    const mockGlossary: GlossaryTerm[] = [
      { term: "Accord", slug: "accord", definition: "Définition" },
      { term: "Bénéfice", slug: "benefice", definition: "Définition" },
    ];

    const mockTermsByLetters = [
      { letter: "A", terms: [mockGlossary[0]] },
      { letter: "B", terms: [mockGlossary[1]] },
      { letter: "C", terms: [] },
    ];

    (getGlossaryLetters as jest.Mock).mockReturnValue(mockTermsByLetters);

    render(<GlossaryList glossary={mockGlossary} />);

    // Vérifier les titres et textes
    expect(screen.getByText("Glossaire")).toBeInTheDocument();
    expect(
      screen.getByText(
        /Les définitions de ce glossaire, disponibles en surbrillance/i
      )
    ).toBeInTheDocument();

    // Vérifier que la navigation est rendue avec les bonnes lettres
    expect(screen.getByTestId("glossary-navigation")).toHaveTextContent(
      "Navigation letters: A, B"
    );

    // Vérifier que les termes sont rendus
    expect(screen.getByTestId("glossary-terms")).toBeInTheDocument();
  });

  it("should handle empty glossary", () => {
    (getGlossaryLetters as jest.Mock).mockReturnValue([
      { letter: "A", terms: [] },
      { letter: "B", terms: [] },
    ]);

    render(<GlossaryList glossary={[]} />);

    // La navigation ne devrait afficher aucune lettre
    expect(screen.getByTestId("glossary-navigation")).toHaveTextContent(
      "Navigation letters:"
    );

    // Les termes devraient être rendus, mais sans contenu
    expect(screen.getByTestId("glossary-terms")).toHaveTextContent(
      "Showing terms for 0 letters"
    );
  });
});
