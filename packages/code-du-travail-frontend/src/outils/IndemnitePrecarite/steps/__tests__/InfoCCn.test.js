import React from "react";
import { render } from "@testing-library/react";
import { StepInfoCCn } from "../../../common/InfosCCn";
import { Form } from "react-final-form";

function renderForm(data) {
  return render(
    <Form
      validate={StepInfoCCn.validate}
      initialValues={{ ...data }}
      onSubmit={jest.fn()}
    >
      {({ form }) => <StepInfoCCn form={form} />}
    </Form>
  );
}

describe("<StepInfoCCn />", () => {
  it("should render cdd infos step", () => {
    const { container } = renderForm();
    expect(container).toMatchSnapshot();
  });
});
