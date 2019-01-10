import React from "react";
import { render, fireEvent } from "react-testing-library";
import { FauteGrave } from "../FauteGrave";

describe("<FauteGrave />", () => {
  it("should render", () => {
    const onChange = jest.fn();
    const value = false;
    const { container } = render(
      <FauteGrave value={value} onChange={onChange} />
    );
    expect(container).toMatchSnapshot();
  });

  it("should call onChange", async () => {
    const onChange = jest.fn();
    const value = false;
    const { getByRole } = render(
      <FauteGrave value={value} onChange={onChange} />
    );

    const input = getByRole("checkbox");

    // HACK(lionelb): use mousedown / mouseUp to simulate click on the component
    // since the library doesn't support .click() for test
    fireEvent.mouseDown(input, { clientX: 0 });
    fireEvent.mouseUp(input);

    expect(onChange).toHaveBeenCalledWith(
      true,
      expect.anything(), // param passed by the library but we don't care
      expect.anything() // param passed by the library but we don't care
    );
  });
});
