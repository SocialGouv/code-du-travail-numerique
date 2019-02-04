import React from "react";
import { render } from "react-testing-library";
import Card from "../Card";

describe("<Card />", () => {
  test("should render", () => {
    const { container } = render(<Card />);
    expect(container).toMatchSnapshot();
  });
  test("should render children", () => {
    const { container } = render(
      <Card>
        <strong>titre</strong>
        <p>content</p>
      </Card>
    );
    expect(container).toMatchSnapshot();
  });
});
