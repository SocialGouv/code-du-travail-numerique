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

// Mock du composant Autocomplete
jest.mock("../../common/Autocomplete", () => {
  const originalModule = jest.requireActual("react");

  return {
    Autocomplete: jest.fn(
      ({
        label,
        placeholder,
        search,
        onChange,
        onInputValueChange,
        onSubmitSearch,
        displayLabel,
      }) => {
        const [inputValue, setInputValue] = React.useState("");
        const [suggestions, setSuggestions] = React.useState([]);
        const [loading, setLoading] = React.useState(false);

        const handleInputChange = async (value) => {
          setInputValue(value);
          onInputValueChange?.(value);

          if (value) {
            setLoading(true);
            try {
              const results = await search(value);
              setSuggestions(results);
            } catch (error) {
              setSuggestions([]);
            } finally {
              setLoading(false);
            }
          } else {
            setSuggestions([]);
          }
        };

        return (
          <div data-testid="autocomplete-component">
            <label htmlFor="search-input">{label}</label>
            <input
              id="search-input"
              role="combobox"
              aria-expanded={suggestions.length > 0}
              value={inputValue}
              placeholder={placeholder}
              onChange={(e) => handleInputChange(e.target.value)}
              data-testid="search-input"
            />
            <button
              type="submit"
              onClick={onSubmitSearch}
              data-testid="search-submit"
            >
              Rechercher
            </button>
            {suggestions.length > 0 && (
              <ul role="listbox">
                {suggestions.map((item, index) => (
                  <li
                    key={index}
                    role="option"
                    onClick={() => {
                      onChange(item);
                      setSuggestions([]);
                    }}
                  >
                    {displayLabel(item)}
                  </li>
                ))}
              </ul>
            )}
            {loading && (
              <div data-testid="loading-indicator">Chargement...</div>
            )}
          </div>
        );
      }
    ),
  };
});

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

    // Vérifier que le composant Autocomplete est rendu
    expect(screen.getByTestId("autocomplete-component")).toBeInTheDocument();
  });

  it("should navigate to search page on form submission", () => {
    render(<SearchBar initialValue="" />);

    const input = screen.getByTestId("search-input");
    fireEvent.change(input, { target: { value: "new query" } });

    const submitButton = screen.getByTestId("search-submit");
    fireEvent.click(submitButton);

    expect(mockPush).toHaveBeenCalledWith("/recherche?q=new%20query");
  });

  it("should not navigate if query is empty", () => {
    render(<SearchBar initialValue="" />);

    const submitButton = screen.getByTestId("search-submit");
    fireEvent.click(submitButton);

    expect(mockPush).not.toHaveBeenCalled();
  });

  it("should show suggestions when typing", async () => {
    const suggestions = ["suggestion 1", "suggestion 2", "suggestion 3"];

    (fetchSuggestResults as jest.Mock).mockResolvedValue(suggestions);

    render(<SearchBar initialValue="" />);

    const input = screen.getByTestId("search-input");
    fireEvent.change(input, { target: { value: "test" } });

    await waitFor(() => {
      expect(fetchSuggestResults).toHaveBeenCalledWith("test");
    });

    // Vérifier que les suggestions sont affichées
    const listbox = await screen.findByRole("listbox");
    expect(listbox).toBeInTheDocument();

    const options = screen.getAllByRole("option");
    expect(options).toHaveLength(suggestions.length);

    for (let i = 0; i < suggestions.length; i++) {
      expect(options[i]).toHaveTextContent(suggestions[i]);
    }
  });

  it("should navigate when selecting a suggestion", async () => {
    const suggestions = ["suggestion 1", "suggestion 2", "suggestion 3"];

    (fetchSuggestResults as jest.Mock).mockResolvedValue(suggestions);

    render(<SearchBar initialValue="" />);

    const input = screen.getByTestId("search-input");
    fireEvent.change(input, { target: { value: "test" } });

    await waitFor(() => {
      expect(fetchSuggestResults).toHaveBeenCalledWith("test");
    });

    // Attendre que les options soient affichées
    const options = await screen.findAllByRole("option");

    // Cliquer sur la deuxième suggestion
    fireEvent.click(options[1]);

    expect(mockPush).toHaveBeenCalledWith("/recherche?q=suggestion%202");
  });

  it("should limit suggestions to SUGGEST_MAX_RESULTS", async () => {
    const manyResults = Array.from(
      { length: SUGGEST_MAX_RESULTS + 5 },
      (_, i) => `suggestion ${i}`
    );

    (fetchSuggestResults as jest.Mock).mockResolvedValue(manyResults);

    render(<SearchBar initialValue="" />);

    const input = screen.getByTestId("search-input");
    fireEvent.change(input, { target: { value: "test" } });

    await waitFor(() => {
      expect(fetchSuggestResults).toHaveBeenCalledWith("test");
    });

    // Attendre que les options soient affichées
    const options = await screen.findAllByRole("option");

    // Vérifier que seuls les premiers SUGGEST_MAX_RESULTS résultats sont affichés
    expect(options).toHaveLength(SUGGEST_MAX_RESULTS);

    for (let i = 0; i < SUGGEST_MAX_RESULTS; i++) {
      expect(options[i]).toHaveTextContent(`suggestion ${i}`);
    }
  });

  it("should handle error in fetchSuggestResults", async () => {
    (fetchSuggestResults as jest.Mock).mockRejectedValue(
      new Error("API error")
    );

    render(<SearchBar initialValue="" />);

    const input = screen.getByTestId("search-input");
    fireEvent.change(input, { target: { value: "test" } });

    await waitFor(() => {
      expect(fetchSuggestResults).toHaveBeenCalledWith("test");
    });

    // Attendre un peu pour s'assurer que l'erreur a été traitée
    await waitFor(() => {
      // Aucune suggestion ne devrait être affichée
      expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
    });
  });
});
