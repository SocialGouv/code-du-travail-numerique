import { render } from "@testing-library/react";
import React from "react";

import ReferenceList from "../ReferenceList";
import TYPE_REFERENCE from "../typeReference";

const references = [
  {
    id: "L2323-4",
    title: "Article xxx du code du travail",
    type: TYPE_REFERENCE.codeDuTravail,
  },
  {
    id: "yyy",
    title: "Article yyy du JO",
    type: TYPE_REFERENCE.journalOfficiel,
  },
  {
    id: "zzz",
    slug: "ma-convention-collective",
    title: "Article zzz de la CC",
    type: TYPE_REFERENCE.conventionCollective,
  },
  {
    id: "R * 3321-2",
    title: "Article zzz de la CC",
    type: TYPE_REFERENCE.codeDuTravail,
  },
];

describe("<ReferenceList />", () => {
  it("should render", () => {
    const { container } = render(<ReferenceList references={references} />);
    expect(container).toMatchSnapshot();
  });
});
