import React from "react";
import { render, fireEvent } from "react-testing-library";
import { StepCTT } from "../CTT";
import { Form } from "react-final-form";

function renderForm() {
  return render(
    <Form validate={StepCTT.validate} onSubmit={jest.fn()}>
      {({ form }) => <StepCTT form={form} />}
    </Form>
  );
}

const testQuestions = [
  ["ruptureContratFauteGrave", true],
  ["propositionCDIFinContrat", true],
  ["refusSouplesse", true]
];

describe("<StepCTT />", () => {
  it("should render", () => {
    const { container } = renderForm();
    expect(container).toMatchSnapshot();
  });

  test.each(testQuestions)(
    "should render error when %s is %s",
    (key, value) => {
      const { getByText, getByTestId } = renderForm();
      const radio = getByTestId(key).querySelector(`input[value=${value}]`);
      fireEvent.click(radio);
      // blur is need to force validation in react-testing-lib
      fireEvent.blur(radio);
      expect(getByText(/pas le droit à une prime/i)).toBeTruthy();
    }
  );
});
