import React from "react";
import { render } from "react-testing-library";
import { StepIndemnite } from "../Indemnite";
import { Form } from "react-final-form";
import data from "../../__tests__/form.mock.json";

const form = {
  getState: () => data
};

describe("<StepIndemnite />", () => {
  it("should render", () => {
    const onSubmit = jest.fn();
    const { container } = render(
      <Form onSubmit={onSubmit} render={() => <StepIndemnite form={form} />} />
    );
    expect(container).toMatchSnapshot();
  });
});
