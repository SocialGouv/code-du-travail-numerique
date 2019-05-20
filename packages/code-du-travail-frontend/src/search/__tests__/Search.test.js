import React from "react";
import Router from "next/router";
import { fireEvent, waitForElement } from "react-testing-library";

import { renderWithMock } from "../../../test/MockNextContext";
import Search from "../Search";
import { suggestResults } from "../search.service";

jest.mock("../search.service.js", () => ({
  suggestResults: jest.fn(),
  searchResults: jest.fn()
}));

Router.push = jest.fn();

const q = "foo";
const suggestions = ["foo", "foobar", "foo bar ?", "foo bazzz"];

suggestResults.mockResolvedValue(Promise.resolve(suggestions));

describe("<search />", () => {
  it("should render", () => {
    const { container } = renderWithMock(<Search />);
    expect(container).toMatchSnapshot();
  });

  it("should render suggestions", async () => {
    const { container, getAllByRole, getByLabelText } = renderWithMock(
      <Search />,
      { query: { q } }
    );
    const input = getByLabelText(/rechercher/i);
    fireEvent.change(input, { target: { value: "yolo" } });
    input.focus();
    await waitForElement(() => getAllByRole("option"));
    expect(container).toMatchSnapshot();
  });
  it("should not navigate when user change facet if query is empty", () => {
    const { getBySelectText } = renderWithMock(<Search />);
    const select = getBySelectText(/Tous contenus/i);
    fireEvent.change(select, { target: { value: "faq" } });
    expect(Router.push).not.toHaveBeenCalled();
  });

  it("should navigate when user change facet if query is filled", () => {
    const { getBySelectText, getByLabelText } = renderWithMock(<Search />);
    const input = getByLabelText(/rechercher/i);
    fireEvent.change(input, { target: { value: "yolo" } });
    const select = getBySelectText(/Tous contenus/i);
    fireEvent.change(select, { target: { value: "faq" } });
    expect(Router.push).toHaveBeenCalled();
  });

  it("should update input value when suggestion are hightlighted", async () => {
    const { getByLabelText, getAllByRole } = renderWithMock(<Search />);
    const input = getByLabelText(/rechercher/i);
    fireEvent.change(input, { target: { value: "yolo" } });
    input.focus();
    await waitForElement(() => getAllByRole("option"));
    fireEvent.keyDown(input, { keyCode: 40 }); // foo
    fireEvent.keyDown(input, { keyCode: 40 }); // foobar
    expect(input.value).toBe("foobar");
  });
});
