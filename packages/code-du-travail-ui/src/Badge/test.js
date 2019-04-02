import React from "react";
import { render } from "react-testing-library";
import Badge from ".";

describe("<Badge />", () => {
  test("should render", () => {
    const { container } = render(<Badge>this is an alert </Badge>);
    expect(container).toMatchSnapshot();
  });
  test.each([
    ["success"],
    ["info"],
    ["warning"],
    ["danger"],
    ["primary"],
    ["secondary"]
  ])("it should render a badge %s", label => {
    const props = { [label]: true };
    const { container } = render(
      <Badge {...props}>this is a badge {label} </Badge>
    );
    expect(container).toMatchSnapshot();
  });
});
