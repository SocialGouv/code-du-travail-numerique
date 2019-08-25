import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Tabs from ".";

const items = [
  {
    tab: "Tab 1",
    panel: "This panel can contain nodes"
  },
  {
    tab: "Tab 2",
    panel: "These tabs are not 'controlled'"
  }
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
