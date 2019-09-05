import React from "react";
import { render } from "@testing-library/react";
import Info from "../Convention/Info";
import { convention, containerAndTexteDeBase } from "./api.conventions.mock";

describe("<Info />", () => {
  it("renders", () => {
    const { container } = render(
      <Info convention={convention} container={containerAndTexteDeBase} />
    );
    expect(container).toMatchSnapshot();
  });
});
