import { render } from "@testing-library/react";
import React from "react";
import { SearchInput } from "../SearchInput";

describe("<SearchInput />", () => {
  it("should match snapshot", () => {
    const { container } = render(
      <SearchInput
        className="my-class"
        id="my-id"
        placeholder="my-placeholder"
        type="search"
        onSearchSubmit={() => {}}
      />
    );
    expect(container).toMatchSnapshot();
  });
});
