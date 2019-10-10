import React from "react";
import { render } from "@testing-library/react";
import { DureePreavisDemission } from "..";

describe("<DureePreavisDemission />", () => {
  it("should render", () => {
    const { container } = render(<DureePreavisDemission />);
    expect(container).toMatchSnapshot();
  });
});
