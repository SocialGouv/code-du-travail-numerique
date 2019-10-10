import React from "react";
import { render } from "@wrapped-testing-library/react";
import { Form } from "react-final-form";
import { Result } from "../Result";

describe("<Result />", () => {
  it("renders legal indemnite", () => {
    const onSubmit = jest.fn();
    const initialValues = {
      anciennete: 13.083333333333334,
      hasAbsenceProlonge: false,
      hasTempsPartiel: false,
      hasSameSalaire: true,
      salaire: "4500",
      branche: "1486",
      brancheCategorie: "IC",
      hasBrancheContrat: false,
      hasBrancheNewSalaire: true,
      hasBrancheNewRegularSalaire: true,
      brancheNewRegularSalaire: "2000"
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
      hasAbsenceProlonge: false,
      hasTempsPartiel: false,
      hasSameSalaire: true,
      salaire: "4500",
      branche: "1486",
      brancheCategorie: "IC",
      hasBrancheContrat: false,
      hasBrancheNewSalaire: true,
      hasBrancheNewRegularSalaire: true,
      brancheNewRegularSalaire: "4000"
    };
    const { container } = render(
      <Form onSubmit={onSubmit} initialValues={initialValues}>
        {({ form }) => <Result form={form} />}
      </Form>
    );
    expect(container).toMatchSnapshot();
  });
});
