import { render } from "@testing-library/react";
import React from "react";

import { fetchSuggestResults } from "../search.service";
import SearchHero from "../SearchHero";

jest.mock("../search.service.js", () => ({
  fetchSuggestResults: jest.fn(),
}));

const suggestions = ["foo", "foobar", "foo bar ?", "foo bazzz"];

fetchSuggestResults.mockResolvedValue(suggestions);

describe("<SearchHero />", () => {
  it("should render", () => {
    const { container } = render(<SearchHero />);
    expect(container).toMatchSnapshot();
  });
});
