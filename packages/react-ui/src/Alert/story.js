import React from "react";
import { Alert } from ".";

export default {
  component: Alert,
  title: "Components|Alert"
};

export const base = () => (
  <>
    <Alert variant="primary">Primary alert</Alert>
    <Alert variant="secondary">Secondary (default) alert</Alert>
  </>
);
