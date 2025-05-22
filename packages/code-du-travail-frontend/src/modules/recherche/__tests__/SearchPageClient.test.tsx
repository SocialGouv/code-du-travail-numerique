import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { SearchPageClient } from "../SearchPageClient";
import { useSearchTracking } from "../tracking";
import { SOURCES } from "@socialgouv/cdtn-utils";

// Mock the useSearchParams hook
jest.mock("next/navigation", () => ({
  useSearchParams: () => ({
    get: jest.fn((param) => (param === "q" ? "test query" : null)),
  }),
}));

// Mock the useSearchTracking hook
jest.mock("../tracking", () => ({
  useSearchTracking: jest.fn(),
}));

// Mock the ContainerWithBreadcrumbs component
jest.mock("../../layout/ContainerWithBreadcrumbs", () => ({
  ContainerWithBreadcrumbs: ({ children }) => <div>{children}</div>,
}));

// Mock the SearchBar component
jest.mock("../SearchBar", () => ({
  SearchBar: ({ initialValue }) => (
    <div data-testid="search-bar">Search Bar: {initialValue}</div>
  ),
}));

// Mock the SearchCard component
jest.mock("../Card", () => ({
  SearchCard: ({ title, onClick }) => (
    <div data-testid="search-card" onClick={onClick}>
      {title}
    </div>
  ),
}));

// Mock the fr object from @codegouvfr/react-dsfr
jest.mock("@codegouvfr/react-dsfr", () => ({
  fr: {
    cx: (...args) => args.join(" "),
  },
}));

// Mock the Button component
jest.mock("@codegouvfr/react-dsfr/Button", () => ({
  Button: ({ children, onClick, linkProps }) => (
    <button
      data-testid="button"
      onClick={onClick || (linkProps && linkProps.onClick)}
    >
      {children}
    </button>
  ),
}));

describe("SearchPageClient", () => {
  // Mock the tracking functions
  const mockEmitSearchEvent = jest.fn();
  const mockEmitResultSelectionEvent = jest.fn();
  const mockEmitNextPageEvent = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    // Setup the mock implementation for useSearchTracking
    (useSearchTracking as jest.Mock).mockReturnValue({
      emitSearchEvent: mockEmitSearchEvent,
      emitResultSelectionEvent: mockEmitResultSelectionEvent,
      emitNextPageEvent: mockEmitNextPageEvent,
    });
  });

  const mockItems = {
    documents: [
      {
        source: SOURCES.SHEET_MT,
        slug: "document-1",
        title: "Document 1",
        description: "Description 1",
        algo: "fulltext",
      },
      {
        source: SOURCES.SHEET_SP,
        slug: "document-2",
        title: "Document 2",
        description: "Description 2",
        algo: "fulltext",
      },
    ],
    themes: [
      {
        source: SOURCES.THEMES,
        slug: "theme-1",
        title: "Theme 1",
        algo: "fulltext",
      },
    ],
    articles: [
      {
        source: SOURCES.CDT,
        slug: "article-1",
        title: "Article 1",
        description: "Description 1",
        algo: "fulltext",
      },
    ],
  };

  it("should emit search event when mounted with a query", () => {
    render(<SearchPageClient query="test query" items={mockItems} />);

    // Check that emitSearchEvent was called with the query
    expect(mockEmitSearchEvent).toHaveBeenCalledWith("test query");
  });

  it("should emit result selection event when a search result is clicked", () => {
    render(<SearchPageClient query="test query" items={mockItems} />);

    // Find and click the first search card
    const searchCards = screen.getAllByTestId("search-card");
    fireEvent.click(searchCards[0]);

    // Check that emitResultSelectionEvent was called with the correct parameters
    expect(mockEmitResultSelectionEvent).toHaveBeenCalledWith(
      mockItems.documents[0].source,
      mockItems.documents[0].slug,
      undefined,
      mockItems.documents[0].algo
    );
  });

  it("should emit next page event when 'Plus de résultats' button is clicked", () => {
    // Create more documents to trigger the "Plus de résultats" button
    const manyDocuments = Array(10)
      .fill(null)
      .map((_, index) => ({
        source: SOURCES.SHEET_MT,
        slug: `document-${index}`,
        title: `Document ${index}`,
        description: `Description ${index}`,
        algo: "fulltext",
      }));

    const itemsWithManyDocuments = {
      ...mockItems,
      documents: manyDocuments,
    };

    render(
      <SearchPageClient query="test query" items={itemsWithManyDocuments} />
    );

    // Find and click the "Plus de résultats" button
    const loadMoreButton = screen.getByText("Plus de résultats");
    fireEvent.click(loadMoreButton);

    // Check that emitNextPageEvent was called with the query
    expect(mockEmitNextPageEvent).toHaveBeenCalledWith("test query");
  });

  it("should emit result selection event when a theme button is clicked", () => {
    render(<SearchPageClient query="test query" items={mockItems} />);

    // Find and click the theme button
    const themeButton = screen.getByText("Theme 1");
    fireEvent.click(themeButton);

    // Check that emitResultSelectionEvent was called with the correct parameters
    expect(mockEmitResultSelectionEvent).toHaveBeenCalledWith(
      mockItems.themes[0].source,
      mockItems.themes[0].slug,
      undefined,
      mockItems.themes[0].algo
    );
  });

  it("should emit result selection event when a code article is clicked", () => {
    render(<SearchPageClient query="test query" items={mockItems} />);

    // Find and click the code article
    const codeArticles = screen.getAllByTestId("search-card");
    // The code article should be the last search card (after the documents)
    const codeArticle = codeArticles[codeArticles.length - 1];
    fireEvent.click(codeArticle);

    // Check that emitResultSelectionEvent was called with the correct parameters
    expect(mockEmitResultSelectionEvent).toHaveBeenCalledWith(
      mockItems.articles[0].source,
      mockItems.articles[0].slug,
      undefined,
      mockItems.articles[0].algo
    );
  });
});
