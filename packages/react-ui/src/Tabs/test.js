import { fireEvent, render } from "@testing-library/react";
import React from "react";

import { Tabs } from "./index.js";

const items = [
  {
    panel: "This panel can contain nodes",
    tab: "Tab 1",
  },
  {
    panel: "These tabs are not 'controlled'",
    tab: "Tab 2",
  },
];

describe("<Tabs />", () => {
  it("renders", () => {
    const { container } = render(<Tabs data={items} />);
    expect(container).toMatchSnapshot();
  });
  it("calls the right onSelect callback", () => {
    const onSelect = jest.fn();
    const { container } = render(<Tabs onSelect={onSelect} data={items} />);
    const secondTab = container.querySelectorAll("li")[1];
    fireEvent.click(secondTab);
    expect(onSelect).toHaveBeenCalledTimes(1);
  });
});
