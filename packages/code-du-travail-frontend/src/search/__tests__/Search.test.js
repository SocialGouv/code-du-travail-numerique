import React from "react";
import Search from "../Search";
import { fireEvent, render, waitForElement } from "@testing-library/react";

import { suggestResults } from "../search.service";
import { Router } from "../../../routes";

jest.mock("../search.service.js", () => ({
  suggestResults: jest.fn(),
  searchResults: jest.fn()
}));

jest.mock("../../piwik", () => ({
  matopush: jest.fn()
}));

Router.pushRoute = jest.fn();

const q = "foo";
const suggestions = ["foo", "foobar", "foo bar ?", "foo bazzz"];

suggestResults.mockResolvedValue(Promise.resolve(suggestions));

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

  it("should not navigate when user change facet if query is empty", () => {
    const { getBySelectText } = render(<Search />);
    const select = getBySelectText(/Tous contenus/i);
    fireEvent.change(select, { target: { value: "faq" } });
    expect(Router.pushRoute).not.toHaveBeenCalled();
  });

  it("should not navigate when user blur source facet", () => {
    const { getBySelectText } = render(<Search />, { query: { q } });
    const select = getBySelectText(/Tous contenus/i);
    fireEvent.focus(select);
    fireEvent.blur(select);
    expect(Router.pushRoute).not.toHaveBeenCalled();
  });

  it("should navigate when user change facet if query is filled", () => {
    const { getBySelectText, getByLabelText } = render(<Search />);
    const input = getByLabelText(/rechercher/i);
    fireEvent.change(input, { target: { value: "yolo" } });
    const select = getBySelectText(/Tous contenus/i);
    fireEvent.change(select, { target: { value: "faq" } });
    expect(Router.pushRoute).toHaveBeenCalled();
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
