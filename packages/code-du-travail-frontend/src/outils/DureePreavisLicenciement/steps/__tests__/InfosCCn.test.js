import React from "react";
import { render } from "@testing-library/react";
import { StepInfoCCn } from "../InfosCCn";
import { Form } from "react-final-form";

jest.mock("use-persisted-state", () => {
  const hookResult = [{ convention: { num: "3109" } }];
  return () => jest.fn().mockImplementation(() => hookResult);
});

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
  it("should render cdd infos step", () => {
    const { container } = renderForm({
      cdt: { ancienneté: "31| 6 mois à moins de 2 ans" }
    });
    expect(container).toMatchSnapshot();
  });
});
