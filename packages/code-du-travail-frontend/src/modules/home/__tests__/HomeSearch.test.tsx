import { HomeSearch } from "../Components";
import { fireEvent, render, waitFor } from "@testing-library/react";
import React from "react";
import { byTestId } from "testing-library-selector";
import { fetchSuggestResults } from "../../layout/header/fetchSuggestResults";
import { useLayoutTracking } from "../../layout/tracking";
import { UserAction } from "../../../common";

const pushRouter = jest.fn();

jest.mock("../../layout/header/fetchSuggestResults");
jest.mock("../../layout/tracking");

jest.mock("../../layout/header/fetchSuggestResults");
jest.mock("../../layout/tracking");
let onSearchSubmitHasBeenCalled = false;
let redirectUrl;
jest.mock("next/navigation", () => {
  return {
    redirect: jest.fn((url) => {
      onSearchSubmitHasBeenCalled = true;
      redirectUrl = url;
    }),
    useRouter: () => {
      return {
        push: jest.fn(),
      };
    },
  };
});
describe("<HomeSearch />", () => {
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

    const { getByText } = render(<HomeSearch />);
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
    fireEvent.submit(byTestId("search-input").get());
    expect(onSearchSubmitHasBeenCalled).toBeTruthy();
    expect(redirectUrl).toEqual("/recherche?q=cong%C3%A9s%20sans%20solde");
    expect(emitSuggestionEventMock).toHaveBeenCalledWith(
      "congés",
      "congés sans solde",
      suggestions
    );
  });
});
