import React from "react";
import { render } from "@testing-library/react";
import TYPE_REFERENCE from "../typeReference";
import ReferenceList from "../ReferenceList";

const references = [
  {
    title: "Article xxx du code du travail",
    type: TYPE_REFERENCE.codeDuTravail,
    id: "L2323-4",
  },
  {
    title: "Article yyy du JO",
    type: TYPE_REFERENCE.journalOfficiel,
    id: "yyy",
  },
  {
    title: "Article zzz de la CC",
    type: TYPE_REFERENCE.conventionCollective,
    id: "zzz",
    slug: "ma-convention-collective",
  },
  {
    title: "Article zzz de la CC",
    type: TYPE_REFERENCE.codeDuTravail,
    id: "R * 3321-2",
  },
];

describe("<ReferenceList />", () => {
  it("should render", () => {
    const { container } = render(<ReferenceList references={references} />);
    expect(container).toMatchSnapshot();
  });
});
