import { render } from "@testing-library/react";
import React from "react";

import { FlatList } from "./index.js";

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
