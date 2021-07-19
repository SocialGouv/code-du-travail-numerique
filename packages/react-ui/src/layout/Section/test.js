import { render } from "@testing-library/react";
import React from "react";

import { Section } from "./index.js";

describe("<Section />", () => {
  test.each([["default"], ["white"], ["dark"], ["light"]])(
    "it renders a %s Section",
    (variant) => {
      const { container } = render(
        <Section variant={variant}>this is a Button {variant} </Section>
      );
      expect(container).toMatchSnapshot();
    }
  );
  it("renders with correct decoration", () => {
    const { container } = render(
      <Section decorated variant="dark">
        A decorated dark section
      </Section>
    );
    expect(container).toMatchSnapshot();
  });
  it("renders large decorated section", () => {
    const { container } = render(
      <Section large decorated variant="dark">
        A decorated dark section
      </Section>
    );
    expect(container).toMatchSnapshot();
  });
});
