import React from "react";
import { render } from "@wrapped-testing-library/react";
import { StepIndemnite } from "../Indemnite";
import { Form } from "react-final-form";

const initialValues = {
  hasTempsPartiel: false,
  salaires: Array.from({ length: 12 }).fill({ salary: 2000 }),
  anciennete: 15 / 12,
  dateNotification: "2018-10-22",
  inaptitude: true
};

describe("<StepIndemnite />", () => {
  it("should render", () => {
    const onSubmit = jest.fn();
    const { container } = render(
      <Form
        initialValues={initialValues}
        onSubmit={onSubmit}
        render={({ form }) => <StepIndemnite form={form} />}
      />
    );
    expect(container).toMatchSnapshot();
  });
});
