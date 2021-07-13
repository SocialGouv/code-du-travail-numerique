import React from "react";

import { PageTitle } from "../../Titles/PageTitle/index.js";
import { Section } from "../Section/index.js";
import { Container } from "./index.js";

export default {
  component: Container,
  title: "Layout/Components/Container",
};

export const base = () => (
  <>
    <PageTitle>Container</PageTitle>
    <p>
      The Container component is a bloc which adds horizontal paddings and a
      max-width. It is usually the children of a Section component.
    </p>
    <Section>
      <Container>
        This is a standard Container. Lorem ipsum dolor sit amet, consectetur
        adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua. Ut enim ad minim veniam.
      </Container>
    </Section>
    <Section>
      <Container narrow>
        This is a narrow Container. Lorem ipsum dolor sit amet, consectetur
        adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua. Ut enim ad minim veniam.
      </Container>
    </Section>
    <Section>
      <Container narrow noPadding>
        This is a narrow Container without paddings. Lorem ipsum dolor sit amet,
        consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore
        et dolore magna aliqua. Ut enim ad minim veniam.
      </Container>
    </Section>
  </>
);
