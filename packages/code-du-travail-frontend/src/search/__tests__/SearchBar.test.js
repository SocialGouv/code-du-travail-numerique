import React from "react";
import SearchBar from "../SearchBar";
import { fireEvent, render, waitForElement } from "../../../test/utils";
import { fetchSuggestResults } from "../search.service";

jest.mock("../search.service.js", () => ({
  fetchSuggestResults: jest.fn()
}));

jest.mock("../../piwik", () => ({
  matopush: jest.fn()
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
      query: { q }
    });
    const input = getByLabelText(/rechercher/i);
    fireEvent.change(input, { target: { value: "yolo" } });
    input.focus();
    await waitForElement(() => getAllByRole("option"));
    expect(container).toMatchSnapshot();
  });

  it("should update input value when suggestion are hightlighted", async () => {
    const { getByLabelText, getAllByRole } = render(<SearchBar />);
    const input = getByLabelText(/rechercher/i);
    fireEvent.change(input, { target: { value: "yolo" } });
    input.focus();
    await waitForElement(() => getAllByRole("option"));
    fireEvent.keyDown(input, { keyCode: 40 }); // foo
    fireEvent.keyDown(input, { keyCode: 40 }); // foobar
    expect(input.value).toBe("foobar");
  });
});
