import React from "react";
import { action } from "@storybook/addon-actions";
import { X, Maximize } from "react-feather";

import { variants } from "../theme";
import { Section } from "../layout/Section";
import { Button } from ".";

export default {
  component: Button,
  title: "Components|Button"
};

export const base = () =>
  ["default"].concat(variants).map(variant => (
    <Section key={variant}>
      <Button variant={variant} onClick={action("text button clicked")}>
        {variant} button
      </Button>{" "}
      <Button
        size="small"
        variant={variant}
        onClick={action("text button clicked")}
      >
        {variant} small
      </Button>{" "}
      <Button
        variant={variant}
        onClick={action("You should not see this")}
        inverse
      >
        {variant} inverse
      </Button>{" "}
      <Button
        variant={variant}
        onClick={action("You should not see this")}
        disabled
      >
        {variant} disabled
      </Button>
    </Section>
  ));

export const icons = () => (
  <>
    <Section>
      <Button variant="icon" onClick={action("button X clicked")}>
        <X />
      </Button>
    </Section>
    <Section>
      <Button variant="icon" onClick={action("Button Maximize clicked")}>
        <Maximize />
      </Button>
    </Section>
  </>
);

export const link = () => (
  <Section>
    <Button variant="link" onClick={action("link button clicked")}>
      Button link
    </Button>
  </Section>
);
