import React from "react";
import { render, fireEvent } from "react-testing-library";
import { Age } from "../Age";

describe("<Age />", () => {
  it("should render", () => {
    const onChange = jest.fn();
    const value = 55;
    const { container } = render(<Age value={value} onChange={onChange} />);
    expect(container).toMatchSnapshot();
  });
  it("should call onChange with updated value", () => {
    const onChange = jest.fn();
    const value = 55;
    const { container, getByValue } = render(
      <Age value={value} onChange={onChange} />
    );
    const input = getByValue(/55/i);
    fireEvent.change(input, { target: { value: 50 } });
    expect(container).toMatchSnapshot();
    expect(onChange).toBeCalledWith(50);
  });
});
