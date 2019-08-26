import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { StepInfosGenerales } from "../InfosGenerales";
import { Form } from "react-final-form";

function renderForm(data) {
  return render(
    <Form
      validate={StepInfosGenerales.validate}
      initialValues={{ ...data }}
      onSubmit={jest.fn()}
    >
      {({ form }) => <StepInfosGenerales form={form} />}
    </Form>
  );
}

describe("<StepInfosGenerales />", () => {
  it("should render", () => {
    const { container } = renderForm({});
    expect(container).toMatchSnapshot();
  });

  it("should render with CDD", () => {
    const { container } = renderForm({ contrat: "cdd" });
    expect(container).toMatchSnapshot();
  });

  it("should render with CTT", () => {
    const { container } = renderForm({ contrat: "ctt" });
    expect(container).toMatchSnapshot();
  });

  it("should display error if contrat cdd and belong to special cases", () => {
    const { getByLabelText, getByText } = renderForm({ contrat: "cdd" });
    //trigger validation
    const specialCase = getByLabelText(/oui/i);
    fireEvent.click(specialCase);
    // blur is need to force validation in react-testing-lib
    fireEvent.blur(specialCase);
    expect(getByText(/ne vous permet pas/i)).toBeTruthy();
  });

  it("should display and error if ctt and contrat is mission-formation", () => {
    const { getByLabelText, getByText } = renderForm({ contrat: "ctt" });
    const missionFormation = getByLabelText(/oui/i);
    fireEvent.click(missionFormation);
    // blur is need to force validation in react-testing-lib
    fireEvent.blur(missionFormation);
    expect(getByText(/ne vous permet pas/i)).toBeTruthy();
  });
  it("should display and info alert if ctt and contrat is not mission-formation", () => {
    const { getByLabelText, getByText } = renderForm({
      contrat: "ctt"
    });
    const missionFormation = getByLabelText(/non/i);
    fireEvent.click(missionFormation);
    // blur is need to force validation in react-testing-lib
    fireEvent.blur(missionFormation);
    expect(getByText(/attention/i)).toBeTruthy();
  });
});
