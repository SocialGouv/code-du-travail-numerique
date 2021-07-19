import { render } from "@testing-library/react";
import React from "react";

import { Button } from "./index.js";

describe("<Button />", () => {
  it("renders", () => {
    const { container } = render(<Button>A button</Button>);
    expect(container).toMatchSnapshot();
  });
  it("renders as a link", () => {
    const { container } = render(
      <Button as="a" href="http://www.turfu.com">
        A button
      </Button>
    );
    expect(container).toMatchSnapshot();
  });
  it("renders as div", () => {
    const { container } = render(<Button as="div">A button</Button>);
    expect(container).toMatchSnapshot();
  });

  test.each(["naked", "flat", "link", "navLink", "primary", "secondary"])(
    "it renders a Button %s",
    (variant) => {
      const { container } = render(
        <>
          <Button variant={variant}>this is a Button {variant} </Button>
          <Button small variant={variant}>
            this is a small Button {variant}{" "}
          </Button>
          <Button narrow variant={variant}>
            this is a narrow Button {variant}{" "}
          </Button>
        </>
      );
      expect(container).toMatchSnapshot();
    }
  );
});
