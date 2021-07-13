import { render } from "@testing-library/react";
import React from "react";

import { Custom } from "../icons/index.js";
import { Accordion } from "./index.js";

describe("<Accordion />", () => {
  it("renders", () => {
    const items = [
      { body: "this is the body", title: <h3>This is the title</h3> },
    ];
    const { container } = render(<Accordion items={items} />);
    expect(container).toMatchSnapshot();
  });
  it("renders as h2", () => {
    const items = [
      { body: "this is the body", title: <h2>This is the title</h2> },
    ];
    const { container } = render(<Accordion items={items} />);
    expect(container).toMatchSnapshot();
  });
  it("renders as a tile accordion with an icon", () => {
    const items = [
      { body: "this is the body", title: <span>This is the title</span> },
    ];
    const { container } = render(<Accordion items={items} />);
    expect(container).toMatchSnapshot();
  });
  it("renders as a hierarchy accordion with an icon", () => {
    const items = [
      {
        body: "this is the body",
        icon: Custom,
        title: <span>This is the title</span>,
        variant: "hierarchy",
      },
    ];
    const { container } = render(<Accordion items={items} />);
    expect(container).toMatchSnapshot();
  });
});
