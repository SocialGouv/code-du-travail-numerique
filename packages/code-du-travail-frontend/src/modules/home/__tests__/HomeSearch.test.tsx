import { HomeSearch } from "../Components";
import { fireEvent, render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { fetchSuggestResults } from "../../layout/header/fetchSuggestResults";
import { useSearchTracking } from "../../recherche/tracking";

jest.mock("../../layout/header/fetchSuggestResults");
jest.mock("../../recherche/tracking");

// Mock router with a proper spy function
const mockRouterPush = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockRouterPush,
  }),
}));

describe("<HomeSearch />", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should show suggestions and send event tracking", async () => {
    const suggestions = [
      "congés payés et fractionnement",
      "congés sans solde",
      "congés payés acquisition",
      "congés payés",
      "congés payés et maladie",
    ];
    (fetchSuggestResults as jest.Mock).mockImplementation((data: string) => {
      if (data === "congés") {
        return Promise.resolve(suggestions);
      }
      return Promise.resolve([]);
    });

    const emitSearchEventMock = jest.fn();
    const emitSuggestionSelectionEventMock = jest.fn();
    (useSearchTracking as jest.Mock).mockReturnValue({
      emitSearchEvent: emitSearchEventMock,
      emitSuggestionSelectionEvent: emitSuggestionSelectionEventMock,
    });

    const { getByText, getByTestId } = render(<HomeSearch />);
    const searchInput = getByTestId("search-input");
    await userEvent.click(searchInput);
    await userEvent.type(searchInput, "congés");

    await waitFor(() => {
      expect(getByText("congés payés et fractionnement")).toBeInTheDocument();
    });
    expect(mockRouterPush).not.toHaveBeenCalled();

    const congesSansSolde = getByText("congés sans solde");
    expect(getByText("congés sans solde")).toBeInTheDocument();
    expect(getByText("congés payés acquisition")).toBeInTheDocument();
    expect(getByText("congés payés")).toBeInTheDocument();
    expect(getByText("congés payés et maladie")).toBeInTheDocument();

    fireEvent.click(congesSansSolde);
    expect(mockRouterPush).toHaveBeenCalledWith(
      "/recherche?q=cong%C3%A9s%20sans%20solde"
    );
    expect(emitSuggestionSelectionEventMock).toHaveBeenCalledWith(
      "congés",
      "congés sans solde",
      suggestions
    );
  });

  it("should emit search event when form is submitted", async () => {
    const emitSearchEventMock = jest.fn();
    (useSearchTracking as jest.Mock).mockReturnValue({
      emitSearchEvent: emitSearchEventMock,
      emitSuggestionSelectionEvent: jest.fn(),
    });

    const { getByTestId, getByRole } = render(<HomeSearch />);
    const searchInput = getByTestId("search-input");
    const searchTerm = "licenciement";

    // Saisir le terme de recherche
    await userEvent.click(searchInput);
    await userEvent.type(searchInput, searchTerm);

    // Soumettre le formulaire
    const form = searchInput.closest("form");
    expect(form).not.toBeNull();
    fireEvent.click(getByRole("button", { name: "Lancer la recherche" }));

    // Vérifier que emitSearchEvent est appelé avec le bon terme
    expect(emitSearchEventMock).toHaveBeenCalledWith(searchTerm);

    // Vérifier que la navigation est effectuée vers la bonne URL
    expect(mockRouterPush).toHaveBeenCalledWith(
      `/recherche?q=${encodeURIComponent(searchTerm)}`
    );
  });
});
