import React from "react";
import { render, fireEvent } from "react-testing-library";
import { Anciennete } from "../Anciennete";

describe("<Anciennete />", () => {
  it("should render", () => {
    const onChange = jest.fn();
    const value = 55;
    const { container } = render(
      <Anciennete value={value} onChange={onChange} />
    );
    expect(container).toMatchSnapshot();
  });
  it("should call onChange with updated value", () => {
    const onChange = jest.fn();
    const value = 12;
    const { container, getByValue } = render(
      <Anciennete value={value} onChange={onChange} />
    );
    const input = getByValue(/12/i);
    fireEvent.change(input, { target: { value: 120 } });
    expect(container).toMatchSnapshot();
    expect(onChange).toBeCalledWith(120);
  });
});
