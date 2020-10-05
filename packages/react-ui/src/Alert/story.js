import React from "react";

import { Alert } from ".";

export default {
  component: Alert,
  title: "Components/Alert",
};

const Template = (args) => <Alert {...args}>Alert</Alert>;

export const Primary = Template.bind({});
Primary.args = { variant: "primary" };

export const Secondary = Template.bind({});
Secondary.args = { variant: "secondary" };
