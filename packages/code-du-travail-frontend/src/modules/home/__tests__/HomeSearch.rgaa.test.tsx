import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { HomeSearch } from "../Components/HomeSearch";
import { fetchSuggestResults } from "../../layout/header/fetchSuggestResults"; // Import pour le mock

jest.mock("../../layout/header/fetchSuggestResults");

jest.mock("next/navigation", () => ({
  useRouter: jest.fn().mockReturnValue({
    push: jest.fn(),
  }),
}));

jest.mock("../../recherche/tracking", () => ({
  useSearchTracking: jest.fn().mockReturnValue({
    emitSearchEvent: jest.fn(),
    emitSuggestionSelectionEvent: jest.fn(),
  }),
}));

describe("HomeSearch Component - Accessibility Status Message in Autocomplete", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("affiche le message de statut accessible pour plusieurs résultats en français avec lang='fr'", async () => {
    (fetchSuggestResults as jest.Mock).mockResolvedValue([
      "Résultat 1",
      "Résultat 2",
      "Résultat 3",
    ]);

    render(<HomeSearch />, {
      legacyRoot: true,
    });

    const input = screen.getByRole("combobox");
    await userEvent.type(input, "test");

    await waitFor(() => {
      const statusElement = screen.getByRole("status");
      expect(statusElement).toBeInTheDocument();
      expect(statusElement).toHaveAttribute("lang", "fr");
      expect(statusElement).toHaveAttribute("aria-live", "polite");
      expect(statusElement).toHaveClass("fr-sr-only");
      expect(statusElement).toHaveTextContent("3 résultats trouvés.");
    });
  });

  it("affiche le message de statut accessible pour un seul résultat en français avec lang='fr'", async () => {
    (fetchSuggestResults as jest.Mock).mockResolvedValue(["Résultat unique"]);

    render(<HomeSearch />, {
      legacyRoot: true,
    });

    const input = screen.getByRole("combobox");
    await userEvent.type(input, "test");

    await waitFor(() => {
      const statusElement = screen.getByRole("status");
      expect(statusElement).toBeInTheDocument();
      expect(statusElement).toHaveAttribute("lang", "fr");
      expect(statusElement).toHaveTextContent("1 résultat trouvé.");
    });
  });

  it("affiche le message de statut accessible pour aucun résultat en français avec lang='fr'", async () => {
    (fetchSuggestResults as jest.Mock).mockResolvedValue([]);

    render(<HomeSearch />, {
      legacyRoot: true,
    });

    const input = screen.getByRole("combobox");
    await userEvent.type(input, "test");

    await waitFor(() => {
      const statusElement = screen.getByRole("status");
      expect(statusElement).toBeInTheDocument();
      expect(statusElement).toHaveAttribute("lang", "fr");
      expect(statusElement).toHaveTextContent("Aucun résultat trouvé.");
    });
  });

  it("n'affiche pas de message de statut si aucune saisie n'est effectuée", () => {
    render(<HomeSearch />, {
      legacyRoot: true,
    });

    const statusElements = screen.queryAllByRole("status");
    expect(statusElements).toHaveLength(0); // Pas de statut initial
  });
});
