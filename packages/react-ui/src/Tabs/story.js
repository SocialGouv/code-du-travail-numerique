import React from "react";

import { Title } from "../Titles/Title/index.js";
import { Tabs } from "./index.js";

export default {
  argTypes: {
    handler: { action: "clicked" },
  },
  component: Tabs,
  title: "Components/Tabs",
};

export const base = ({ handler }) => (
  <>
    <Tabs
      data={[
        {
          panel: "This panel can contain nodes",
          tab: <Title>This is a Title tab</Title>,
        },
        {
          panel: "These tabs are not 'controlled', no onSelect is provided",
          tab: <Title>Title tabs render normally</Title>,
        },
        {
          panel: "Content 3",
          tab: "Tab 3 (not a title)",
        },
        {
          panel: "Content 4",
          tab: <h3>Tab 4 - h3</h3>,
        },
        {
          panel: "Content 5",
          tab: "Tab 5 starts to be long",
        },
        {
          panel: "Content 6",
          tab: "Tab 6, how will render the mobile version ? ",
        },
        {
          panel: "Content 7",
          tab: <h2>This is a h2 tab</h2>,
        },
      ]}
    />
    <Tabs
      onSelect={(index) => handler(`Selected index is ${index}`)()}
      data={[
        {
          panel: "This panel can contain nodes",
          tab: "Tab 1",
        },
        {
          panel: "These tabs are not 'controlled'",
          tab: "Click here !",
        },
      ]}
    />
    <Tabs
      selectedIndex={1}
      onSelect={(index) => handler(`Tab change request on index ${index}`)()}
      data={[
        {
          panel: ":/",
          tab: "Clicking here won't do anything",
        },
        {
          panel:
            "These tabs are controlled, you won't be able to switch them manually.",
          tab: "Tab programmatically selected",
        },
      ]}
    />
  </>
);
