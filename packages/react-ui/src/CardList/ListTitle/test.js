import React from "react";
import { render } from "@testing-library/react";
import { ListTitle } from ".";

describe("<ListTitle />", () => {
  test("should render title with description", () => {
    const { container } = render(
      <ListTitle desc="Hello">Lorem Ipsum</ListTitle>
    );
    expect(container).toMatchSnapshot();
  });
  test("should render title only", () => {
    const { container } = render(<ListTitle>Lorem Ipsum</ListTitle>);
    expect(container).toMatchSnapshot();
  });
  test("should render title in a link", () => {
    const { container } = render(
      <ListTitle
        href="https://code.travail.gouv.fr"
        desc="le code du travail numérique"
      >
        Lorem Ipsum
      </ListTitle>
    );
    expect(container).toMatchSnapshot();
  });
});
