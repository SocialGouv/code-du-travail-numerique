import React from "react";
import { variants } from "../theme";
import { render } from "../test-utils";
import { Button } from ".";

describe("<Button />", () => {
  it("renders", () => {
    const { container } = render(<Button>A button</Button>);
    expect(container).toMatchSnapshot();
  });

  test.each(["outlined"].concat(variants))(
    "it renders a Button %s",
    variant => {
      const { container } = render(
        <Button variant={variant}>this is a Button {variant} </Button>
      );
      expect(container).toMatchSnapshot();
    }
  );
});
