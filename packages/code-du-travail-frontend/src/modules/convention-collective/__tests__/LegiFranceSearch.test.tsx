import { render, screen, fireEvent } from "@testing-library/react";
import { LegiFranceSearch } from "../LegiFranceSearch";
import { sendEvent } from "@socialgouv/matomo-next";
import { usePathname } from "next/navigation";

jest.mock("@socialgouv/matomo-next", () => ({
  sendEvent: jest.fn(),
}));

describe("LegiFranceSearch", () => {
  const props = {
    idcc: "1234",
    shortTitle: "Test Convention",
  };

  // Le formulaire Légifrance s'affiche sur la page d'une convention collective.
  const PAGE = "/convention-collective/1234";
  const PATH = "convention-collective/1234";

  beforeEach(() => {
    jest.clearAllMocks();
    (usePathname as jest.Mock).mockReturnValue(PAGE);
  });

  it("should render the search form", () => {
    render(<LegiFranceSearch {...props} />);

    expect(
      screen.getByTestId("agreement-search-container")
    ).toBeInTheDocument();
    expect(screen.getByTestId("agreement-search-title")).toHaveTextContent(
      "Recherche dans la convention collective"
    );
    expect(screen.getByTestId("agreement-search-input")).toBeInTheDocument();
    expect(screen.getByTestId("agreement-search-button")).toBeInTheDocument();
    expect(screen.getByTestId("agreement-search-form")).toBeInTheDocument();
  });

  it("should update query state when input changes", () => {
    render(<LegiFranceSearch {...props} />);

    const input = screen.getByTestId("agreement-search-input");
    fireEvent.change(input, { target: { value: "test query" } });

    expect(input).toHaveValue("test query");
  });

  it("should track search when form is submitted", () => {
    render(<LegiFranceSearch {...props} />);

    const input = screen.getByTestId("agreement-search-input");
    const form = screen.getByTestId("agreement-search-form");

    fireEvent.change(input, { target: { value: "test query" } });
    fireEvent.submit(form);

    // Le titre court de la convention était l'ACTION dans l'ancien schéma, ce
    // qui créait une action Matomo par convention (~500 valeurs, au plafond de
    // troncature). Il passe en payload.
    expect(sendEvent).toHaveBeenCalledWith({
      category: "convention-collective",
      action: "search_legifrance",
      name: `{"path":"${PATH}","agreement":"Test Convention","query":"test query"}`,
    });
  });

  it("should not submit form when query is empty", () => {
    render(<LegiFranceSearch {...props} />);

    const form = screen.getByTestId("agreement-search-form");

    fireEvent.submit(form);

    expect(sendEvent).not.toHaveBeenCalled();
  });
});
