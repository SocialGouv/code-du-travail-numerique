import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { SearchPageClient } from "../SearchPageClient";
import { useSearchParams } from "next/navigation";
import { getRouteBySource, SOURCES } from "@socialgouv/cdtn-utils";

// Mock des dépendances
jest.mock("next/navigation", () => ({
  useSearchParams: jest.fn(),
}));

jest.mock("@socialgouv/cdtn-utils", () => ({
  getRouteBySource: jest.fn((source) => `${source}-route`),
  SOURCES: {
    CDT: "code_du_travail",
    CONTRIBUTIONS: "contributions",
    EDITORIAL_CONTENT: "editorial_content",
  },
}));

describe("<SearchPageClient />", () => {
  const mockSearchParams = new URLSearchParams({ q: "test query" });

  beforeEach(() => {
    jest.clearAllMocks();
    (useSearchParams as jest.Mock).mockReturnValue(mockSearchParams);
  });

  it("should render with empty results", () => {
    render(
      <SearchPageClient
        query="test query"
        items={{ documents: [], themes: [], articles: [] }}
      />
    );

    expect(screen.getByText("Rechercher")).toBeInTheDocument();
    expect(
      screen.getByText('Résultats de recherche pour "test query"')
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Nous n'avons pas trouvé de résultat pour votre recherche."
      )
    ).toBeInTheDocument();
  });

  it("should render with documents results", () => {
    const mockItems = {
      documents: [
        {
          source: "contributions",
          slug: "doc1",
          title: "Document 1",
          description: "Description du document 1",
          breadcrumbs: [{ label: "Catégorie 1" }],
        },
        {
          source: "editorial_content",
          slug: "doc2",
          title: "Document 2",
          description: "Description du document 2",
          breadcrumbs: [{ label: "Catégorie 2" }],
        },
      ],
      themes: [],
      articles: [],
    };

    render(<SearchPageClient query="test query" items={mockItems} />);

    expect(screen.getByText("Document 1")).toBeInTheDocument();
    expect(screen.getByText("Document 2")).toBeInTheDocument();
    expect(screen.getByText("Catégorie 1")).toBeInTheDocument();
    expect(screen.getByText("Catégorie 2")).toBeInTheDocument();
  });

  it("should render with code articles", () => {
    const mockItems = {
      documents: [],
      themes: [],
      articles: [
        {
          source: "code_du_travail",
          slug: "L1234-5",
          title: "Article L1234-5",
          description: "Description de l'article L1234-5",
        },
      ],
    };

    render(<SearchPageClient query="test query" items={mockItems} />);

    expect(screen.getByText("Articles du code du travail")).toBeInTheDocument();
    expect(screen.getByText("L1234-5")).toBeInTheDocument();
  });

  it("should render with themes", () => {
    const mockItems = {
      documents: [],
      themes: [
        { slug: "theme1", title: "Thème 1" },
        { slug: "theme2", title: "Thème 2" },
      ],
      articles: [],
    };

    render(<SearchPageClient query="test query" items={mockItems} />);

    expect(
      screen.getByText("Les thèmes suivants peuvent vous intéresser")
    ).toBeInTheDocument();
    expect(screen.getByText("Thème 1")).toBeInTheDocument();
    expect(screen.getByText("Thème 2")).toBeInTheDocument();
  });

  it("should load more results when clicking on the button", () => {
    const mockItems = {
      documents: Array.from({ length: 10 }, (_, i) => ({
        source: "contributions",
        slug: `doc${i}`,
        title: `Document ${i}`,
        description: `Description du document ${i}`,
        breadcrumbs: [{ label: "Catégorie" }],
      })),
      themes: [],
      articles: [],
    };

    render(<SearchPageClient query="test query" items={mockItems} />);

    // Initialement, seulement 8 résultats sont affichés
    expect(screen.getAllByText(/Document \d/).length).toBe(8);

    // Cliquer sur le bouton "Plus de résultats"
    fireEvent.click(screen.getByText("Plus de résultats"));

    // Après le clic, tous les 10 résultats devraient être affichés
    expect(screen.getAllByText(/Document \d/).length).toBe(10);
  });

  it("should not show 'Plus de résultats' button when all results are displayed", () => {
    const mockItems = {
      documents: Array.from({ length: 5 }, (_, i) => ({
        source: "contributions",
        slug: `doc${i}`,
        title: `Document ${i}`,
        description: `Description du document ${i}`,
        breadcrumbs: [{ label: "Catégorie" }],
      })),
      themes: [],
      articles: [],
    };

    render(<SearchPageClient query="test query" items={mockItems} />);

    // Tous les 5 résultats sont affichés (moins que la limite de 8)
    expect(screen.getAllByText(/Document \d/).length).toBe(5);

    // Le bouton "Plus de résultats" ne devrait pas être présent
    expect(screen.queryByText("Plus de résultats")).not.toBeInTheDocument();
  });
});
