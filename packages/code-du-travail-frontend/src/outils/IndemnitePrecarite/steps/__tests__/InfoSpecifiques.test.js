import React from "react";
import { render } from "@wrapped-testing-library/react";
import { StepInfosSpecifiques } from "../InfosSpecifiques";
import { Form } from "react-final-form";

function renderForm(data) {
  return render(
    <Form
      validate={StepInfosSpecifiques.validate}
      initialValues={{ ...data }}
      onSubmit={jest.fn()}
    >
      {({ form }) => <StepInfosSpecifiques form={form} />}
    </Form>
  );
}

describe("<StepInfosSpecifiques />", () => {
  it("should render cdd infos step", () => {
    const { container } = renderForm({ contrat: "cdd" });
    expect(container).toMatchSnapshot();
  });
  it("should render ctt infos step", () => {
    const { container } = renderForm({ contrat: "ctt" });
    expect(container).toMatchSnapshot();
  });
});
