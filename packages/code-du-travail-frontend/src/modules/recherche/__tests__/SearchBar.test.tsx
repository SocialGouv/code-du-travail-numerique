import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { SearchBar } from "../SearchBar";
import { useRouter } from "next/navigation";
import { fetchSuggestResults } from "../../layout/header/fetchSuggestResults";
import { SUGGEST_MAX_RESULTS } from "../../../config";

// Mock des dépendances
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("../../layout/header/fetchSuggestResults");

describe("<SearchBar />", () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({
      replace: mockPush,
    });
  });

  it("should render with initial value", () => {
    render(<SearchBar initialValue="test query" />);

    const input = screen.getByRole("combobox");
    expect(input).toHaveValue("test query");
  });

  it("should navigate to search page on form submission", () => {
    render(<SearchBar initialValue="" />);

    const input = screen.getByRole("combobox");
    fireEvent.change(input, { target: { value: "new query" } });

    const form = screen.getByRole("search");
    fireEvent.submit(form);

    expect(mockPush).toHaveBeenCalledWith("/recherche?q=new%20query");
  });

  it("should not navigate if query is empty", () => {
    render(<SearchBar initialValue="" />);

    const form = screen.getByRole("search");
    fireEvent.submit(form);

    expect(mockPush).not.toHaveBeenCalled();
  });

  it("should show suggestions when typing", async () => {
    const suggestions = ["suggestion 1", "suggestion 2", "suggestion 3"];

    (fetchSuggestResults as jest.Mock).mockResolvedValue(suggestions);

    render(<SearchBar initialValue="" />);

    const input = screen.getByRole("combobox");
    fireEvent.change(input, { target: { value: "test" } });

    await waitFor(() => {
      expect(fetchSuggestResults).toHaveBeenCalledWith("test");
    });

    for (const suggestion of suggestions) {
      expect(screen.getByText(suggestion)).toBeInTheDocument();
    }
  });

  it("should navigate when selecting a suggestion", async () => {
    const suggestions = ["suggestion 1", "suggestion 2", "suggestion 3"];

    (fetchSuggestResults as jest.Mock).mockResolvedValue(suggestions);

    render(<SearchBar initialValue="" />);

    const input = screen.getByRole("combobox");
    fireEvent.change(input, { target: { value: "test" } });

    await waitFor(() => {
      expect(screen.getByText("suggestion 2")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText("suggestion 2"));

    expect(mockPush).toHaveBeenCalledWith("/recherche?q=suggestion%202");
  });

  it("should limit suggestions to SUGGEST_MAX_RESULTS", async () => {
    const manyResults = Array.from(
      { length: SUGGEST_MAX_RESULTS + 5 },
      (_, i) => `suggestion ${i}`
    );

    (fetchSuggestResults as jest.Mock).mockResolvedValue(manyResults);

    render(<SearchBar initialValue="" />);

    const input = screen.getByRole("combobox");
    fireEvent.change(input, { target: { value: "test" } });

    await waitFor(() => {
      expect(fetchSuggestResults).toHaveBeenCalledWith("test");
    });

    // Vérifier que seuls les premiers SUGGEST_MAX_RESULTS résultats sont affichés
    for (let i = 0; i < SUGGEST_MAX_RESULTS; i++) {
      expect(screen.getByText(`suggestion ${i}`)).toBeInTheDocument();
    }

    // Vérifier que les résultats supplémentaires ne sont pas affichés
    expect(
      screen.queryByText(`suggestion ${SUGGEST_MAX_RESULTS}`)
    ).not.toBeInTheDocument();
  });

  it("should handle error in fetchSuggestResults", async () => {
    (fetchSuggestResults as jest.Mock).mockRejectedValue(
      new Error("API error")
    );

    render(<SearchBar initialValue="" />);

    const input = screen.getByRole("combobox");
    fireEvent.change(input, { target: { value: "test" } });

    await waitFor(() => {
      expect(fetchSuggestResults).toHaveBeenCalledWith("test");
    });

    // Aucune suggestion ne devrait être affichée
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });
});
