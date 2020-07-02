import { render } from "@testing-library/react";
import React from "react";
import { Form } from "react-final-form";

import { Step } from "../Step";

describe("<Step />", () => {
  it("should render", () => {
    const onSubmit = jest.fn();
    const { container } = render(
      <Form onSubmit={onSubmit}>{({ form }) => <Step form={form} />}</Form>
    );
    expect(container).toMatchSnapshot();
  });
});
