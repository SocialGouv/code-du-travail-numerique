import React from "react";
import { SearchResults } from "../SearchResults";
import { render } from "@testing-library/react";

const items = [
  {
    _id: "id",
    _source: {
      source: "faq",
      title: "Mer il est fou!",
      slug: "mer-il-est-fou"
    }
  }
];

describe("<SearchResults/>", () => {
  it("should render no results", () => {
    const { container } = render(
      <SearchResults items={[]} query="search test" />
    );
    expect(container).toMatchSnapshot();
  });
  it("should render results", () => {
    const { container } = render(
      <SearchResults items={items} query="search test" />
    );
    expect(container).toMatchSnapshot();
  });
});
