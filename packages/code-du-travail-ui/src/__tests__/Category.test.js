import React from "react";
import { render } from "react-testing-library";
import Category from "../Category";

describe("<Category />", () => {
  test("should render with default props", () => {
    const { container } = render(<Category />);
    expect(container).toMatchSnapshot();
  });
  test("should render with props", () => {
    const { container } = render(
      <Category
        href="http://code-du-travail-numerique.beta.gouv.fr"
        icon="icon/icon.svg"
        title="titre"
        text="text"
      />
    );
    expect(container).toMatchSnapshot();
  });
});
