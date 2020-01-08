import React from "react";
import { render } from "@testing-library/react";
import { StepInfoCCn } from "../InfosCCn";
import { Form } from "react-final-form";

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
      JSON.stringify({ convention: { num: 3109 }, label: "ccn des 5 mondes" })
    );
    const { container } = renderForm({
      cdt: { ancienneté: "31| 6 mois à moins de 2 ans" }
    });
    expect(container).toMatchSnapshot();
  });
});
