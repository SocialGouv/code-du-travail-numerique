import React from "react";
import { render } from "@testing-library/react";
import Section from ".";

describe("<Section />", () => {
  test.each([["default"], ["white"], ["dark"], ["light"]])(
    "it renders a %s Section",
    variant => {
      const { container } = render(
        <Section variant={variant}>this is a Button {variant} </Section>
      );
      expect(container).toMatchSnapshot();
    }
  );
});
