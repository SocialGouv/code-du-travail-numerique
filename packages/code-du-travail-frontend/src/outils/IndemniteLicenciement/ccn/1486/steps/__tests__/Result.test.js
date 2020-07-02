import { render } from "@testing-library/react";
import React from "react";
import { Form } from "react-final-form";

import { Result } from "../Result";

describe("<Result />", () => {
  it("renders legal indemnite", () => {
    const onSubmit = jest.fn();
    const initialValues = {
      anciennete: 13.083333333333334,
      branche: "1486",
      brancheCategorie: "IC",
      brancheNewRegularSalaire: "2000",
      hasAbsenceProlonge: false,
      hasBrancheContrat: false,
      hasBrancheNewRegularSalaire: true,
      hasBrancheNewSalaire: true,
      hasSameSalaire: true,
      hasTempsPartiel: false,
      salaire: "4500",
    };
    const { container } = render(
      <Form onSubmit={onSubmit} initialValues={initialValues}>
        {({ form }) => <Result form={form} />}
      </Form>
    );
    expect(container).toMatchSnapshot();
  });
  it("renders conventionnal indemnite with warning toast", () => {
    const onSubmit = jest.fn();
    const initialValues = {
      anciennete: 13.083333333333334,
      branche: "1486",
      brancheCategorie: "IC",
      brancheNewRegularSalaire: "4000",
      hasAbsenceProlonge: false,
      hasBrancheContrat: false,
      hasBrancheNewRegularSalaire: true,
      hasBrancheNewSalaire: true,
      hasSameSalaire: true,
      hasTempsPartiel: false,
      salaire: "4500",
    };
    const { container } = render(
      <Form onSubmit={onSubmit} initialValues={initialValues}>
        {({ form }) => <Result form={form} />}
      </Form>
    );
    expect(container).toMatchSnapshot();
  });
});
