import React from "react";
import { render } from "react-testing-library";
import Button from ".";

describe("<Button />", () => {
  test("should render", () => {
    const { container } = render(<Button>this is an alert </Button>);
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
      <Button {...props}>this is a Button {label} </Button>
    );
    expect(container).toMatchSnapshot();
  });
});
