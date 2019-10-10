import React from "react";
import { render } from "@wrapped-testing-library/react";
import { Breadcrumbs } from "../Breadcrumbs";

describe("<Breadcrumbs />", () => {
  it("should render nothing", () => {
    const { container } = render(<Breadcrumbs />);
    expect(container).toMatchSnapshot();
  });

  it("should render a breadcrumbs", () => {
    const data = [
      { label: "item 1", slug: "item-1" },
      { label: "item 2", slug: "item-2" }
    ].map(item => <span key={item.slug}> {item.label} </span>);

    const { container } = render(<Breadcrumbs items={data} />);
    expect(container).toMatchSnapshot();
  });
});
