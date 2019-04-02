import React from "react";
import { cleanup, render, fireEvent } from "react-testing-library";
import Support from ".";

describe("<Support />", () => {
  afterEach(cleanup);
  test("should render Support", () => {
    const { container } = render(<Support onSubmit={jest.fn()} />);
    expect(container).toMatchSnapshot();
  });
  test("it should call onSubmit", () => {
    const handler = jest.fn();
    const { getByPlaceholderText } = render(<Support onSubmit={handler} />);
    const input = getByPlaceholderText(/ex: 12 avenue du Palais, Metz/i);
    fireEvent.change(input, { target: { value: "Avignon" } });
    fireEvent.submit(input.form);
    expect(handler).toHaveBeenCalled();
  });
  test("it should render with custom input", () => {
    const handler = jest.fn();
    const { getByPlaceholderText } = render(
      <Support onSubmit={handler}>
        <input type="search" name="search" placeholder="search place" />
      </Support>
    );
    const input = getByPlaceholderText(/search place/i);
    input.focus();
    fireEvent.change(input, { target: { value: "Paris" } });
    fireEvent.submit(input.form);
    expect(handler).toHaveBeenCalled();
  });
});
