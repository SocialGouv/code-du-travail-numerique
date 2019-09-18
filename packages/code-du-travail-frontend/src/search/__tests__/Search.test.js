import React from "react";
import Search from "../Search";
import { fireEvent, render, waitForElement } from "@testing-library/react";
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

describe("<search />", () => {
  it("should render", () => {
    const { container } = render(<Search />);
    expect(container).toMatchSnapshot();
  });

  it("should render suggestions", async () => {
    const { container, getAllByRole, getByLabelText } = render(<Search />, {
      query: { q }
    });
    const input = getByLabelText(/rechercher/i);
    fireEvent.change(input, { target: { value: "yolo" } });
    input.focus();
    await waitForElement(() => getAllByRole("option"));
    expect(container).toMatchSnapshot();
  });

  it("should update input value when suggestion are hightlighted", async () => {
    const { getByLabelText, getAllByRole } = render(<Search />);
    const input = getByLabelText(/rechercher/i);
    fireEvent.change(input, { target: { value: "yolo" } });
    input.focus();
    await waitForElement(() => getAllByRole("option"));
    fireEvent.keyDown(input, { keyCode: 40 }); // foo
    fireEvent.keyDown(input, { keyCode: 40 }); // foobar
    expect(input.value).toBe("foobar");
  });
});
