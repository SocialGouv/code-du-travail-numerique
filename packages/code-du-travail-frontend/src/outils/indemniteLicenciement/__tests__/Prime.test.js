import React from "react";
import { render, fireEvent } from "react-testing-library";
import { Primes } from "../Prime";

describe("<Primes />", () => {
  it("should render", () => {
    const onChange = jest.fn();
    const value = 0;
    const { container } = render(<Primes value={value} onChange={onChange} />);
    expect(container).toMatchSnapshot();
  });
  it("should call onChange with updated value", () => {
    const onChange = jest.fn();
    const value = 0;
    const { container, getByValue } = render(
      <Primes value={value} onChange={onChange} />
    );
    const input = getByValue(/0/i);
    fireEvent.change(input, { target: { value: 2000 } });
    expect(container).toMatchSnapshot();
    expect(onChange).toBeCalledWith(2000);
  });
});
