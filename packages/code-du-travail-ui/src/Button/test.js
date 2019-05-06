import React from "react";
import { render } from "react-testing-library";
import Button from ".";

describe("<Button />", () => {
  it("renders", () => {
    const { container } = render(<Button>A button</Button>);
    expect(container).toMatchSnapshot();
  });

  test.each([
    ["default"],
    ["primary"],
    ["secondary"],
    ["info"],
    ["success"],
    ["warning"],
    ["danger"],
    ["icon"],
    ["link"]
  ])("it renders a Button %s", label => {
    const { container } = render(
      <Button variant={label}>this is a Button {label} </Button>
    );
    expect(container).toMatchSnapshot();
  });

  it("can be toggled programmatically", () => {
    const { getByText, rerender } = render(<Button pressed>label</Button>);
    const button = getByText("label");
    expect(button.getAttribute("aria-pressed")).toBe("true");
    rerender(<Button>label</Button>);
    expect(button.getAttribute("aria-pressed")).toBe("false");
  });
});
