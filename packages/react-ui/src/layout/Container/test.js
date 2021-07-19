import { render } from "@testing-library/react";
import React from "react";

import { Container } from "./index.js";

describe("<Container />", () => {
  it("renders", () => {
    const { container } = render(<Container>One Aside title</Container>);
    expect(container).toMatchSnapshot();
  });
  it("renders narrow", () => {
    const { container } = render(
      <Container narrow>Narrow contained</Container>
    );
    expect(container).toMatchSnapshot();
  });
  it("renders narrow without padding", () => {
    const { container } = render(
      <Container narrow noPadding>
        noPadding prop can only be used with the narrow prop
      </Container>
    );
    expect(container).toMatchSnapshot();
  });
  it("renders without padding even if the prop is specified, because the narrow prop is not", () => {
    const { container } = render(
      <Container noPadding>
        noPadding prop can only be used with the narrow prop
      </Container>
    );
    expect(container).toMatchSnapshot();
  });
});
