import React from "react";
import { render } from "@testing-library/react";
import CodeDuTravail from "../pages/code-du-travail/[slug]";

describe("<CodeDuTravail />", () => {
  it("should render", () => {
    const { container } = render(<CodeDuTravail />);
    expect(container).toMatchSnapshot();
  });
});
