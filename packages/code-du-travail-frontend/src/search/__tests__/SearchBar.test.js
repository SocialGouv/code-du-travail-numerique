import { push as matopush } from "@socialgouv/matomo-next";
import { fireEvent, render, waitFor } from "@testing-library/react";
import React from "react";
import { act } from "react-dom/test-utils";

import { fetchSuggestResults } from "../search.service";
import SearchBar from "../SearchBar";

jest.useFakeTimers();

jest.mock("../search.service.js", () => ({
  fetchSuggestResults: jest.fn(),
}));

const q = "foo";
const suggestions = ["foo", "foobar", "foo bar ?", "foo bazzz"];

fetchSuggestResults.mockResolvedValue(suggestions);

describe("<SearchBar />", () => {
  it("should render", () => {
    const { container } = render(<SearchBar />);
    expect(container).toMatchSnapshot();
  });

  it("should render suggestions", async () => {
    const { container, getAllByRole, getByLabelText } = render(<SearchBar />, {
      query: { q },
    });
    const input = getByLabelText(/recherchez/i);
    fireEvent.change(input, { target: { value: "yolo" } });
    input.focus();
    await waitFor(() => getAllByRole("option"));
    expect(container).toMatchSnapshot();
  });

  it("should update input value when suggestion are hightlighted", async () => {
    const { getByLabelText, getAllByRole } = render(<SearchBar />);
    const input = getByLabelText(/recherchez/i);
    fireEvent.change(input, { target: { value: "yolo" } });
    input.focus();
    await waitFor(() => getAllByRole("option"));
    fireEvent.keyDown(input, { keyCode: 40 }); // foo
    fireEvent.keyDown(input, { keyCode: 40 }); // foobar
    expect(input.value).toBe("foobar");
  });

  it("should track suggestions and selectedSuggestion", async () => {
    const { getByText, getByLabelText } = render(<SearchBar />);

    const input = getByLabelText(/recherchez/i);
    await act(async () => {
      fireEvent.change(input, { target: { value: "yolo" } });
      input.focus();
    });
    const suggestion = getByText("foobar");
    suggestion.click();
    expect(matopush).toHaveBeenCalledTimes(2);
    expect(matopush.mock.calls[0][0]).toEqual([
      "trackEvent",
      "selectedSuggestion",
      "yolo",
      "foobar",
    ]);
    expect(matopush.mock.calls[1][0]).toEqual([
      "trackEvent",
      "candidateSuggestions",
      suggestions.join("###"),
    ]);
  });
});
