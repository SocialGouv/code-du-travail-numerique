import React from "react";
import { render, fireEvent } from "../../../../../test/utils";
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
    const { getByLabelText, getByText } = renderForm({
      contrat: "cdi"
    });
    //trigger validation
    const cdd = getByLabelText(/cdd/i);
    fireEvent.click(cdd);
    fireEvent.blur(cdd);
    expect(getByText(/vous ne pouvez pas/i)).toMatchSnapshot();
  });

  it("should display error if fauteGrave", () => {
    const { getAllByLabelText, getByText } = renderForm({});
    const [fauteGrave] = getAllByLabelText(/oui/i);
    fireEvent.click(fauteGrave);
    // blur is need to force validation in react-testing-lib
    fireEvent.blur(fauteGrave);
    expect(getByText(/n’est pas dûe/i)).toMatchSnapshot();
  });
});
