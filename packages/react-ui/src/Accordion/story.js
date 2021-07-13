import React from "react";

import { Custom } from "../icons/index.js";
import { Section } from "../layout/Section/index.js";
import { Title } from "../Titles/Title";
import { Accordion } from "./index.js";

export default {
  component: Accordion,
  title: "Components/Accordion",
};

export const base = () => (
  <>
    <Section>
      <Accordion
        items={[
          {
            body: "this is the single body",
            title: (
              <h5>
                This is an h5 heading of a single item accordion with a crazy
                long title so we know if the accordion arrow icon get compressed
                or if it keeps its width
              </h5>
            ),
          },
        ]}
      />
    </Section>
    <Section>
      <Accordion
        items={[
          {
            body: "this is the first body",
            title: <h3>This the first h3 heading of a multiple accordion</h3>,
          },
          {
            body: "this is the second body",
            title: (
              <h3>This is the second h3 heading of a multiple accordion</h3>
            ),
          },
        ]}
      />
    </Section>
    <Section>
      <Accordion
        preExpanded={["id"]}
        items={[
          {
            body: "this is the body",
            id: "id",
            title: <Title>This is a pre expanded Title accordion</Title>,
          },
          {
            body: "this is the body",
            title: <Title>This bloc could be extended too if needed</Title>,
          },
        ]}
      />
    </Section>
  </>
);

export const tile = () => (
  <Section>
    <Accordion
      variant="tile"
      items={[
        {
          body: "this is the single body",
          title: <h5>1 - A tile title</h5>,
        },
        {
          body: "this is the single body",
          title: <h5>2 - A tile title</h5>,
        },
        {
          body: "this is the single body",
          icon: Custom,
          title: <h5>3 - A tile title with an icon</h5>,
        },
        {
          body: "this is the single body",
          icon: Custom,
          title: <h5>4 - A tile title with an icon</h5>,
        },
        {
          body: "this is the single body",
          title: <h5>5 - A tile title</h5>,
        },
        {
          body: "this is the single body",
          icon: Custom,
          title: <h5>6 - A tile title with an icon</h5>,
        },
        {
          body: "this is the single body",
          icon: Custom,
          title: <h5>7 - A tile title with an icon</h5>,
        },
        {
          body: "this is the single body",
          title: <h5>8 - A tile title</h5>,
        },
      ]}
    />
  </Section>
);

export const Hierarchy = () => (
  <Section>
    <Accordion
      variant="hierarchy"
      items={[
        {
          body: (
            <div>
              <p>
                The body must be long to check wether the bars on the left keep
                up with it
              </p>
              <p>
                The body must be long to check wether the bars on the left keep
                up with it
              </p>
              <p>
                The body must be long to check wether the bars on the left keep
                up with it
              </p>
              <p>
                The body must be long to check wether the bars on the left keep
                up with it
              </p>
            </div>
          ),
          title: <h5>A hiearchy title</h5>,
        },
        {
          body: "this is the single body",
          icon: Custom,
          title: <h5>A hiearchy title with an icon</h5>,
        },
        {
          body: (
            <div>
              <p>
                The body must be long to check wether the bars on the left keep
                up with it
              </p>
              <p>
                The body must be long to check wether the bars on the left keep
                up with it
              </p>
              <p>
                The body must be long to check wether the bars on the left keep
                up with it
              </p>
              <p>
                The body must be long to check wether the bars on the left keep
                up with it
              </p>
            </div>
          ),
          title: <h5>A hiearchy title</h5>,
        },
        {
          body: "this is the single body",
          title: <h5>A hiearchy title</h5>,
        },
        {
          body: (
            <div>
              <p>
                The body must be long to check wether the bars on the left keep
                up with it
              </p>
              <p>
                The body must be long to check wether the bars on the left keep
                up with it
              </p>
              <p>
                The body must be long to check wether the bars on the left keep
                up with it
              </p>
              <p>
                The body must be long to check wether the bars on the left keep
                up with it
              </p>
            </div>
          ),
          icon: Custom,
          title: (
            <h5>
              A hiearchy title, crazy long so we check the render of the last
              left dash on every viewport
            </h5>
          ),
        },
      ]}
    />
  </Section>
);
