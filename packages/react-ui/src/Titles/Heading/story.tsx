import React from "react";

import { Section } from "../../layout/Section";
import { Wrapper } from "../../layout/Wrapper";
import { spacings } from "../../theme.js";
import { Subtitle } from "../Subtitle";
import { Heading } from ".";

export default {
  component: Heading,
  title: "Titles/Components/Heading",
};

export const base = () => {
  return (
    <>
      <Section
        decorated={undefined}
        large={undefined}
        innerTopContent={undefined}
        innerBottomContent={undefined}
        variant={undefined}
      >
        <Heading>This is a heading (h3)</Heading>
      </Section>
      <Section
        decorated={undefined}
        large={undefined}
        innerTopContent={undefined}
        innerBottomContent={undefined}
        variant={undefined}
      >
        <Heading as="h4">This is a heading (h4)</Heading>
      </Section>
      <Section
        decorated={undefined}
        large={undefined}
        innerTopContent={undefined}
        innerBottomContent={undefined}
        variant={undefined}
      >
        <Heading stripe="left">This is a striped heading</Heading>
      </Section>
      <Section
        decorated={undefined}
        large={undefined}
        innerTopContent={undefined}
        innerBottomContent={undefined}
        variant={undefined}
      >
        <Heading variant="primary" stripe="left">
          This is a striped primary heading
        </Heading>
      </Section>
      <Section
        decorated={undefined}
        large={undefined}
        innerTopContent={undefined}
        innerBottomContent={undefined}
        variant={undefined}
      >
        <Wrapper>
          <Heading stripe="left" shift={spacings.xmedium} as="h4">
            This is a striped shifted heading (h4)
          </Heading>
        </Wrapper>
      </Section>
      <Section
        decorated={undefined}
        large={undefined}
        innerTopContent={undefined}
        innerBottomContent={undefined}
        variant={undefined}
      >
        <Heading>
          This is a heading with a subtitle inside
          <Subtitle>Subtitle</Subtitle>
        </Heading>
      </Section>
    </>
  );
};
