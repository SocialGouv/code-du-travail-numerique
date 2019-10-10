import React from "react";
import { render } from "@testing-library/react";
import { blocs } from "../../mapping";
import TYPE_REFERENCE from "../../typeReference";
import HierarchieBloc from "../HierarchieBloc";

const references = [
  {
    title: "Article L1244-3 du code du travail",
    type: TYPE_REFERENCE.codeDuTravail,
    id: "l1244-3"
  },
  {
    title: "Article L1244-4 du code du travail",
    type: TYPE_REFERENCE.codeDuTravail,
    id: "l1244-4"
  }
];

describe("<HierarchieBloc />", () => {
  it("should render", () => {
    const { container } = render(
      <HierarchieBloc id={Object.keys(blocs)[0]} references={references} />
    );
    expect(container).toMatchSnapshot();
  });
});
