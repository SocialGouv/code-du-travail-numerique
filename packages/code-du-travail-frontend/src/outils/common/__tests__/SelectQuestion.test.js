import { fireEvent } from "@testing-library/react";
import React from "react";

import { renderForm } from "../../../../test/renderForm";
import { SelectQuestion } from "../SelectQuestion";

const values = {
  baz: "label baz",
  foo: "label foo",
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
});
