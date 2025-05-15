import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { SearchPageClient } from "../SearchPageClient";
import { useSearchParams } from "next/navigation";
import { getRouteBySource, SOURCES } from "@socialgouv/cdtn-utils";

// Mock des dépendances
jest.mock("next/navigation", () => ({
  useSearchParams: jest.fn(),
  useRouter: jest.fn().mockReturnValue({
    replace: jest.fn(),
  }),
}));

jest.mock("@socialgouv/cdtn-utils", () => ({
  getRouteBySource: jest.fn((source) => `${source}-route`),
  SOURCES: {
    CDT: "code_du_travail",
    CONTRIBUTIONS: "contributions",
    EDITORIAL_CONTENT: "editorial_content",
  },
}));

// Mock le composant SearchBar
jest.mock("../SearchBar", () => ({
  SearchBar: jest.fn(({ initialValue }) => (
    <div data-testid="search-bar">
      <span>Rechercher</span>
      <input type="text" defaultValue={initialValue} />
    </div>
  )),
}));

// Mock le composant SearchCard
jest.mock("../Card", () => ({
  SearchCard: jest.fn(({ title, description, category, link }) => (
    <div data-testid="search-card">
      <h3>{title}</h3>
      <p>{description}</p>
      {category && <span>{category}</span>}
      <a href={link} data-testid="search-card-link">
        Voir plus
      </a>
    </div>
  )),
}));

// Mock le composant Button de @codegouvfr/react-dsfr
jest.mock("@codegouvfr/react-dsfr/Button", () => ({
  Button: jest.fn(({ children, onClick, priority, linkProps }) => (
    <button
      onClick={onClick}
      className={`fr-btn ${priority ? `fr-btn--${priority}` : ""}`}
      data-testid="theme-button"
      data-href={linkProps?.href}
    >
      {children}
    </button>
  )),
}));

describe("<SearchPageClient />", () => {
  const mockSearchParams = new URLSearchParams({ q: "test query" });

  beforeEach(() => {
    jest.clearAllMocks();
    (useSearchParams as jest.Mock).mockReturnValue(mockSearchParams);
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
    const loadMoreButton = screen.getByRole("button", {
      name: "Plus de résultats",
    });
    fireEvent.click(loadMoreButton);

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
    expect(
      screen.queryByRole("button", { name: "Plus de résultats" })
    ).not.toBeInTheDocument();
  });

  it("should include query parameter in result links", () => {
    const mockItems = {
      documents: [
        {
          source: "contributions",
          slug: "doc1",
          title: "Document 1",
          description: "Description du document 1",
          breadcrumbs: [{ label: "Catégorie 1" }],
        },
      ],
      themes: [{ slug: "theme1", title: "Thème 1" }],
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

    // Vérifier que les liens des résultats généraux incluent le paramètre q=
    const documentLinks = screen.getAllByTestId("search-card-link");
    expect(documentLinks[0]).toHaveAttribute(
      "href",
      "/contributions-route/doc1?q=test%20query"
    );

    // Vérifier que les liens des articles du code du travail incluent le paramètre q=
    const articleCardLinks = screen.getAllByTestId("search-card-link");
    const articleLink = articleCardLinks.find((link) =>
      link
        .closest("[data-testid='search-card']")
        ?.textContent?.includes("L1234-5")
    );
    expect(articleLink).toHaveAttribute(
      "href",
      "/code-du-travail/L1234-5?q=test%20query"
    );

    // Vérifier que les liens des thèmes incluent le paramètre q=
    const themeButtons = screen.getAllByTestId("theme-button");
    expect(themeButtons[0]).toHaveAttribute(
      "data-href",
      "/themes/theme1?q=test%20query"
    );
  });
  it("should use direct URL for external sources", () => {
    const mockItems = {
      documents: [
        {
          source: "external",
          slug: "external-doc",
          title: "External Document",
          description: "Description of external document",
          url: "https://external-site.com/page",
          breadcrumbs: [{ label: "External Category" }],
        },
        {
          source: "contributions",
          slug: "internal-doc",
          title: "Internal Document",
          description: "Description of internal document",
          breadcrumbs: [{ label: "Internal Category" }],
        },
      ],
      themes: [],
      articles: [],
    };

    render(<SearchPageClient query="test query" items={mockItems} />);

    // Verify that external link uses the direct URL
    const documentLinks = screen.getAllByTestId("search-card-link");
    const externalLink = documentLinks.find((link) =>
      link
        .closest("[data-testid='search-card']")
        ?.textContent?.includes("External Document")
    );
    expect(externalLink).toHaveAttribute(
      "href",
      "https://external-site.com/page"
    );

    // Verify that internal link still uses the constructed path
    const internalLink = documentLinks.find((link) =>
      link
        .closest("[data-testid='search-card']")
        ?.textContent?.includes("Internal Document")
    );
    expect(internalLink).toHaveAttribute(
      "href",
      "/contributions-route/internal-doc?q=test%20query"
    );
  });
});
