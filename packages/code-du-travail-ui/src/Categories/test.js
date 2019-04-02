import React from "react";
import { render } from "react-testing-library";
import Category from "../Category";
import Categories from ".";

describe("<Categories />", () => {
  test("should render with default props", () => {
    const { container } = render(<Categories />);
    expect(container).toMatchSnapshot();
  });
  test("should render with props", () => {
    const { container } = render(
      <Categories>
        <Category>
          <strong>titre 1</strong>
          <p>contenu 1</p>
        </Category>
        <Category>
          <strong>titre 2</strong>
          <p>contenu 2</p>
        </Category>
      </Categories>
    );
    expect(container).toMatchSnapshot();
  });
});
