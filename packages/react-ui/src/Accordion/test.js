import { render } from "@testing-library/react";
import React from "react";

import { Custom } from "../icons/index.js";
import { Accordion } from "./index.js";

describe("<Accordion />", () => {
  it("renders", () => {
    const items = [{ body: "this is the body", title: "This is the title" }];
    const { container } = render(<Accordion titleLevel={3} items={items} />);
    expect(container).toMatchSnapshot();
  });
  it("renders as h2", () => {
    const items = [{ body: "this is the body", title: "This is the title" }];
    const { container } = render(<Accordion titleLevel={2} items={items} />);
    expect(container).toMatchSnapshot();
  });
  it("renders as a tile accordion with an icon", () => {
    const items = [{ body: "this is the body", title: "This is the title" }];
    const { container } = render(<Accordion titleLevel={1} items={items} />);
    expect(container).toMatchSnapshot();
  });
  it("renders as a hierarchy accordion with an icon", () => {
    const items = [
      {
        body: "this is the body",
        icon: Custom,
        title: "This is the title",
        variant: "hierarchy",
      },
    ];
    const { container } = render(<Accordion titleLevel={3} items={items} />);
    expect(container).toMatchSnapshot();
  });
});
