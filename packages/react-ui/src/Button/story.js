import React from "react";
import styled from "styled-components";

import { Close, More, Search } from "../icons/index.js";
import { Section } from "../layout/Section/index.js";
import { spacings } from "../theme.js";
import { Button } from "./index.js";

export default {
  argTypes: {
    handler: { action: "clicked" },
  },
  component: Button,
  title: "Components/Button",
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

export const base = ({ handler }) =>
  ["primary", "secondary", "flat"].map((variant) => (
    <Section key={variant}>
      <Button variant={variant} onClick={() => handler(`${variant} basic`)}>
        {variant} button
      </Button>{" "}
      <Button
        variant={variant}
        small
        onClick={() => handler(`${variant} small`)}
      >
        {variant} button
      </Button>{" "}
      <Button variant={variant} onClick={() => handler("o_O")} disabled>
        {variant} disabled
      </Button>
    </Section>
  ));

export const icons = ({ handler }) => (
  <>
    <Section>
      <Button variant="primary" onClick={() => handler("button text + icon")}>
        Some text <StyledSearchRight />
      </Button>
    </Section>
    <Section>
      <Button onClick={() => handler("button icon + text")}>
        <StyledSearchLeft /> Some text
      </Button>
    </Section>
    <Section>
      <Button small onClick={() => handler("button small text + icon")}>
        Some text <StyledSearchRight />
      </Button>
    </Section>
    <Section>
      <Button variant="primary" narrow onClick={() => handler("close")}>
        <StyledClose />
      </Button>
    </Section>
    <Section>
      <Button variant="naked" narrow onClick={() => handler("close")}>
        <StyledClose />
      </Button>
    </Section>
    <Section>
      <Button variant="secondary" small onClick={() => handler("maximize")}>
        <StyledClose />
      </Button>
    </Section>
    <Section>
      <Button variant="secondary" narrow small onClick={() => handler("more")}>
        <StyledMore />
      </Button>
    </Section>
  </>
);

export const link = ({ handler }) => (
  <>
    <Section>
      <Button variant="link" onClick={() => handler("link")}>
        Button with link variant
      </Button>
    </Section>
    <Section>
      <Button variant="navLink" onClick={() => handler("navlink")}>
        Button with navLink variant
      </Button>
    </Section>
    <Section>
      <Button variant="link" onClick={() => handler("button link")} />
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
