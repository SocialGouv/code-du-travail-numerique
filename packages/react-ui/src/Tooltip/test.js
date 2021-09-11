import { render } from "@testing-library/react";
import React from "react";

import { Tooltip } from "./index.js";

describe("<Tooltip />", () => {
  it("renders simple tooltip", () => {
    const { container } = render(
      <Tooltip text="Prompt text">A simple tooltip</Tooltip>
    );
    expect(container).toMatchSnapshot();
  });

  it("renders right tooltip", () => {
    const { container } = render(
      <Tooltip text="Prompt text" position="right">
        A simple tooltip
      </Tooltip>
    );
    expect(container).toMatchSnapshot();
  });

  it("renders left tooltip", () => {
    const { container } = render(
      <Tooltip text="Prompt text" position="left">
        A simple tooltip
      </Tooltip>
    );
    expect(container).toMatchSnapshot();
  });

  it("renders bottom tooltip", () => {
    const { container } = render(
      <Tooltip text="Prompt text" position="bottom">
        A simple tooltip
      </Tooltip>
    );
    expect(container).toMatchSnapshot();
  });

  it("renders custom color tooltip", () => {
    const { container } = render(
      <Tooltip text="Prompt text" background="FF0000" textColor="000000">
        A simple tooltip
      </Tooltip>
    );
    expect(container).toMatchSnapshot();
  });
});
