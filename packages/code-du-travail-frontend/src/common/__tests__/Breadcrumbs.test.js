import { render } from "@testing-library/react";
import React from "react";

import Breadcrumbs from "../Breadcrumbs";

describe("<Breadcrumbs />", () => {
  it("should render nothing", () => {
    const { container } = render(<Breadcrumbs />);
    expect(container).toMatchSnapshot();
  });

  it("should render a breadcrumbs", () => {
    const data = [
      { label: "item 1", slug: "/themes/item-1" },
      { label: "item 2", slug: "/themes/item-2" },
    ];

    const { container } = render(<Breadcrumbs items={data} />);
    expect(container).toMatchSnapshot();
  });
});
