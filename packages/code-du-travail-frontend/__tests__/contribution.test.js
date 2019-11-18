import React from "react";
import { render } from "@testing-library/react";
import FicheContribution from "../pages/contribution/[slug]";

describe("<FicheContribution />", () => {
  it("should render", () => {
    const { container } = render(<FicheContribution />);
    expect(container).toMatchSnapshot();
  });
});
