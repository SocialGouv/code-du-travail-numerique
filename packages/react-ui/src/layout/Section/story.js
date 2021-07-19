import React from "react";

import { Container } from "../../layout/Container/index.js";
import { Wrapper } from "../../layout/Wrapper/index.js";
import { PageTitle } from "../../Titles/PageTitle/index.js";
import { Title } from "../../Titles/Title/index.js";
import { Section } from "./index.js";

export default {
  component: Section,
  title: "Layout/Components/Section",
};

export const base = () => (
  <>
    <PageTitle>Section</PageTitle>
    <p>
      The Section component is a bloc which adds vertical margins and an
      eventual background color
    </p>

    <Section>A basic section</Section>
    <Section variant="light">A light section</Section>
    <Section variant="dark">A dark section</Section>
    <Section>
      <Section decorated variant="light">
        A decorated ligh section
      </Section>
    </Section>
    <Section>
      <Section
        decorated
        variant="dark"
        innerTopContent={
          <Title subtitle="With a subtitle that should never get out of the decorative layer">
            I am a quite large title I am a quite large title I am a quite large
            title
          </Title>
        }
        innerBottomContent={
          <Wrapper>
            And I am an inner bottom content that should never get out of the
            decorative layer And I am an inner bottom content that should never
            get out of the decorative layer And I am an inner bottom content
            that should never get out of the decorative layer
          </Wrapper>
        }
      >
        <Container>
          I can get out of the layer though I can get out of the layer though I
          can get out of the layer though I can get out of the layer though
        </Container>
      </Section>
    </Section>
    <Section>
      <Section large decorated variant="dark">
        A large decorated dark section
      </Section>
    </Section>
  </>
);
