import React from "react";
import { render } from "@wrapped-testing-library/react";
import { Form } from "react-final-form";
import { AncienneteETAMIC } from "../AncienneteETAMIC.js";

describe("<AncienneteETAMIC />", () => {
  it("renders", () => {
    const onSubmit = jest.fn();
    const { container } = render(
      <Form onSubmit={onSubmit}>
        {({ form }) => <AncienneteETAMIC form={form} />}
      </Form>
    );
    expect(container).toMatchSnapshot();
  });
  it("asks to fill duration, indemnité and consideration", () => {
    const onSubmit = jest.fn();
    const initialValues = {
      hasBrancheContrat: true,
      brancheContrat: {
        duration: "3",
        indemnite: "0",
        considered: false
      }
    };
    const { container } = render(
      <Form onSubmit={onSubmit} initialValues={initialValues}>
        {({ form }) => <AncienneteETAMIC form={form} />}
      </Form>
    );
    expect(container).toMatchSnapshot();
  });
});
