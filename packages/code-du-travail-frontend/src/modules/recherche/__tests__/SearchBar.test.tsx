import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { SearchBar } from "../SearchBar";
import { useSearchTracking } from "../tracking";
import { fetchSuggestResults } from "../../layout/header/fetchSuggestResults";
import * as Sentry from "@sentry/nextjs";

// Mock the useRouter hook
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

// Mock the useSearchTracking hook
jest.mock("../tracking", () => ({
  useSearchTracking: jest.fn(),
}));

// Mock the fetchSuggestResults function
jest.mock("../../layout/header/fetchSuggestResults", () => ({
  fetchSuggestResults: jest.fn(),
}));

// Mock the Autocomplete component
jest.mock("../../common/Autocomplete", () => ({
  Autocomplete: ({ onInputValueChange, onChange, search, dataTestId }) => {
    // Simulate the search function to get suggestions
    const handleSearch = async () => {
      const suggestions = await search("test");
      return suggestions;
    };

    return (
      <div>
        <input
          data-testid={dataTestId}
          onChange={(e) => onInputValueChange(e.target.value)}
          placeholder="Search"
        />
        <button
          data-testid="submit-search"
          onClick={() => onChange("test query", ["suggestion1", "suggestion2"])}
        >
          Submit
        </button>
        <button data-testid="get-suggestions" onClick={handleSearch}>
          Get Suggestions
        </button>
      </div>
    );
  },
}));

// Mock Sentry
jest.mock("@sentry/nextjs", () => ({
  captureMessage: jest.fn(),
}));

describe("SearchBar", () => {
  // Mock the tracking functions
  const mockEmitSearchEvent = jest.fn();
  const mockEmitSuggestionSelectionEvent = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    // Setup the mock implementation for useSearchTracking
    (useSearchTracking as jest.Mock).mockReturnValue({
      emitSearchEvent: mockEmitSearchEvent,
      emitSuggestionSelectionEvent: mockEmitSuggestionSelectionEvent,
    });

    // Setup the mock implementation for fetchSuggestResults
    (fetchSuggestResults as jest.Mock).mockResolvedValue([
      "suggestion1",
      "suggestion2",
      "suggestion3",
    ]);
  });

  it("should emit search event when form is submitted", async () => {
    render(<SearchBar />);

    // Find the input and type a search query
    const input = screen.getByTestId("search-bar-input");
    fireEvent.change(input, { target: { value: "test query" } });

    // Submit the form
    const form = screen.getByRole("search");
    fireEvent.submit(form);

    // Check that emitSearchEvent was called with the query
    await waitFor(() => {
      expect(mockEmitSearchEvent).toHaveBeenCalledWith("test query");
    });
  });

  it("should emit suggestion selection event when a suggestion is selected", async () => {
    render(<SearchBar />);

    // Find the input and type a search query
    const input = screen.getByTestId("search-bar-input");
    fireEvent.change(input, { target: { value: "test" } });

    // Click the button to simulate selecting a suggestion
    const submitButton = screen.getByTestId("submit-search");
    fireEvent.click(submitButton);

    // Check that emitSuggestionSelectionEvent was called with the correct parameters
    await waitFor(() => {
      expect(mockEmitSuggestionSelectionEvent).toHaveBeenCalledWith(
        "test",
        "test query",
        ["suggestion1", "suggestion2"]
      );
    });

    // Check that emitSearchEvent was also called for the selected suggestion
    expect(mockEmitSearchEvent).toHaveBeenCalledWith("test query");
  });

  it("should handle errors when fetching suggestions", async () => {
    // Mock the fetchSuggestResults to throw an error
    (fetchSuggestResults as jest.Mock).mockRejectedValue(
      new Error("API error")
    );

    render(<SearchBar />);

    // Click the button to simulate getting suggestions
    const getSuggestionsButton = screen.getByTestId("get-suggestions");
    fireEvent.click(getSuggestionsButton);

    // Check that Sentry.captureMessage was called with the error
    await waitFor(() => {
      expect(Sentry.captureMessage).toHaveBeenCalledWith(
        expect.stringContaining("Échec lors de la récupération des suggestions")
      );
    });
  });

  it("should initialize with the provided initial value", () => {
    render(<SearchBar initialValue="initial query" />);

    // Submit the form without changing the input
    const form = screen.getByRole("search");
    fireEvent.submit(form);

    // Check that emitSearchEvent was called with the initial value
    expect(mockEmitSearchEvent).toHaveBeenCalledWith("initial query");
  });
});
