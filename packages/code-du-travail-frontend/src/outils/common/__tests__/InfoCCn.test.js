import { render } from "@testing-library/react";
import React from "react";
import { Form } from "react-final-form";

import { StepInfoCCnMandatory, StepInfoCCnOptionnal } from "../InfosCCn";

function renderForm(data, Step, submit) {
  return render(
    <Form
      validate={StepInfoCCnMandatory.validate}
      initialValues={{ ...data }}
      onSubmit={submit}
    >
      {({ form, handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <Step form={form} />
          <button>Submit</button>
        </form>
      )}
    </Form>
  );
}

describe("<StepInfoCCnOptionnal />", () => {
  it("should render optionnal step", () => {
    const submitFn = jest.fn();
    const { container, getByText } = renderForm(
      {},
      StepInfoCCnOptionnal,
      submitFn
    );
    expect(container).toMatchSnapshot();
    getByText("Submit").click();
    expect(submitFn).toHaveBeenCalled();
  });
  it("should render mandatory step", () => {
    const submitFn = jest.fn();
    const { container, getByText } = renderForm(
      {},
      StepInfoCCnMandatory,
      submitFn
    );
    expect(container).toMatchSnapshot();
    getByText("Submit").click();
    expect(getByText(/Vous devez répondre à cette question/i)).toBeDefined();
    expect(submitFn).not.toHaveBeenCalled();
  });
});
