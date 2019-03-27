import React from "react";
import { render } from "react-testing-library";
import Accordion from "../Accordion";

const items = [{ title: "This is the title", body: "this is the body" }];

describe("<Accordion />", () => {
  test("should render", () => {
    const { container } = render(<Accordion items={items} />);
    expect(container).toMatchSnapshot();
  });
});
