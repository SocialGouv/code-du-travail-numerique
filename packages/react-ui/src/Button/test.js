import React from "react";
import { render } from "@testing-library/react";
import { variants } from "../theme";
import { Button } from ".";

describe("<Button />", () => {
  it("renders", () => {
    const { container } = render(<Button>A button</Button>);
    expect(container).toMatchSnapshot();
  });
  it("renders a small button", () => {
    const { container } = render(<Button size="small">A button</Button>);
    expect(container).toMatchSnapshot();
  });
  it("does not have a button tag of noButton prop is provided", () => {
    const { container } = render(<Button noButton>A button</Button>);
    expect(container.getElementsByTagName("button").length).toBe(0);
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
