import React from "react";
import { render } from "@testing-library/react";
import Term from "../pages/glossaire/[slug]";

const term = {
  title: "Accord d'entreprise",
  slug: "accord-dentreprise",
  abbrs: [],
  variants: [
    "accord collectif d'entreprise",
    "accords d'entreprise",
    "accords collectifs d'entreprise",
  ],
  definition:
    "<p>Accord collectif de travail conclu au niveau d'une entreprise.</p>",
  refs: [],
};

describe("<Term />", () => {
  it("should render", () => {
    const { container } = render(
      <Term term={term} slug="accord-dentreprise" />
    );
    expect(container).toMatchSnapshot();
  });
});
