import React from "react";
import { render, fireEvent } from "react-testing-library";
import { DateFinContrat } from "../DateFinContrat";

describe("<DateFinContrat />", () => {
  it("should render", () => {
    const onChange = jest.fn();
    const value = false;
    const { container } = render(
      <DateFinContrat value={value} onChange={onChange} />
    );
    expect(container).toMatchSnapshot();
  });

  it("should call onChange", () => {
    const onChange = jest.fn();
    const value = false;
    const { getByLabelText } = render(
      <DateFinContrat value={value} onChange={onChange} />
    );

    const input = getByLabelText(/oui/i);
    fireEvent.click(input);

    expect(onChange).toBeCalledWith(true);
  });
});
