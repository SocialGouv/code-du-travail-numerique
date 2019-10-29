import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { StepInfo } from "../Info";
import { Form } from "react-final-form";

function renderForm(data) {
  return render(
    <Form
      validate={StepInfo.validate}
      initialValues={{ ...data }}
      onSubmit={jest.fn()}
    >
      {({ form, handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <StepInfo form={form} />
          <button data-testid="nextBt">suivant</button>
        </form>
      )}
    </Form>
  );
}

describe("<StepInfo />", () => {
  it("should render", () => {
    const { container } = renderForm({});
    expect(container).toMatchSnapshot();
  });

  it("should display error if contrat cdd", () => {
    const { getByLabelText, getByTestId, getByText } = renderForm({
      contrat: "cdi"
    });
    //trigger validation
    const cdd = getByLabelText(/cdd/i);
    fireEvent.click(cdd);
    const nextBt = getByTestId("nextBt");
    nextBt.click();
    expect(getByText(/vous ne pouvez pas/i)).toMatchSnapshot();
  });

  it("should display error if fauteGrave", () => {
    const { getAllByLabelText, getByTestId, getByText } = renderForm({});
    const [fauteGrave] = getAllByLabelText(/oui/i);
    fireEvent.click(fauteGrave);
    const nextBt = getByTestId("nextBt");
    nextBt.click();
    expect(getByText(/n’est pas dûe/i)).toMatchSnapshot();
  });
});
