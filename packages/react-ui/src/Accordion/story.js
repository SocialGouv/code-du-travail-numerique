import React from "react";
import { Section } from "../layout/Section";
import { Wrapper } from "../layout/Wrapper";
import { Accordion } from ".";

export default {
  component: Accordion,
  title: "Components|Accordion"
};

export const base = () => (
  <>
    <Wrapper>
      <Accordion
        items={[
          {
            title: "This is the title of a single item accordion",
            body: "this is the body"
          }
        ]}
      />
    </Wrapper>
    <Wrapper>
      <Accordion
        items={[
          {
            title: <Section>This is a first section wrapped title</Section>,
            body: "this is the body"
          },
          {
            title: <Section>This is a second section wrapped title</Section>,
            body: "this is the body"
          }
        ]}
      />
    </Wrapper>
  </>
);
