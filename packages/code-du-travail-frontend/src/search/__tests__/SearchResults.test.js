import React from "react";
import SearchResults from "../SearchResults";
import { render } from "@testing-library/react";

const results = {
  hits: {
    total: 1,
    hits: [
      {
        _id: "id",
        _source: {
          source: "faq",
          title: "Mer il est fou!",
          slug: "mer-il-est-fou"
        }
      }
    ]
  }
};

const emptyResults = {
  hits: {
    total: 0,
    hits: []
  }
};
describe("<SearchResults/>", () => {
  it("should render no results", () => {
    const { container } = render(
      <SearchResults data={emptyResults} query="search test" />
    );
    expect(container).toMatchSnapshot();
  });
  it("should render results", () => {
    const { container } = render(
      <SearchResults data={results} query="search test" />
    );
    expect(container).toMatchSnapshot();
  });
});
