import React from "react";
import { render } from "react-testing-library";
import Card from "../Card";
import Cards from ".";

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
