import React from "react";
import SearchLanding from "../SearchLanding";
import { render } from "@testing-library/react";
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

describe("<SearchLanding />", () => {
  it("should render", () => {
    const { container } = render(<SearchLanding />);
    expect(container).toMatchSnapshot();
  });
});
