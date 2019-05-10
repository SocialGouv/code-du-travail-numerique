import React from "react";
import { render } from "react-testing-library";
import Container from ".";

describe("<Container />", () => {
  test("should render", () => {
    const { container } = render(<Container>One Aside title</Container>);
    expect(container).toMatchSnapshot();
  });
  test("should render narrow", () => {
    const { container } = render(
      <Container narrow>Narrow contained</Container>
    );
    expect(container).toMatchSnapshot();
  });
});
