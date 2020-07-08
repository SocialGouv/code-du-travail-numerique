import { render } from "@testing-library/react";
import React from "react";

import ReferencesJuridiques from "../index";
import TYPE_REFERENCE from "../typeReference";

const references = [
  {
    id: "l1244-3",
    title: "Article L1244-3 du code du travail",
    type: TYPE_REFERENCE.codeDuTravail,
  },
  {
    id: "r*1244-4",
    title: "Article L1244-4 du code du travail",
    type: TYPE_REFERENCE.codeDuTravail,
  },
  {
    id: "l3121-44",
    title: "Article L3121-44 du JO",
    type: TYPE_REFERENCE.journalOfficiel,
  },
  // the two below are not linked to any bloc
  {
    id: "xxx",
    title: "Article xxx du JPO",
    type: TYPE_REFERENCE.journalOfficiel,
  },
  {
    id: "yyy",
    slug: "ma-convention",
    title: "Article yyy de la CC",
    type: TYPE_REFERENCE.conventionCollective,
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
