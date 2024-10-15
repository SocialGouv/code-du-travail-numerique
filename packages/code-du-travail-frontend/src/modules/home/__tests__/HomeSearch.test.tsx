import { render } from "@testing-library/react";
import React from "react";
import { HomeSearch } from "../HomeSearch";

describe("<HomeSearch />", () => {
  it("should match snapshot", () => {
    const { container } = render(<HomeSearch onSearchSubmit={jest.fn()} />);
    expect(container).toMatchSnapshot();
  });
});
