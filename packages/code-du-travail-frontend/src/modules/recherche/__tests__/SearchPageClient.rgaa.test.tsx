import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SearchPageClient } from "../SearchPageClient";

jest.mock("next/navigation", () => ({
  useSearchParams: () => new URLSearchParams("query=test"),
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

jest.mock("../tracking", () => ({
  useSearchTracking: () => ({
    emitSearchEvent: jest.fn(),
    emitResultSelectionEvent: jest.fn(),
    emitNextPageEvent: jest.fn(),
  }),
}));

jest.mock("../utils", () => ({
  generateSearchLink: jest.fn(
    (source, slug, query, url) => `/link?source=source&slug=${slug}`
  ),
}));

jest.mock("../../layout/header/fetchSuggestResults", () => ({
  fetchSuggestResults: jest.fn(() => Promise.resolve([])),
}));

const mockItems = {
  documents: Array.from({ length: 10 }, (_, index) => ({
    cdtnId: `doc${index + 1}`,
    title: `Result ${index + 1}`,
    description: `Desc ${index + 1}`,
    source: "source",
    slug: `slug${index + 1}`,
    breadcrumbs: [],
    url: "",
    algo: "",
  })),
  themes: [],
  articles: [],
};

describe("SearchPageClient - Tests d'accessibilité et tabulation", () => {
  it("Vérifie l'ordre de tabulation logique dans le DOM rendu", async () => {
    render(<SearchPageClient query="test" items={mockItems} />);

    const tabbableElements = screen
      .getByRole("search")
      .querySelectorAll('input, button, a, [tabindex]:not([tabindex="-1"])');

    expect(tabbableElements[0]).toHaveAttribute(
      "placeholder",
      "Recherchez sur le site"
    );
    expect(tabbableElements[1]).toHaveTextContent("Rechercher");

    const searchInput = screen.getByPlaceholderText("Recherchez sur le site");
    await userEvent.type(searchInput, "test");

    fireEvent.blur(searchInput);
    expect(searchInput).toHaveValue("test");

    const nextButton = screen.getByTitle("Rechercher");
    nextButton.focus();
    expect(document.activeElement).toBe(nextButton);
  });

  it("Vérifie la cohérence tab après chargement plus de résultats", async () => {
    const { container } = render(
      <SearchPageClient query="test" items={mockItems} />
    );

    const loadMoreButton = screen.getByText("Plus de résultats");
    await userEvent.click(loadMoreButton);

    await waitFor(
      () => {
        const newResult = container.querySelector("#search-result-doc9");
        expect(newResult).toHaveFocus();
      },
      { timeout: 200 }
    );
  });
});
