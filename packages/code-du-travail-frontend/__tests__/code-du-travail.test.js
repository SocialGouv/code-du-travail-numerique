import React from "react";
import { render } from "../test/utils";
import CodeDuTravail from "../pages/code-du-travail/[slug]";

describe("<CodeDuTravail />", () => {
  it("should render", () => {
    const { container } = render(<CodeDuTravail />);
    expect(container).toMatchSnapshot();
  });
});
