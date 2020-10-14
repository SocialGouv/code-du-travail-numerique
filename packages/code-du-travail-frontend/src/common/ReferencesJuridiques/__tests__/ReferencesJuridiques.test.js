import { render } from "@testing-library/react";
import React from "react";

import ReferencesJuridiques from "../index";

const references = [
  {
    id: "KALIARTI1234",
    title: "L1244-3",
    type: "code_du_travail",
    url: "https://article.cdt/l1244-3",
  },
  {
    id: "KALIARTI9876",
    title: "r*1244-4",
    type: "code_du_travail",
    url: "https://article.cdt/l1244-4",
  },
  {
    id: "JOREFTEXT123",
    title: "Article L3121-44 du JO",
    type: "external",
    url: "https://article.jo",
  },
  // the two below are not linked to any bloc
  {
    id: "xxx",
    title: "Article xxx du JPO",
    type: "external",
    url: "https://article.jo",
  },
  {
    id: "yyy",
    title: "Article yyy de la CC",
    type: "external",
    url: "https://ma-convention-collective",
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
