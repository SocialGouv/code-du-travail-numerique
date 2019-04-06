import React from "react";
import { render } from "react-testing-library";
import ToggleButton from ".";

describe("<Button />", () => {
  test("should render", () => {
    const { container } = render(<ToggleButton>Toggle button</ToggleButton>);
    expect(container).toMatchSnapshot();
  });

  test.each([
    ["success"],
    ["info"],
    ["warning"],
    ["danger"],
    ["primary"],
    ["secondary"],
    ["link"]
  ])("it should render a Button %s", label => {
    const props = { [label]: true };
    const { container } = render(
      <ToggleButton {...props}>this is a Button {label} </ToggleButton>
    );
    expect(container).toMatchSnapshot();
  });

  test.each([
    ["success"],
    ["info"],
    ["warning"],
    ["danger"],
    ["primary"],
    ["secondary"],
    ["link"]
  ])("Button %s can be toggle initially", label => {
    const props = { [label]: true };
    const { getByText } = render(
      <ToggleButton {...props} pressed>
        Button {label}{" "}
      </ToggleButton>
    );
    const button = getByText(`Button ${label}`);
    expect(button.getAttribute("aria-pressed")).toBe("true");
  });

  test.each([
    ["success"],
    ["info"],
    ["warning"],
    ["danger"],
    ["primary"],
    ["secondary"],
    ["link"]
  ])("Button %s can be toggle", label => {
    const props = { [label]: true };
    const { getByText } = render(
      <ToggleButton {...props}>Button {label} </ToggleButton>
    );
    const button = getByText(`Button ${label}`);
    button.click();
    expect(button.getAttribute("aria-pressed")).toBe("true");
  });

  test.each([
    ["success"],
    ["info"],
    ["warning"],
    ["danger"],
    ["primary"],
    ["secondary"],
    ["link"]
  ])("Button %s can be untoggle", label => {
    const props = { [label]: true };
    const { getByText } = render(
      <ToggleButton pressed {...props}>
        Button {label}{" "}
      </ToggleButton>
    );
    const button = getByText(`Button ${label}`);
    button.click();
    expect(button.getAttribute("aria-pressed")).toBe("false");
  });
});
