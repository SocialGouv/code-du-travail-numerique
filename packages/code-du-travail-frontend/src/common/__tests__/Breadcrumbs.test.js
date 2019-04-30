import React from "react";
import { render } from "react-testing-library";
import { Breadcrumbs } from "../Breadcrumbs";

describe("<Breadcrumbs />", () => {
  it("should render nothing", () => {
    const { container } = render(<Breadcrumbs />);
    expect(container).toMatchSnapshot();
  });
  it("should render a breadcrumbs", () => {
    const { container } = render(<Breadcrumbs items={["item 1", "item 2"]} />);
    expect(container).toMatchSnapshot();
  });
});
