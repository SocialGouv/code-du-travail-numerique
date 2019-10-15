import React from "react";
import { action } from "@storybook/addon-actions";

import { Tabs } from ".";

export default {
  component: Tabs,
  title: "Components|Tabs"
};

export const base = () => (
  <>
    <Tabs
      data={[
        {
          tab: "Tab 1",
          panel: "This panel can contain nodes"
        },
        {
          tab: "Tab 2",
          panel: "These tabs are not 'controlled', no onSelect is provided"
        },
        {
          tab: "Tab 3",
          panel: "Content 3"
        },
        {
          tab: "Tab 4",
          panel: "Content 4"
        },
        {
          tab: "Tab 5 starts to be long",
          panel: "Content 5"
        },
        {
          tab: "Tab 6, how will render the mobile version ? ",
          panel: "Content 6"
        },
        {
          tab: "Tab 7",
          panel: "Content 7"
        }
      ]}
    />
    <Tabs
      onSelect={index => action(`Selected index is ${index}`)()}
      data={[
        {
          tab: "Tab 1",
          panel: "This panel can contain nodes"
        },
        {
          tab: "Click here !",
          panel: "These tabs are not 'controlled'"
        }
      ]}
    />
    <Tabs
      selectedIndex={1}
      onSelect={index => action(`Tab change request on index ${index}`)()}
      data={[
        {
          tab: "Clicking here won't do anything",
          panel: ":/"
        },
        {
          tab: "Tab programmatically selected",
          panel:
            "These tabs are controlled, you won't be able to switch them manually."
        }
      ]}
    />
  </>
);
