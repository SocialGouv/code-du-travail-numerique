import { fireEvent, render, screen } from "@testing-library/react";

import { HeaderSearch } from "../HeaderSearch"; // Assurez-vous que le chemin est correct
import { fetchSuggestResults } from "../fetchSuggestResults"; // Import pour le mock

jest.mock("../fetchSuggestResults");

describe("HeaderSearch Component - Accessibility Status Message in Autocomplete", () => {
  const mockOnSearchSubmit = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("affiche le message de statut accessible pour plusieurs résultats en français avec lang='fr'", async () => {
    (fetchSuggestResults as jest.Mock).mockResolvedValue([
      "Résultat 1",
      "Résultat 2",
      "Résultat 3",
    ]);

    render(<HeaderSearch onSearchSubmit={mockOnSearchSubmit} />);

    const input = screen.getByPlaceholderText("Recherchez sur le site");
    fireEvent.input(input, { target: { value: "test" } });

    const statusElement = await screen.findByRole("status");

    expect(statusElement).toBeInTheDocument();
    expect(statusElement).toHaveAttribute("lang", "fr");
    expect(statusElement).toHaveAttribute("aria-live", "polite");
    expect(statusElement).toHaveClass("fr-sr-only");
    console.log(">>> HIT before screen.debug");

    screen.debug();
    expect(statusElement).toHaveTextContent("3 résultats trouvés.");
  });

  it("affiche le message de statut accessible pour un seul résultat en français avec lang='fr'", async () => {
    (fetchSuggestResults as jest.Mock).mockResolvedValue(["Résultat unique"]);

    render(<HeaderSearch onSearchSubmit={mockOnSearchSubmit} />);

    const input = screen.getByPlaceholderText("Recherchez sur le site");
    fireEvent.input(input, { target: { value: "test" } });

    const statusElement = await screen.findByRole("status");
    expect(statusElement).toBeInTheDocument();
    expect(statusElement).toHaveAttribute("lang", "fr");
    expect(statusElement).toHaveTextContent("1 résultat trouvé.");
  });

  it("affiche le message de statut accessible pour aucun résultat en français avec lang='fr'", async () => {
    (fetchSuggestResults as jest.Mock).mockResolvedValue([]);

    render(<HeaderSearch onSearchSubmit={mockOnSearchSubmit} />);

    const input = screen.getByPlaceholderText("Recherchez sur le site");
    fireEvent.input(input, { target: { value: "test" } });

    const statusElement = await screen.findByRole("status");
    expect(statusElement).toBeInTheDocument();
    expect(statusElement).toHaveAttribute("lang", "fr");
    expect(statusElement).toHaveTextContent("Aucun résultat trouvé.");
  });

  it("n'affiche pas de message de statut si aucune saisie n'est effectuée", () => {
    render(<HeaderSearch onSearchSubmit={mockOnSearchSubmit} />);

    const statusElements = screen.queryAllByRole("status");
    expect(statusElements).toHaveLength(0);
  });
});
