import React from "react";
import { PageTitle } from ".";

export default {
  component: PageTitle,
  title: "Components|PageTitle"
};

export const base = () => (
  <>
    <PageTitle>Main title</PageTitle>
    <PageTitle as="h2">H2 title</PageTitle>
  </>
);
