import React from "react";
import { render } from "@testing-library/react";
import { Custom } from "../icons";
import { Accordion } from ".";

describe("<Accordion />", () => {
  it("renders", () => {
    const items = [
      { title: <h3>This is the title</h3>, body: "this is the body" },
    ];
    const { container } = render(<Accordion items={items} />);
    expect(container).toMatchSnapshot();
  });
  it("renders as h2", () => {
    const items = [
      { title: <h2>This is the title</h2>, body: "this is the body" },
    ];
    const { container } = render(<Accordion items={items} />);
    expect(container).toMatchSnapshot();
  });
  it("renders as a tile accordion with an icon", () => {
    const items = [
      { title: <span>This is the title</span>, body: "this is the body" },
    ];
    const { container } = render(<Accordion items={items} />);
    expect(container).toMatchSnapshot();
  });
  it("renders as a hierarchy accordion with an icon", () => {
    const items = [
      {
        variant: "hierarchy",
        title: <span>This is the title</span>,
        icon: Custom,
        body: "this is the body",
      },
    ];
    const { container } = render(<Accordion items={items} />);
    expect(container).toMatchSnapshot();
  });
});
