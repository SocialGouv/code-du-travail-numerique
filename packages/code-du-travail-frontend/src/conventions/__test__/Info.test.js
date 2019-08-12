import React from "react";
import { render } from "react-testing-library";
import Info from "../Convention/Info";
import { convention, containerAndTexteDeBase } from "./sampleData";

describe("<Info />", () => {
  it("renders", () => {
    const { container } = render(
      <Info convention={convention} container={containerAndTexteDeBase} />
    );
    expect(container).toMatchSnapshot();
  });
});
