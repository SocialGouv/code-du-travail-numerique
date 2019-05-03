import React from "react";
import { render } from "react-testing-library";
import ToggleButton from ".";

describe("<Button />", () => {
  it("renders", () => {
    const { container } = render(<ToggleButton>Toggle button</ToggleButton>);
    expect(container).toMatchSnapshot();
  });

  test.each([
    ["default"],
    ["primary"],
    ["secondary"],
    ["info"],
    ["success"],
    ["warning"],
    ["danger"]
  ])("it renders a Button %s", label => {
    const { container } = render(
      <ToggleButton variant={label}>this is a Button {label} </ToggleButton>
    );
    expect(container).toMatchSnapshot();
  });

  it("can be toggled programmatically", () => {
    const { getByText, rerender } = render(
      <ToggleButton pressed>label</ToggleButton>
    );
    const button = getByText("label");
    expect(button.getAttribute("aria-pressed")).toBe("true");
    rerender(<ToggleButton>label</ToggleButton>);
    expect(button.getAttribute("aria-pressed")).toBe("false");
  });
});
