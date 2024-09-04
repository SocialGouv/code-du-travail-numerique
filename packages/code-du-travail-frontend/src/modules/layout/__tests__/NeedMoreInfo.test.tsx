import { render } from "@testing-library/react";
import React from "react";
import { NeedMoreInfo } from "../NeedMoreInfo";

describe("<NeedMoreInfo />", () => {
  it("should match snapshot", () => {
    expect(render(<NeedMoreInfo />)).toMatchSnapshot();
  });
});
