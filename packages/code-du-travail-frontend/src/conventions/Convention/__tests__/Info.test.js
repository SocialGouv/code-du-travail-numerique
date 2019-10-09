import React from "react";
import { render } from "../../../../test/utils";
import Info from "../Info";
import { convention, texteDeBase } from "../../__tests__/api.conventions.mock";

describe("<Info />", () => {
  it("renders", () => {
    const { container } = render(
      <Info convention={convention} container={texteDeBase} />
    );
    expect(container).toMatchSnapshot();
  });
});
