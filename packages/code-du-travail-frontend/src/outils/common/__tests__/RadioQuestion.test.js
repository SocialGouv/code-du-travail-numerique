import React from "react";
import { RadioQuestion } from "../RadioQuestion";
import { renderForm } from "../../../../test/renderForm";

const values = {
  foo: "label foo",
  baz: "label baz"
};
const Component = () => (
  <RadioQuestion label="Une question ?" name="foo" options={values} />
);

describe("<RadioQuestion />", () => {
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
      <RadioQuestion
        label="Une question ?"
        name="foo"
        options={values}
        onChange={onChange}
      />
    );
    const { getByLabelText } = renderForm(ComponentWithOnchange, {
      foo: "foo"
    });
    const radio = getByLabelText(/label baz/i);
    radio.click();
    expect(onChange).toHaveBeenCalledWith("baz");
  });
});
