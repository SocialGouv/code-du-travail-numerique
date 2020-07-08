import { render } from "@testing-library/react";
import React from "react";
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
      brancheContrat: {
        considered: false,
        duration: "3",
        indemnite: "0",
      },
      hasBrancheContrat: true,
    };
    const { container } = render(
      <Form onSubmit={onSubmit} initialValues={initialValues}>
        {({ form }) => <AncienneteETAMIC form={form} />}
      </Form>
    );
    expect(container).toMatchSnapshot();
  });
});
