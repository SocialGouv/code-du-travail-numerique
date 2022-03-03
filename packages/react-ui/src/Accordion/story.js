import React from "react";

import { Custom } from "../icons/index.js";
import { Section } from "../layout/Section/index.js";
import { Accordion } from "./index.js";

export default {
  component: Accordion,
  title: "Components/Accordion",
};

export const base = () => (
  <>
    <Section>
      <Accordion
        titleLevel={5}
        items={[
          {
            body: "this is the single body",
            title:
              "This is an h5 heading of a single item accordion with a crazy long title so we know if the accordion arrow icon get compressed or if it keeps its width",
          },
        ]}
      />
    </Section>
    <Section>
      <Accordion
        titleLevel={3}
        items={[
          {
            body: "this is the first body",
            title: "This the first h3 heading of a multiple accordion",
          },
          {
            body: "this is the second body",
            title: "This is the second h3 heading of a multiple accordion",
          },
        ]}
      />
    </Section>
    <Section>
      <Accordion
        titleLevel={3}
        preExpanded={["id"]}
        items={[
          {
            body: "this is the body",
            id: "id",
            title: "This is a pre expanded Title accordion",
          },
          {
            body: "this is the body",
            title: "This bloc could be extended too if needed",
          },
        ]}
      />
    </Section>
  </>
);

export const tile = () => (
  <Section>
    <Accordion
      titleLevel={5}
      variant="tile"
      items={[
        {
          body: "this is the single body",
          title: "1 - A tile title",
        },
        {
          body: "this is the single body",
          title: "2 - A tile title",
        },
        {
          body: "this is the single body",
          icon: Custom,
          title: "3 - A tile title with an icon",
        },
        {
          body: "this is the single body",
          icon: Custom,
          title: "4 - A tile title with an icon",
        },
        {
          body: "this is the single body",
          title: "5 - A tile title",
        },
        {
          body: "this is the single body",
          icon: Custom,
          title: "6 - A tile title with an icon",
        },
        {
          body: "this is the single body",
          icon: Custom,
          title: "7 - A tile title with an icon",
        },
        {
          body: "this is the single body",
          title: "8 - A tile title",
        },
      ]}
    />
  </Section>
);

export const Hierarchy = () => (
  <Section>
    <Accordion
      titleLevel={5}
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
          title: "A hierarchy title",
        },
        {
          body: "this is the single body",
          icon: Custom,
          title: "A hierarchy title with an icon",
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
          title: "A hierarchy title",
        },
        {
          body: "this is the single body",
          title: "A hierarchy title",
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
          title:
            "A hierarchy title, crazy long so we check the render of the last left dash on every viewport",
        },
      ]}
    />
  </Section>
);
