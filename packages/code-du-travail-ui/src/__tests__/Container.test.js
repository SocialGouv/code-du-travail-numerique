import React from "react";
import { render } from "react-testing-library";
import Container from "../Container";

describe("<Container />", () => {
  test("should render", () => {
    const { container } = render(<Container>One Aside title</Container>);
    expect(container).toMatchSnapshot();
  });
});
