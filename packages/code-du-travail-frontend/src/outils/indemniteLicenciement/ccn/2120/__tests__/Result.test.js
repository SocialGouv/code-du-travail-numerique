import React from "react";
import { render } from "react-testing-library";
import { Result } from "../Result";
import { Form } from "react-final-form";

const initialValues = {
  branche: "2120"
};

describe("<Result />", () => {
  it("should render", () => {
    const onSubmit = jest.fn();
    const { container } = render(
      <Form initialValues={initialValues} onSubmit={onSubmit}>
        {({ form }) => <Result form={form} />}
      </Form>
    );
    expect(container).toMatchSnapshot();
  });
});
