import { render } from "@testing-library/react";
import arrayMutators from "final-form-arrays";
import React from "react";
import { Form } from "react-final-form";

import { getSalairesPeriods, StepSalaires } from "../Salaires";

function renderForm(data) {
  return render(
    <Form
      mutators={{ ...arrayMutators }}
      onSubmit={jest.fn()}
      initialValues={{
        ...data,
      }}
      render={({ form }) => <StepSalaires form={form} />}
    />
  );
}

describe("<StepSalaires />", () => {
  it("should render same salaire", () => {
    const { container } = renderForm({
      hasSameSalaire: true,
      salaire: 3000,
    });
    expect(container).toMatchSnapshot();
  });
  it("should render lastSalaires", () => {
    const salairesPeriods = getSalairesPeriods({
      dateEntree: "2018-04-02",
      dateNotification: "2019-04-05",
      dateSortie: "2019-07-31",
    });
    const { container } = renderForm({
      hasSameSalaire: false,
      salaires: salairesPeriods,
    });
    expect(container).toMatchSnapshot();
  });
});
