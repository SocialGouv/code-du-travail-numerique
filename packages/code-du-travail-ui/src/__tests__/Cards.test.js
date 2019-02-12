import React from "react";
import { render } from "react-testing-library";
import Cards from "../Cards";
import Card from "../Card";

describe("<Cards />", () => {
  test("should render", () => {
    const { container } = render(<Cards />);
    expect(container).toMatchSnapshot();
  });
  test("should render children", () => {
    const { container } = render(
      <Cards>
        <Card>hello</Card>
        <Card>world</Card>
      </Cards>
    );
    expect(container).toMatchSnapshot();
  });
});
