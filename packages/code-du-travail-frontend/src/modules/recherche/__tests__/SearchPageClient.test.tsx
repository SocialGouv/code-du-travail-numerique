import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { SearchPageClient } from "../SearchPageClient";
import { useSearchTracking } from "../tracking";
import { SOURCES } from "@socialgouv/cdtn-utils";
import { SEARCH_ALGO } from "src/api/modules/search/service/types";

// Mock the Next.js navigation hooks
jest.mock("next/navigation", () => ({
  useSearchParams: () => ({
    get: jest.fn((param) => (param === "query" ? "test query" : null)),
  }),
  usePathname: () => "/recherche",
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
    refresh: jest.fn(),
  }),
}));

// Mock the useSearchTracking hook
jest.mock("../tracking", () => ({
  useSearchTracking: jest.fn(),
}));

describe("SearchPageClient", () => {
  // Mock the tracking functions
  const mockEmitFullsearchEventOnce = jest.fn();
  const mockEmitResultSelectionEvent = jest.fn();
  const mockEmitNextPageEvent = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    // Setup the mock implementation for useSearchTracking
    (useSearchTracking as jest.Mock).mockReturnValue({
      emitFullsearchEventOnce: mockEmitFullsearchEventOnce,
      emitResultSelectionEvent: mockEmitResultSelectionEvent,
      emitNextPageEvent: mockEmitNextPageEvent,
    });
  });

  const mockItems = {
    documents: [
      {
        cdtnId: "doc-1",
        source: SOURCES.SHEET_MT,
        slug: "document-1",
        title: "Document 1",
        description: "Description 1",
        algo: SEARCH_ALGO.FULL_TEXT,
        breadcrumbs: [{ label: "Fiches pratiques", position: 1, slug: "1" }],
      },
      {
        cdtnId: "doc-2",
        source: SOURCES.SHEET_SP,
        slug: "document-2",
        title: "Document 2",
        description: "Description 2",
        algo: SEARCH_ALGO.FULL_TEXT,
        breadcrumbs: [
          { label: "Fiches service public", position: 1, slug: "1" },
        ],
      },
    ],
    themes: [
      {
        description: "123",
        cdtnId: "th1",
        source: SOURCES.THEMES,
        slug: "theme-1",
        title: "Theme 1",
        algo: SEARCH_ALGO.FULL_TEXT,
      },
    ],
    articles: [
      {
        cdtnId: "art1",
        source: SOURCES.CDT,
        slug: "article-1",
        title: "Article 1",
        description: "Description 1",
        algo: SEARCH_ALGO.FULL_TEXT,
      },
    ],
    class: "keyword",
  };

  it("should emit fullsearch event when mounted with a query and a class", () => {
    render(<SearchPageClient query="test query" items={mockItems} />);

    // Check that emitFullsearchEventOnce was called with query and class
    expect(mockEmitFullsearchEventOnce).toHaveBeenCalledWith(
      "test query",
      mockItems.class
    );
  });

  it("should emit result selection event when a search result is clicked", () => {
    render(<SearchPageClient query="test query" items={mockItems} />);

    // Find and click the first search card link
    const firstCard = screen.getByRole("link", { name: "Document 1" });
    fireEvent.click(firstCard);

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
        cdtnId: `doc-${index}`,
        source: SOURCES.SHEET_MT,
        slug: `document-${index}`,
        title: `Document ${index}`,
        description: `Description ${index}`,
        algo: SEARCH_ALGO.FULL_TEXT,
        breadcrumbs: [{ label: "Fiches pratiques", position: 1, slug: "1" }],
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

    // Find and click the theme link (styled as a button)
    const themeButton = screen.getByRole("link", { name: "Theme 1" });
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

    // Find and click the code article link
    const codeArticle = screen.getByRole("link", { name: "article-1" });
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
