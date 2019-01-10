import React from "react";
import { render } from "react-testing-library";
import { SimpleSwitch } from "../SimpleSwitch";

describe("<SimpleSwitch />", () => {
  it("should render checked", () => {
    const onChange = jest.fn();
    const { container } = render(
      <SimpleSwitch id="id" label="switch label" onChange={onChange} checked />
    );
    expect(container).toMatchSnapshot();
  });
  it("should render unchecked", () => {
    const onChange = jest.fn();
    const { container } = render(
      <SimpleSwitch id="id" label="switch label" onChange={onChange} />
    );
    expect(container).toMatchSnapshot();
  });
});
