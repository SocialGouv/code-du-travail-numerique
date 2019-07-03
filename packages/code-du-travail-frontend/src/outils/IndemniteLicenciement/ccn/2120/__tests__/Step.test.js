import React from "react";
import { render } from "react-testing-library";
import { Step } from "../Step";
import { Form } from "react-final-form";

describe("<Step />", () => {
  it("should render", () => {
    const onSubmit = jest.fn();
    const { container } = render(
      <Form onSubmit={onSubmit}>{({ form }) => <Step form={form} />}</Form>
    );
    expect(container).toMatchSnapshot();
  });
});
