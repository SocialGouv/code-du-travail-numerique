import React from "react";
import { render } from "../../../../test/utils";
import TYPE_REFERENCE from "../../typeReference";
import ReferenceList from "../ReferenceList";

const references = [
  {
    title: "Article xxx du code du travail",
    type: TYPE_REFERENCE.codeDuTravail,
    id: "xxx"
  },
  {
    title: "Article yyy du code du travail",
    type: TYPE_REFERENCE.journalOfficiel,
    id: "yyy"
  },
  {
    title: "Article zzz du code du travail",
    type: TYPE_REFERENCE.conventionCollective,
    id: "zzz"
  }
];

describe("<ReferenceList />", () => {
  it("should render", () => {
    const { container } = render(<ReferenceList references={references} />);
    expect(container).toMatchSnapshot();
  });
});
