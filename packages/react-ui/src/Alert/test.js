import { render } from "@testing-library/react";
import React from "react";

import { Alert } from "./index.js";

describe("<Alert />", () => {
  test("should render", () => {
    const { container } = render(<Alert>this is an alert </Alert>);
    expect(container).toMatchSnapshot();
  });

  test.each(["primary", "secondary"])(
    "it should render a %s alert",
    (variant) => {
      const { container } = render(
        <Alert variant={variant}>this is a {variant} alert </Alert>
      );
      expect(container).toMatchSnapshot();
    }
  );
});
