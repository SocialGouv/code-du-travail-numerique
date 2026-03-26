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

// Mock matomo (used by Feedback component)
jest.mock("@socialgouv/matomo-next", () => ({
  sendEvent: jest.fn(),
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
    topDocuments: [
      {
        cdtnId: "top-doc-1",
        source: SOURCES.SHEET_MT,
        slug: "top-document-1",
        title: "Top Document 1",
        description: "Top Description 1",
        algo: SEARCH_ALGO.FULL_TEXT,
        breadcrumbs: [{ label: "Fiches pratiques", position: 1, slug: "1" }],
      },
      {
        cdtnId: "top-doc-2",
        source: SOURCES.SHEET_SP,
        slug: "top-document-2",
        title: "Top Document 2",
        description: "Top Description 2",
        algo: SEARCH_ALGO.FULL_TEXT,
        breadcrumbs: [
          { label: "Fiches service public", position: 1, slug: "1" },
        ],
      },
    ],
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
    size: 4,
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
      mockItems.documents[0].algo,
      undefined
    );
  });
});
