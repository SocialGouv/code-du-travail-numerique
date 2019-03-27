import React from "react";
import { render } from "react-testing-library";
import TYPE_REFERENCE from "../../typeReference";
import AutresReferences from "../AutresReferences";

const references = [
  {
    title: "Article xxx du code du travail",
    type: TYPE_REFERENCE.journalOfficiel,
    id: "xxx"
  },
  {
    title: "Article yyy du code du travail",
    type: TYPE_REFERENCE.conventionCollective,
    id: "yyy"
  }
];

describe("<AutresReferences />", () => {
  it("should render", () => {
    const { container } = render(<AutresReferences references={references} />);
    expect(container).toMatchSnapshot();
  });
});
