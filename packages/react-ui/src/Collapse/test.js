import { render } from "@testing-library/react";
import React from "react";

import { Collapse } from "./index";

describe("<Collapse />", () => {
  it("renders", () => {
    const { container } = render(
      <Collapse title="Hello">
        <p>Hi</p>
      </Collapse>
    );
    expect(container).toMatchSnapshot();
  });
});
