import React from "react";
import { variants } from "../theme";
import { Alert } from ".";

export default {
  component: Alert,
  title: "Components|Alert"
};

export const base = () =>
  ["default"].concat(variants).map(variant => (
    <Alert key={variant} variant={variant}>
      {variant} alert
    </Alert>
  ));
