import React from "react";
import { render, fireEvent } from "react-testing-library";
import { StepCDD } from "../CDD";
import { Form } from "react-final-form";

function renderForm() {
  return render(
    <Form validate={StepCDD.validate} onSubmit={jest.fn()}>
      {({ form }) => <StepCDD form={form} />}
    </Form>
  );
}

const testQuestions = [
  ["finContratPeriodeDessai", true],
  ["propositionCDIFindeContrat", false],
  ["refusCDIFindeContrat", true],
  ["interruptionFauteGrave", true],
  ["refusRenouvellementAuto", true]
];

describe("<StepCDD />", () => {
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
      expect(getByText(/pas le droit à une indemnité/i)).toBeTruthy();
    }
  );
});
