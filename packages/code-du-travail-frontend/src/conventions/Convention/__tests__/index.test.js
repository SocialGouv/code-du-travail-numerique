import React from "react";
import { render } from "@testing-library/react";
import Convention from "..";
import { convention, texteDeBase } from "../../__tests__/api.conventions.mock";

describe("<Convention />", () => {
  it("renders", () => {
    const { container } = render(
      <Convention convention={convention} container={texteDeBase} />
    );
    expect(container).toMatchSnapshot();
  });
});
