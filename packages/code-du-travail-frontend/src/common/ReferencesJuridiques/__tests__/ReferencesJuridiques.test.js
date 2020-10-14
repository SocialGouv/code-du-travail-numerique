import { render } from "@testing-library/react";
import React from "react";

import ReferencesJuridiques from "../index";

const references = [
  {
    slug: "l1244-3",
    title: "L1244-3",
    type: "code_du_travail",
  },
  {
    slug: "r1244-4",
    title: "R1244-4",
    type: "code_du_travail",
  },
  {
    title: "Article L3121-44 du JO",
    type: "external",
    url: "https://article.jo/L3121-44",
  },
  // the two below are not linked to any bloc
  {
    title: "Article foo du JPO",
    type: "external",
    url: "https://article.jo/foo",
  },
  {
    title: "Convention foo",
    type: "external",
    url: "https://ma-convention-collective/ccc-foo",
  },
];

describe("<ReferencesJuridiques />", () => {
  it("should render", () => {
    const { container } = render(
      <ReferencesJuridiques references={references} />
    );
    expect(container).toMatchSnapshot();
  });
});
