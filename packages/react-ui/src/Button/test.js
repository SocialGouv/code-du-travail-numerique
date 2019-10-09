import React from "react";
import { render } from "../test-utils";
import { variants } from "../theme";
import { Button } from ".";

describe("<Button />", () => {
  it("renders", () => {
    const { container } = render(<Button>A button</Button>);
    expect(container).toMatchSnapshot();
  });

  test.each(["icon", "link"].concat(variants))(
    "it renders a Button %s",
    variant => {
      const { container } = render(
        <Button variant={variant}>this is a Button {variant} </Button>
      );
      expect(container).toMatchSnapshot();
    }
  );
});
