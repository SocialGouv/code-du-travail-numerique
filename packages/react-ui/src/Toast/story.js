import React from "react";

import { Section } from "../layout/Section/index.js";
import { Toast } from "./index.js";

export default {
  argTypes: {
    handler: { action: "clicked" },
  },
  component: Toast,
  title: "Components/Toast",
};

export const base = ({ handler }) => (
  <>
    <Section>
      <Toast variant="primary">Here is an primary info.</Toast>
    </Section>
    <Section>
      <Toast variant="primary" shadow>
        Here is an primary info with shadow.
      </Toast>
    </Section>
    <Section>
      <Toast variant="secondary">Here is a secondary info.</Toast>
    </Section>
    <Section>
      <Toast shadow>Here is a toast with a shadow.</Toast>
    </Section>
    <Section>
      <Toast squared>Here is a squared toast</Toast>
    </Section>
    <Section>
      <Toast onRemove={() => handler("remove button clicked")}>
        {"Here is a removable info"}
      </Toast>
    </Section>
    <Section>
      <Toast wide>{"Here is a wide info."}</Toast>
    </Section>
    <Section>
      <Toast onRemove={() => handler("remove button clicked")}>
        <div>
          {"This is a crazy long removable toast,"}
          <br />
          {"more than you would ever expect"}
          <br />
          {
            "They could be like anything you want inside, from link to lists and even more !"
          }
          <br />
          <ul>
            <li>Look</li>
            <li>at</li>
            <li>this</li>
            <li>list</li>
            <li>!!!</li>
          </ul>
          <b>ok</b>
        </div>
      </Toast>
    </Section>
  </>
);

export const animated = () => (
  <>
    <Section>
      <Toast animate="from-top">{"Here is an info coming from the sky"}</Toast>
    </Section>
    <Section>
      <Toast animate="from-right">
        {"Here is an info coming from the sea"}
      </Toast>
    </Section>
    <Section>
      <Toast animate="from-left" shadow>
        {"Here is an success coming from the woods with a shadow"}
      </Toast>
    </Section>
    <Section>
      <Toast animate="from-bottom">
        {"Here is an warning coming from the ground"}
      </Toast>
    </Section>
  </>
);
