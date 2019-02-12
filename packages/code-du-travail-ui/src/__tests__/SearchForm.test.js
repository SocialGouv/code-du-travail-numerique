import React from "react";
import { render, fireEvent } from "react-testing-library";
import SearchForm from "../SearchForm";

describe("<SearchForm />", () => {
  test("should render", () => {
    const { container } = render(
      <SearchForm
        placeholder="Poser votre question"
        value="démission"
        onSubmit={jest.fn()}
      />
    );
    expect(container).toMatchSnapshot();
  });

  test("should call onSubmit", () => {
    const handler = jest.fn();
    const { getByPlaceholderText } = render(
      <SearchForm
        placeholder="Poser votre question"
        value="démission"
        onSubmit={handler}
      />
    );
    const input = getByPlaceholderText(/poser votre question/i);
    input.focus();
    fireEvent.change(input, { target: { value: "hello" } });
    fireEvent.keyDown(input, { key: "Enter", code: "Enter" });
    expect(handler).toBeCalledWith("hello");
  });
});
