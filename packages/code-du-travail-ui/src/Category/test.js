import React from "react";
import { render } from "react-testing-library";
import Category from ".";

describe("<Category />", () => {
  test("should render with default props", () => {
    const { container } = render(<Category />);
    expect(container).toMatchSnapshot();
  });
  test("should render small", () => {
    const { container } = render(
      <Category small>
        <strong>titre</strong>
        <p>contenu</p>
      </Category>
    );
    expect(container).toMatchSnapshot();
  });
});
