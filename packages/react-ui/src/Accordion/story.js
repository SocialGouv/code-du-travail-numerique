import React from "react";
import PropTypes from "prop-types";
import { Section } from "../layout/Section";
import { Title } from "../Titles/Title";
import { Accordion } from ".";

export default {
  component: Accordion,
  title: "Components|Accordion"
};

const CustomTitle = ({ children }) => <strong>{children}</strong>;
CustomTitle.propTypes = {
  children: PropTypes.node
};

export const base = () => (
  <>
    <Section>
      <Accordion
        items={[
          {
            title: (
              <h5>
                This is an h5 heading of a single item accordion with a crazy
                long title so we know if the accordion arrow icon get compressed
                or if it keeps its width
              </h5>
            ),
            body: "this is the single body"
          }
        ]}
      />
    </Section>
    <Section>
      <Accordion
        items={[
          {
            title: <h3>This the first h3 heading of a multiple accordion</h3>,
            body: "this is the first body"
          },
          {
            title: (
              <h3>This is the second h3 heading of a multiple accordion</h3>
            ),
            body: "this is the second body"
          }
        ]}
      />
    </Section>
    <Section>
      <Accordion
        preExpanded={["id"]}
        items={[
          {
            id: "id",
            title: <Title>This is a pre expanded Title accordion</Title>,
            body: "this is the body"
          },
          {
            title: <Title>This bloc could be extended too if needed</Title>,
            body: "this is the body"
          }
        ]}
      />
    </Section>
  </>
);
