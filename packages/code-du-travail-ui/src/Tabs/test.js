import React from "react";
import { render, fireEvent } from "react-testing-library";
import Tabs from ".";

const items = [
  {
    tab: "tab1",
    panel: "Ce panel peut contenir des nodes",
    key: "une clé"
  },
  {
    tab: "tab2",
    panel: "Ces tabs ne sont pas 'controllés'",
    key: "une autre clé"
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
