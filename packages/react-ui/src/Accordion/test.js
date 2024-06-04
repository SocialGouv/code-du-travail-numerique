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
    const { container, getByText } = render(
      <Accordion titleLevel={2} items={items} />
    );
    expect(container).toMatchSnapshot();
    expect(getByText("This is the title").tagName).toEqual("H2");
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
  it("do not render heading if titleLevel > 6", () => {
    const items = [
      {
        body: "Body",
        title: "Ceci est un titre",
        variant: "hierarchy",
      },
    ];
    const { getByText } = render(<Accordion titleLevel={7} items={items} />);
    expect(getByText("Ceci est un titre").tagName).toEqual("P");
  });
  it("do not throw error if preExpended attribut is an invalid query selector", () => {
    const items = [{ body: "this is the body", title: "This is the title" }];
    const { container } = render(
      <Accordion
        titleLevel={3}
        preExpanded={["#:~:text=Le droit du travail est"]}
        items={items}
      />
    );
    expect(container).toMatchSnapshot();
  });
});
