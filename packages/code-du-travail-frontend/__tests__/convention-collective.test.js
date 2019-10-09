import React from "react";
import { render } from "../test/utils";
import ConventionCollective from "../pages/convention-collective/[slug]";

describe("<ConventionCollective />", () => {
  it("should render", () => {
    const { container } = render(<ConventionCollective />);
    expect(container).toMatchSnapshot();
  });
});
