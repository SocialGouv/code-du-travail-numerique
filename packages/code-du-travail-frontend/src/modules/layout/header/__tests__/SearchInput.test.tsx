import { render, waitFor } from "@testing-library/react";
import React from "react";
import { SearchInput } from "../SearchInput";
import { UserAction } from "../../../../common";
import { fetchSuggestResults } from "../fetchSuggestResults";
import { useLayoutTracking } from "../../tracking";
import { byTestId } from "testing-library-selector";

jest.mock("../fetchSuggestResults");
jest.mock("../../tracking");

describe("<SearchInput />", () => {
  it("should match snapshot", () => {
    const { container } = render(
      <SearchInput
        className="my-class"
        id="my-id"
        placeholder="my-placeholder"
        type="search"
        onSearchSubmit={() => {}}
      />
    );
    expect(container).toMatchSnapshot();
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

    const emitSuggestionEventMock = jest.fn();
    (useLayoutTracking as jest.Mock).mockReturnValue({
      emitSuggestionEvent: emitSuggestionEventMock,
    });

    let onSearchSubmitHasBeenCalled = false;
    const { getByText } = render(
      <SearchInput
        className="my-class"
        id="my-id"
        placeholder="my-placeholder"
        type="search"
        onSearchSubmit={() => {
          onSearchSubmitHasBeenCalled = true;
        }}
      />
    );
    const userAction = new UserAction();
    userAction.setInput(byTestId("search-input").get(), "congés");

    await waitFor(() => {
      expect(getByText("congés payés et fractionnement")).toBeInTheDocument();
    });
    expect(onSearchSubmitHasBeenCalled).toBeFalsy();
    const congesSansSolde = getByText("congés sans solde");
    expect(getByText("congés sans solde")).toBeInTheDocument();
    expect(getByText("congés payés acquisition")).toBeInTheDocument();
    expect(getByText("congés payés")).toBeInTheDocument();
    expect(getByText("congés payés et maladie")).toBeInTheDocument();

    userAction.click(congesSansSolde);
    expect(onSearchSubmitHasBeenCalled).toBeTruthy();
    expect(emitSuggestionEventMock).toHaveBeenCalledWith(
      "congés",
      "congés sans solde",
      suggestions
    );
  });
});
