import React from "react";
import { SelectQuestion } from "../SelectQuestion";
import { renderForm } from "../../../../test/renderForm";
import { fireEvent } from "@wrapped-testing-library/react";

const values = {
  foo: "label foo",
  baz: "label baz"
};
const Component = () => (
  <SelectQuestion label="Une question ?" name="foo" options={values} />
);

describe("<SelectQuestion />", () => {
  it("should render with default value", () => {
    const { container } = renderForm(Component);
    expect(container).toMatchSnapshot();
  });

  it("should render with selectedValue value", () => {
    const { container } = renderForm(Component, { foo: "foo" });
    expect(container).toMatchSnapshot();
  });

  it("should call onChange", () => {
    const onChange = jest.fn();
    const ComponentWithOnchange = () => (
      <SelectQuestion
        label="Une question ?"
        name="foo"
        options={values}
        onChange={onChange}
      />
    );
    const { getByLabelText } = renderForm(ComponentWithOnchange, {
      foo: "foo"
    });
    const select = getByLabelText(/question/i);
    fireEvent.change(select, { target: { value: "baz" } });

    expect(onChange).toHaveBeenCalledWith("baz");
  });
});
