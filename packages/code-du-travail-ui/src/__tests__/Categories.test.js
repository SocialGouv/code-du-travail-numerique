import React from "react";
import { render } from "react-testing-library";
import Categories from "../Categories";
import Category from "../Category";

describe("<Categories />", () => {
  test("should render with default props", () => {
    const { container } = render(<Categories />);
    expect(container).toMatchSnapshot();
  });
  test("should render with props", () => {
    const { container } = render(
      <Categories>
        <Category
          href="http://code-du-travail-numerique.beta.gouv.fr"
          icon="icon/icon.svg"
          title="titre"
          text="text"
        />
      </Categories>
    );
    expect(container).toMatchSnapshot();
  });
});
