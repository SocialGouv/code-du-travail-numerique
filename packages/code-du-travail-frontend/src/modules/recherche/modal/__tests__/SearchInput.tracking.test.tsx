import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { SearchInput } from "../SearchInput";
import { useSearchTracking } from "../../tracking";
import { PresearchClass } from "src/api/modules/search/service/types";

jest.mock("../../tracking", () => ({
  useSearchTracking: jest.fn(),
}));

describe("SearchInput tracking", () => {
  const emitClickSeeAllResultsEvent = jest.fn();
  const emitSuggestionSelectionEvent = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useSearchTracking as jest.Mock).mockReturnValue({
      emitClickSeeAllResultsEvent,
      emitSuggestionSelectionEvent,
    });
  });

  it("does not reuse a previously set queryClass when the query changed without a new presearch", () => {
    render(
      <SearchInput
        onChangeQuery={() => {}}
        hasSearched={false}
        resultsCount={2}
        contextType="home"
        queryClass={PresearchClass.CC}
        lastPresearchQuery="ancienne requête"
      />
    );

    const input = screen.getByRole("combobox");
    fireEvent.change(input, { target: { value: "nouvelle" } });

    fireEvent.click(
      screen.getByRole("button", { name: /voir tous les résultats/i })
    );

    expect(emitClickSeeAllResultsEvent).toHaveBeenCalledWith(
      "nouvelle",
      undefined
    );
  });

  it("uses queryClass when presearch results are displayed for the current query", () => {
    render(
      <SearchInput
        onChangeQuery={() => {}}
        initialQuery="test"
        hasSearched={true}
        resultsCount={2}
        contextType="home"
        queryClass={PresearchClass.KEYWORD}
        lastPresearchQuery="test"
      />
    );

    fireEvent.click(
      screen.getByRole("button", { name: /voir tous les résultats/i })
    );

    expect(emitClickSeeAllResultsEvent).toHaveBeenCalledWith(
      "test",
      PresearchClass.KEYWORD
    );
  });
});
