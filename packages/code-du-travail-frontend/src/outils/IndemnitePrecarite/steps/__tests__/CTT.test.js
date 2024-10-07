import { fireEvent, render } from "@testing-library/react";
import React from "react";
import { Form } from "react-final-form";

import { StepCTT } from "../CTT";

function renderForm() {
  return render(
    <Form validate={StepCTT.validate} onSubmit={jest.fn()}>
      {({ handleSubmit, form }) => (
        <form onSubmit={handleSubmit}>
          <StepCTT form={form} />
          <button data-testid="nextBt">suivant</button>
        </form>
      )}
    </Form>,
  );
}

const testQuestions = [
  ["ruptureContratFauteGrave", true],
  ["propositionCDIFinContrat", true],
  ["refusSouplesse", true],
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
      // validate form
      const validateButton = getByTestId("nextBt");
      validateButton.click();
      expect(getByText(/pas le droit à une prime/i)).toBeTruthy();
    },
  );
});
