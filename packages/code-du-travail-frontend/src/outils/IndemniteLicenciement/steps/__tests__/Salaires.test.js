import React from "react";
import arrayMutators from "final-form-arrays";

import { render } from "@wrapped-testing-library/react";
import { StepSalaires, getSalairesPeriods } from "../Salaires";
import { Form } from "react-final-form";

function renderForm(data) {
  return render(
    <Form
      mutators={{ ...arrayMutators }}
      onSubmit={jest.fn()}
      initialValues={{
        ...data
      }}
      render={({ form }) => <StepSalaires form={form} />}
    />
  );
}

describe("<StepSalaires />", () => {
  it("should render same salaire", () => {
    const { container } = renderForm({
      hasSameSalaire: true,
      hasTempsPartiel: false,
      salaire: 3000
    });
    expect(container).toMatchSnapshot();
  });
  it("should render tempsPartiel", () => {
    const { container } = renderForm({
      hasSameSalaire: true,
      salairePeriods: [
        { type: "Temps plein", duration: 24, salary: 2000 },
        { type: "Temps partiel", duration: 12, salary: 1000 }
      ],
      hasTempsPartiel: true
    });
    expect(container).toMatchSnapshot();
  });
  it("should render lastSalaires", () => {
    const salairesPeriods = getSalairesPeriods({
      dateEntree: "2018-04-02",
      dateNotification: "2019-04-05",
      dateSortie: "2019-07-31"
    });
    const { container } = renderForm({
      hasTempsPartiel: false,
      hasSameSalaire: false,
      salaires: salairesPeriods
    });
    expect(container).toMatchSnapshot();
  });
});
