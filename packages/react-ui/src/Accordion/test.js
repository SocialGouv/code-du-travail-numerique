import React from "react";
import { render } from "@testing-library/react";
import { Accordion } from ".";

describe("<Accordion />", () => {
  test("should render", () => {
    const items = [
      { title: <h3>This is the title</h3>, body: "this is the body" }
    ];
    const { container } = render(<Accordion items={items} />);
    expect(container).toMatchSnapshot();
  });
  test("should render as h2", () => {
    const items = [
      { title: <h2>This is the title</h2>, body: "this is the body" }
    ];
    const { container } = render(<Accordion items={items} />);
    expect(container).toMatchSnapshot();
  });
});
