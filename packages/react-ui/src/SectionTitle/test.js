import React from "react";
import { render } from "@testing-library/react";
import { SectionTitle } from ".";

describe("<SectionTitle />", () => {
  test("should render title with description", () => {
    const { container } = render(
      <SectionTitle desc="Hello">Lorem Ipsum</SectionTitle>
    );
    expect(container).toMatchSnapshot();
  });
  test("should render title only", () => {
    const { container } = render(<SectionTitle>Lorem Ipsum</SectionTitle>);
    expect(container).toMatchSnapshot();
  });
  test("should render title in a link", () => {
    const { container } = render(
      <SectionTitle
        href="https://code.travail.gouv.fr"
        desc="le code du travail numérique"
      >
        Lorem Ipsum
      </SectionTitle>
    );
    expect(container).toMatchSnapshot();
  });
});
