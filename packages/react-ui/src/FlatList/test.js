import React from "react";
import { render } from "@testing-library/react";
import { FlatList } from ".";

describe("<Naked />", () => {
  it("renders", () => {
    const { container } = render(
      <FlatList>
        <li>OK</li>
        <li>sure</li>
      </FlatList>
    );
    expect(container).toMatchSnapshot();
  });
});
