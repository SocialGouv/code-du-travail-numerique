import React from "react";
import { SearchQuery } from "../SearchQuery";
import { render, waitForElement } from "react-testing-library";

const results = {
  facets: [],
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
describe("<SearchQuery/>", () => {
  it("should render results", async () => {
    const fetch = jest.fn().mockResolvedValue(results);
    const { container, getByText } = render(
      <SearchQuery fetch={fetch} query="search test" />
    );
    expect(fetch).toHaveBeenCalledWith("search test", "");
    await waitForElement(() => getByText(/mer il est fou/i));
    expect(container).toMatchSnapshot();
  });
});
