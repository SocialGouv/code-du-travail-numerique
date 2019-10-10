import React from "react";
import SearchHero from "../SearchHero";
import { render } from "@wrapped-testing-library/react";
import { fetchSuggestResults } from "../search.service";

jest.mock("../search.service.js", () => ({
  fetchSuggestResults: jest.fn()
}));

jest.mock("../../piwik", () => ({
  matopush: jest.fn()
}));

const suggestions = ["foo", "foobar", "foo bar ?", "foo bazzz"];

fetchSuggestResults.mockResolvedValue(suggestions);

describe("<SearchHero />", () => {
  it("should render", () => {
    const { container } = render(<SearchHero />);
    expect(container).toMatchSnapshot();
  });
});
