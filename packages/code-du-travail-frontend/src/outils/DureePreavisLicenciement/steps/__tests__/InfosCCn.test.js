import { render } from "@testing-library/react";
import React from "react";
import { Form } from "react-final-form";

import { StepInfoCCn } from "../InfosCCn";

function renderForm(data) {
  return render(
    <Form
      validate={StepInfoCCn.validate}
      initialValues={{ ...data }}
      onSubmit={jest.fn()}
    >
      {({ form }) => (
        <>
          <StepInfoCCn form={form} />
          <button type="submit" data-testid="submit-test">
            Submit
          </button>
        </>
      )}
    </Form>
  );
}

describe("<StepInfoCCn />", () => {
  it("should render CC infos step", () => {
    localStorage.setItem(
      "convention",
      JSON.stringify({
        num: 3109,
        shortTitle: "ccn des 5 mondes",
      })
    );
    const { container } = renderForm({
      cdt: { ancienneté: "31| 6 mois à moins de 2 ans" },
    });
    expect(container).toMatchSnapshot();
  });
});
