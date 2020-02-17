import React from "react";
import { render } from "@testing-library/react";
import { Breadcrumbs } from "../Breadcrumbs";

describe("<Breadcrumbs />", () => {
  it("should render nothing", () => {
    const { container } = render(<Breadcrumbs />);
    expect(container).toMatchSnapshot();
  });

  it("should render a breadcrumbs", () => {
    const data = [
      { label: "item 1", path: "themes", slug: "item-1" },
      { label: "item 2", path: "themes", slug: "item-2" }
    ].map(item => <span key={item.slug}> {item.label} </span>);

    const { container } = render(<Breadcrumbs items={data} />);
    expect(container).toMatchSnapshot();
  });
});
