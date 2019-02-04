import React from "react";
import { render } from "react-testing-library";
import Alert from "../Alert";

describe("<Alert />", () => {
  test("should render", () => {
    const { container } = render(<Alert>this is an alert </Alert>);
    expect(container).toMatchSnapshot();
  });

  test.each([
    ["success"],
    ["info"],
    ["warning"],
    ["danger"],
    ["primary"],
    ["secondary"]
  ])("it should render an alert %s", label => {
    const props = { [label]: true };
    const { container } = render(
      <Alert {...props}>this is an alert {label} </Alert>
    );
    expect(container).toMatchSnapshot();
  });
});
