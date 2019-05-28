import React from "react";
import { render, fireEvent } from "react-testing-library";
import { StepInfo } from "../Info";
import { Form } from "react-final-form";

function renderForm(data) {
  return render(
    <Form
      validate={StepInfo.validate}
      initialValues={{ ...data }}
      onSubmit={jest.fn()}
    >
      {({ form }) => <StepInfo form={form} />}
    </Form>
  );
}

describe("<StepInfo />", () => {
  it("should render", () => {
    const { container } = renderForm({});
    expect(container).toMatchSnapshot();
  });

  it("should display error if contrat cdd", () => {
    const { container, getByLabelText } = renderForm({ contrat: "cdi" });
    //trigger validation
    const cdd = getByLabelText(/cdd/i);
    fireEvent.click(cdd);
    fireEvent.blur(cdd);
    expect(container.querySelector(".alert")).toMatchSnapshot();
  });

  it("should display error if fauteGrave", () => {
    const { container, getByLabelText } = renderForm({});
    const fauteGrave = getByLabelText(/oui/i);
    fireEvent.click(fauteGrave);
    // blur is need to force validation in react-testing-lib
    fireEvent.blur(fauteGrave);
    expect(container.querySelector(".alert")).toMatchSnapshot();
  });
});
