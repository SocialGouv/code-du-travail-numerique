import React from "react";
import { render, fireEvent } from "react-testing-library";
import { Inaptitude } from "../Inaptitude";

describe("<Inaptitude />", () => {
  it("should render", () => {
    const onChange = jest.fn();
    const value = false;
    const { container } = render(
      <Inaptitude value={value} onChange={onChange} />
    );
    expect(container).toMatchSnapshot();
  });

  it("should call onChange", () => {
    const onChange = jest.fn();
    const value = false;
    const { getByLabelText } = render(
      <Inaptitude value={value} onChange={onChange} />
    );

    const input = getByLabelText(/oui/i);
    fireEvent.click(input);

    expect(onChange).toBeCalledWith(true);
  });
});
