import { render } from "@testing-library/react";
import React from "react";

import { Wrapper } from "./index.js";

describe("<Wrapper />", () => {
  test.each([["default"], ["dark"], ["light"], ["main"]])(
    "it renders a %s Wrapper",
    (variant) => {
      const { container } = render(
        <Wrapper variant={variant}>this is a Button {variant} </Wrapper>
      );
      expect(container).toMatchSnapshot();
    }
  );
  it("should render a large wrapper", () => {
    const { container } = render(
      <Wrapper size="large">I am a large wrapper</Wrapper>
    );
    expect(container).toMatchSnapshot();
  });
});
