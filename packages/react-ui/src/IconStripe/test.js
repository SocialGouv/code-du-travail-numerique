import { render } from "@testing-library/react";
import React from "react";

import { Document } from "../icons/index.js";
import { IconStripe } from "./index.js";

describe("<Grid />", () => {
  it("renders", () => {
    const { container } = render(
      <IconStripe icon={Document}>Here is some content</IconStripe>
    );
    expect(container).toMatchSnapshot();
  });
});
