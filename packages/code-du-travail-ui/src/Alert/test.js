import React from "react";
import { render } from "react-testing-library";
import { variants } from "../theme";
import Alert from ".";

describe("<Alert />", () => {
  test("should render", () => {
    const { container } = render(<Alert>this is an alert </Alert>);
    expect(container).toMatchSnapshot();
  });

  test.each(variants)("it should render a %s alert", variant => {
    const { container } = render(
      <Alert variant={variant}>this is a {variant} alert </Alert>
    );
    expect(container).toMatchSnapshot();
  });
});
