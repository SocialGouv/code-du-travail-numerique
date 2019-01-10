import React from "react";
import { render, fireEvent } from "react-testing-library";
import { SalaireTempsPlein } from "../SalaireTempsPlein";

describe("<SalaireTempsPlein />", () => {
  it("should render", () => {
    const onChange = jest.fn();
    const value = {
      isPartiel: false,
      derniersMois: [1500, 1500, 1500, 1500]
    };
    const { container } = render(
      <SalaireTempsPlein value={value} onChange={onChange} />
    );
    expect(container).toMatchSnapshot();
  });
  it("should update all monthes", () => {
    const onChange = jest.fn();
    const value = {
      isPartiel: false,
      derniersMois: [0, 0, 0, 0]
    };
    const { container, getByValue } = render(
      <SalaireTempsPlein value={value} onChange={onChange} />
    );
    const input = getByValue(/0/);
    fireEvent.change(input, { target: { value: 2000 } });
    fireEvent.blur(input);
    expect(container).toMatchSnapshot();
  });

  it("should call onChange", () => {
    const onChange = jest.fn();
    const value = {
      isPartiel: false,
      derniersMois: [0, 0, 0, 0]
    };
    const { getByValue } = render(
      <SalaireTempsPlein value={value} onChange={onChange} />
    );
    const input = getByValue(/0/);
    fireEvent.change(input, { target: { value: 2000 } });
    fireEvent.blur(input);
    expect(onChange).toHaveBeenCalledWith({
      ...value,
      derniersMois: [2000, 2000, 2000, 2000]
    });
  });
});
