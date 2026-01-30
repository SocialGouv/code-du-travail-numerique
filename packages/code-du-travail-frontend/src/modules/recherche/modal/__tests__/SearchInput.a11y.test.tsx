import React from "react";
import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SearchInput } from "../SearchInput";
import { useSearchTracking } from "../../tracking";

jest.mock("../../tracking", () => ({
  useSearchTracking: jest.fn(),
}));

jest.mock("../../hooks/useSuggestions", () => ({
  useSuggestions: () => ({
    suggestions: [],
    fetchSuggestions: jest.fn().mockResolvedValue([]),
    clearSuggestions: jest.fn(),
  }),
}));

describe("SearchInput - Accessibility", () => {
  const emitClickSeeAllResultsEvent = jest.fn();
  const emitSuggestionSelectionEvent = jest.fn();
  const mockOnChangeQuery = jest.fn();
  const mockOnSearchTriggered = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
    (useSearchTracking as jest.Mock).mockReturnValue({
      emitClickSeeAllResultsEvent,
      emitSuggestionSelectionEvent,
    });
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  describe("Live region announcements", () => {
    it("should announce loading state when search is in progress", async () => {
      const user = userEvent.setup({ delay: null });

      render(
        <SearchInput
          onChangeQuery={mockOnChangeQuery}
          hasSearched={true}
          resultsCount={0}
          contextType="home"
          isLoadingResults={true}
          onSearchTriggered={mockOnSearchTriggered}
        />
      );

      const input = screen.getByRole("combobox");

      await act(async () => {
        await user.type(input, "test query");
      });

      await act(async () => {
        jest.advanceTimersByTime(200);
      });

      const liveRegion = screen.getByRole("status");
      expect(liveRegion.textContent).toMatch(
        /nous recherchons les bons résultats/i
      );
    });

    it("should announce no results message when search returns no results", async () => {
      const user = userEvent.setup({ delay: null });

      render(
        <SearchInput
          onChangeQuery={mockOnChangeQuery}
          hasSearched={true}
          resultsCount={0}
          contextType="home"
          isLoadingResults={false}
          onSearchTriggered={mockOnSearchTriggered}
        />
      );

      const input = screen.getByRole("combobox");

      await act(async () => {
        await user.type(input, "test query");
      });

      await act(async () => {
        jest.advanceTimersByTime(200);
      });

      const liveRegion = screen.getByRole("status");
      expect(liveRegion.textContent).toMatch(
        /précisez votre saisie, aucun résultat disponible/i
      );
    });

    it("should not announce anything when query is too short", async () => {
      const user = userEvent.setup({ delay: null });

      render(
        <SearchInput
          onChangeQuery={mockOnChangeQuery}
          hasSearched={false}
          resultsCount={0}
          contextType="home"
          isLoadingResults={false}
          onSearchTriggered={mockOnSearchTriggered}
        />
      );

      const input = screen.getByRole("combobox");

      await act(async () => {
        await user.type(input, "te");
      });

      await act(async () => {
        jest.advanceTimersByTime(200);
      });

      const liveRegion = screen.getByRole("status");
      // Should be empty or contain internal autocomplete message
      expect(liveRegion.textContent).not.toMatch(/nous recherchons/i);
      expect(liveRegion.textContent).not.toMatch(/aucun résultat disponible/i);
    });

    it("should clear announcement when results are found", async () => {
      const { rerender } = render(
        <SearchInput
          onChangeQuery={mockOnChangeQuery}
          hasSearched={true}
          resultsCount={0}
          contextType="home"
          isLoadingResults={true}
          onSearchTriggered={mockOnSearchTriggered}
          initialQuery="test query"
        />
      );

      await act(async () => {
        jest.advanceTimersByTime(200);
      });

      const liveRegion = screen.getByRole("status");
      expect(liveRegion.textContent).toMatch(
        /nous recherchons les bons résultats/i
      );

      // Results are now available
      rerender(
        <SearchInput
          onChangeQuery={mockOnChangeQuery}
          hasSearched={true}
          resultsCount={5}
          contextType="home"
          isLoadingResults={false}
          onSearchTriggered={mockOnSearchTriggered}
          initialQuery="test query"
        />
      );

      await act(async () => {
        jest.advanceTimersByTime(200);
      });

      // Should not show the loading or no results messages anymore
      expect(liveRegion.textContent).not.toMatch(/nous recherchons/i);
      expect(liveRegion.textContent).not.toMatch(/précisez votre saisie/i);
    });
  });

  describe("ARIA describedby connections", () => {
    it("should connect input to hint and no-result message elements", () => {
      render(
        <SearchInput
          onChangeQuery={mockOnChangeQuery}
          hasSearched={false}
          resultsCount={0}
          contextType="home"
          isLoadingResults={false}
          onSearchTriggered={mockOnSearchTriggered}
        />
      );

      const input = screen.getByRole("combobox");
      const describedby = input.getAttribute("aria-describedby");

      expect(describedby).toContain("search-home-feedback-min-search-hint");
      expect(describedby).toContain("search-home-no-result-message");
    });

    it("should have different IDs for modal context", () => {
      render(
        <SearchInput
          onChangeQuery={mockOnChangeQuery}
          hasSearched={false}
          resultsCount={0}
          contextType="modal"
          isLoadingResults={false}
          onSearchTriggered={mockOnSearchTriggered}
        />
      );

      const input = screen.getByRole("combobox");
      const describedby = input.getAttribute("aria-describedby");

      expect(describedby).toContain("search-modal-feedback-min-search-hint");
      expect(describedby).toContain("search-modal-no-result-message");
    });
  });

  describe("Label and heading structure", () => {
    it("should have visible label on homepage", () => {
      render(
        <SearchInput
          onChangeQuery={mockOnChangeQuery}
          hasSearched={false}
          resultsCount={0}
          contextType="home"
          isLoadingResults={false}
          onSearchTriggered={mockOnSearchTriggered}
        />
      );

      // The label should be visible (not sr-only)
      const label = screen.getByText("Que souhaitez-vous savoir ?");
      expect(label).toBeInTheDocument();
      expect(label).not.toHaveClass("fr-sr-only");
    });

    it("should have h1 heading in modal context", () => {
      render(
        <SearchInput
          onChangeQuery={mockOnChangeQuery}
          hasSearched={false}
          resultsCount={0}
          contextType="modal"
          isLoadingResults={false}
          onSearchTriggered={mockOnSearchTriggered}
        />
      );

      const heading = screen.getByRole("heading", {
        level: 1,
        name: "Que souhaitez-vous savoir ?",
      });
      expect(heading).toBeInTheDocument();
    });

    it("should have heading and input accessible in modal context", () => {
      render(
        <SearchInput
          onChangeQuery={mockOnChangeQuery}
          hasSearched={false}
          resultsCount={0}
          contextType="modal"
          isLoadingResults={false}
          onSearchTriggered={mockOnSearchTriggered}
        />
      );

      // The h1 should be visible
      const heading = screen.getByRole("heading", { level: 1 });
      expect(heading).toBeInTheDocument();

      // The input should be accessible by its role
      const input = screen.getByRole("combobox");
      expect(input).toBeInTheDocument();
    });
  });

  describe("Listbox accessibility", () => {
    it("should properly label the listbox", () => {
      render(
        <SearchInput
          onChangeQuery={mockOnChangeQuery}
          hasSearched={false}
          resultsCount={0}
          contextType="home"
          isLoadingResults={false}
          onSearchTriggered={mockOnSearchTriggered}
        />
      );

      const input = screen.getByRole("combobox");
      const listboxId = input.getAttribute("aria-controls");

      expect(listboxId).toBe("search-home-autocomplete-listbox");

      const listbox = screen.getByRole("listbox");
      expect(listbox).toHaveAttribute("id", listboxId);
      expect(listbox).toHaveAttribute("aria-labelledby", "search-home-label");
    });
  });

  describe("Focus management", () => {
    it("should allow external focus request via ref", async () => {
      const ref = React.createRef<any>();

      render(
        <SearchInput
          ref={ref}
          onChangeQuery={mockOnChangeQuery}
          hasSearched={false}
          resultsCount={0}
          contextType="home"
          isLoadingResults={false}
          onSearchTriggered={mockOnSearchTriggered}
        />
      );

      const input = screen.getByRole("combobox");
      expect(document.activeElement).not.toBe(input);

      ref.current?.focusInput();

      expect(document.activeElement).toBe(input);
    });

    it("should call onFocusRequest when search is triggered", async () => {
      const user = userEvent.setup({ delay: null });
      const mockOnFocusRequest = jest.fn();

      render(
        <SearchInput
          onChangeQuery={mockOnChangeQuery}
          hasSearched={false}
          resultsCount={0}
          contextType="home"
          isLoadingResults={false}
          onSearchTriggered={mockOnSearchTriggered}
          onFocusRequest={mockOnFocusRequest}
        />
      );

      const input = screen.getByRole("combobox");
      await user.type(input, "test query");
      await user.keyboard("{Enter}");

      expect(mockOnFocusRequest).toHaveBeenCalled();
    });
  });

  describe("Search form accessibility", () => {
    it("should have a search landmark role", () => {
      render(
        <SearchInput
          onChangeQuery={mockOnChangeQuery}
          hasSearched={false}
          resultsCount={0}
          contextType="home"
          isLoadingResults={false}
          onSearchTriggered={mockOnSearchTriggered}
        />
      );

      const searchForm = screen.getByRole("search");
      expect(searchForm).toBeInTheDocument();
    });

    it("should prevent form submission when query is too short", async () => {
      const user = userEvent.setup({ delay: null });

      render(
        <SearchInput
          onChangeQuery={mockOnChangeQuery}
          hasSearched={false}
          resultsCount={0}
          contextType="home"
          isLoadingResults={false}
          onSearchTriggered={mockOnSearchTriggered}
        />
      );

      const input = screen.getByRole("combobox");
      await user.type(input, "te");
      await user.keyboard("{Enter}");

      expect(mockOnSearchTriggered).not.toHaveBeenCalled();
    });

    it("should trigger search when query is valid", async () => {
      const user = userEvent.setup({ delay: null });

      render(
        <SearchInput
          onChangeQuery={mockOnChangeQuery}
          hasSearched={false}
          resultsCount={0}
          contextType="home"
          isLoadingResults={false}
          onSearchTriggered={mockOnSearchTriggered}
        />
      );

      const input = screen.getByRole("combobox");
      await user.type(input, "test query");
      await user.keyboard("{Enter}");

      expect(mockOnSearchTriggered).toHaveBeenCalledWith("test query");
    });
  });

  describe("Button accessibility", () => {
    it("should have accessible button for viewing all results", () => {
      render(
        <SearchInput
          onChangeQuery={mockOnChangeQuery}
          hasSearched={false}
          resultsCount={0}
          contextType="home"
          isLoadingResults={false}
          onSearchTriggered={mockOnSearchTriggered}
        />
      );

      const button = screen.getByRole("button", {
        name: /voir tous les résultats/i,
      });
      expect(button).toBeInTheDocument();
      expect(button).toHaveAttribute("type", "button");
    });
  });
});
