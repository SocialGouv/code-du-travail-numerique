import React from "react";
import { render } from "@testing-library/react";
import { Accordion } from ".";

const items = [{ title: "This is the title", body: "this is the body" }];

describe("<Accordion />", () => {
  test("should render", () => {
    const { container } = render(<Accordion items={items} />);
    expect(container).toMatchSnapshot();
  });
});
