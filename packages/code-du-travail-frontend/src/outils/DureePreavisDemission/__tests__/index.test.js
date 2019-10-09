import React from "react";
import { render } from "../../../../test/utils";
import { DureePreavisDemission } from "..";

describe("<DureePreavisDemission />", () => {
  it("should render", () => {
    const { container } = render(<DureePreavisDemission />);
    expect(container).toMatchSnapshot();
  });
});
