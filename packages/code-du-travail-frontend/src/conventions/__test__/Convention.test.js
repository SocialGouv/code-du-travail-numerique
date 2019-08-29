import React from "react";
import { render } from "@testing-library/react";
import Convention from "../Convention";
import { convention, containerAndTexteDeBase } from "./sampleData";

describe("<Convention />", () => {
  it("renders", () => {
    const { container } = render(
      <Convention convention={convention} container={containerAndTexteDeBase} />
    );
    expect(container).toMatchSnapshot();
  });
});
