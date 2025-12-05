import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { LegiFranceSearch } from "../LegiFranceSearch";
import { push as matopush } from "@socialgouv/matomo-next";

jest.mock("@socialgouv/matomo-next", () => ({
  push: jest.fn(),
}));

describe("LegiFranceSearch", () => {
  const props = {
    idcc: "1234",
    shortTitle: "Test Convention",
  };

  beforeEach(() => {
    jest.clearAllMocks();
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

    expect(matopush).toHaveBeenCalledWith([
      "trackEvent",
      "pagecc_searchcc",
      "Test Convention",
      "test query",
    ]);
  });

  it("should not submit form when query is empty", () => {
    render(<LegiFranceSearch {...props} />);

    const form = screen.getByTestId("agreement-search-form");

    fireEvent.submit(form);

    expect(matopush).not.toHaveBeenCalled();
  });
});
