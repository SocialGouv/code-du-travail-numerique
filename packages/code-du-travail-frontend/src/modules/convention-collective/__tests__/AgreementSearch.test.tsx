import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { AgreementSearch } from "../AgreementSearch";
import { push as matopush } from "@socialgouv/matomo-next";

jest.mock("@socialgouv/matomo-next", () => ({
  push: jest.fn(),
}));

describe("AgreementSearch", () => {
  const props = {
    idcc: "1234",
    shortTitle: "Test Convention",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render the search form", () => {
    render(<AgreementSearch {...props} />);

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
    render(<AgreementSearch {...props} />);

    const input = screen.getByTestId("agreement-search-input");
    fireEvent.change(input, { target: { value: "test query" } });

    expect(input).toHaveValue("test query");
  });

  it("should track search when form is submitted", () => {
    render(<AgreementSearch {...props} />);

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

  it("should have correct hidden inputs with values", () => {
    render(<AgreementSearch {...props} />);

    // Check the idcc input
    expect(screen.getByTestId("agreement-search-idcc")).toHaveAttribute(
      "name",
      "idcc"
    );
    expect(screen.getByTestId("agreement-search-idcc")).toHaveAttribute(
      "type",
      "hidden"
    );
    expect(screen.getByTestId("agreement-search-idcc")).toHaveValue(props.idcc);

    // Check tab_selection input
    expect(screen.getByTestId("agreement-search-tab")).toHaveValue("kali");

    // Check searchField and searchType inputs
    expect(screen.getByTestId("agreement-search-field")).toHaveValue("ALL");
    expect(screen.getByTestId("agreement-search-type")).toHaveValue("ALL");

    // Check other inputs
    expect(screen.getByTestId("agreement-search-sort")).toHaveValue(
      "PERTINENCE"
    );
    expect(screen.getByTestId("agreement-search-pagesize")).toHaveValue("10");
    expect(screen.getByTestId("agreement-search-page")).toHaveValue("1");
  });
});
