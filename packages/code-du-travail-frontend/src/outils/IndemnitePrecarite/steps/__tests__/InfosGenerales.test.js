import { fireEvent, render } from "@testing-library/react";
import React from "react";
import { Form } from "react-final-form";

import { CONTRACT_TYPE } from "../../components/TypeContrat";
import { StepInfosGenerales } from "../InfosGenerales";

function renderForm(data) {
  return render(
    <Form
      validate={StepInfosGenerales.validate}
      initialValues={{ ...data }}
      onSubmit={jest.fn()}
    >
      {({ handleSubmit, form }) => (
        <form onSubmit={handleSubmit}>
          <StepInfosGenerales form={form} />
          <button data-testid="nextBt">suivant</button>
        </form>
      )}
    </Form>,
  );
}

describe("<StepInfosGenerales />", () => {
  it("should render", () => {
    const { container } = renderForm({});
    expect(container).toMatchSnapshot();
  });

  it("should render with CDD", () => {
    const { container } = renderForm({
      contractType: CONTRACT_TYPE.CDD,
    });
    expect(container).toMatchSnapshot();
  });

  it("should render with CDD and not handled ccn", () => {
    const { container } = renderForm({
      ccn: { convention: { num: 16 } },
      contractType: CONTRACT_TYPE.CDD,
    });
    expect(container).toMatchSnapshot();
  });

  it("should render with CTT", () => {
    const { container } = renderForm({ contractType: CONTRACT_TYPE.CTT });
    expect(container).toMatchSnapshot();
  });

  it("should display and error if ctt and contrat is mission-formation", () => {
    const { getByTestId, getByText } = renderForm({
      contractType: CONTRACT_TYPE.CTT,
    });
    const missionFormation =
      getByTestId("cttFormation").querySelector(`input[value=true]`);
    fireEvent.click(missionFormation);
    // validate form
    const validateButton = getByTestId("nextBt");
    validateButton.click();
    expect(getByText(/ne permet pas/i)).toBeTruthy();
  });
  it("should display and info alert if ctt and contrat is not mission-formation", () => {
    const { getByTestId, getByText } = renderForm({
      contractType: CONTRACT_TYPE.CTT,
    });
    const missionFormation =
      getByTestId("cttFormation").querySelector(`input[value=false]`);
    fireEvent.click(missionFormation);
    // validate form
    const validateButton = getByTestId("nextBt");
    validateButton.click();
    expect(getByText(/attention/i)).toBeTruthy();
  });
});
