import React from "react";
import { action } from "@storybook/addon-actions";

import { Section } from "../layout/Section";
import { Toast } from ".";

export default {
  component: Toast,
  title: "Components|Toast"
};

export const base = () => (
  <>
    <Section>
      <Toast variant="primary">Here is an primary info.</Toast>
    </Section>
    <Section>
      <Toast variant="secondary">Here is a secondary info.</Toast>
    </Section>
    <Section>
      <Toast shadow>Here is a toast with a shadow.</Toast>
    </Section>
    <Section>
      <Toast onRemove={action("remove button clicked")}>
        {"Here is a removable info"}
      </Toast>
    </Section>
    <Section>
      <Toast wide>{"Here is a wide info."}</Toast>
    </Section>
    <Section>
      <Toast onRemove={action("remove button clicked")}>
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
