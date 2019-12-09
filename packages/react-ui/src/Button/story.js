import React from "react";
import { action } from "@storybook/addon-actions";
import styled from "styled-components";
import { Close, More, Search } from "../icons";
import { Section } from "../layout/Section";
import { spacings } from "../theme";
import { Button } from ".";

export default {
  component: Button,
  title: "Components|Button"
};

const StyledSearchRight = styled(Search)`
  width: 4rem;
  padding-left: ${spacings.small};
`;
const StyledSearchLeft = styled(Search)`
  width: 4rem;
  padding-right: ${spacings.small};
`;

const StyledClose = styled(Close)`
  width: 2.4rem;
`;
const StyledMore = styled(More)`
  width: 2.4rem;
`;

export const base = () =>
  ["primary", "secondary", "flat"].map(variant => (
    <Section key={variant}>
      <Button variant={variant} onClick={action("basic button clicked")}>
        {variant} button
      </Button>{" "}
      <Button variant={variant} small onClick={action("small button clicked")}>
        {variant} button
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
      <Button variant="primary" onClick={action("button text + icon clicked")}>
        Some text <StyledSearchRight />
      </Button>
    </Section>
    <Section>
      <Button onClick={action("button icon + text on clicked")}>
        <StyledSearchLeft /> Some text
      </Button>
    </Section>
    <Section>
      <Button small onClick={action("button small text + icon clicked")}>
        Some text <StyledSearchRight />
      </Button>
    </Section>
    <Section>
      <Button variant="primary" narrow onClick={action("button Close clicked")}>
        <StyledClose />
      </Button>
    </Section>
    <Section>
      <Button variant="naked" narrow onClick={action("button Close clicked")}>
        <StyledClose />
      </Button>
    </Section>
    <Section>
      <Button
        variant="secondary"
        small
        onClick={action("Button Maximize clicked")}
      >
        <StyledClose />
      </Button>
    </Section>
    <Section>
      <Button
        variant="secondary"
        narrow
        small
        onClick={action("Button More clicked")}
      >
        <StyledMore />
      </Button>
    </Section>
  </>
);

export const link = () => (
  <>
    <Section>
      <Button variant="link" onClick={action("link button clicked")}>
        Button with link variant
      </Button>
    </Section>
    <Section>
      <Button variant="link" onClick={action("link button clicked")} />
    </Section>
    <Section>
      <Button variant="secondary" as="a" href="https://code.travail.gouv.fr">
        Button with &lt;a&gt; tag
      </Button>
    </Section>
  </>
);
export const div = () => (
  <>
    <Section>
      <Button variant="secondary" as="div">
        Button with &lt;div&gt; tag
      </Button>
    </Section>
    <Section>
      <Button variant="link" as="div">
        Button variant link with &lt;div&gt; tag
      </Button>
    </Section>
  </>
);
