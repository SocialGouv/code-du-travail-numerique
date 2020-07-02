import { render } from "@testing-library/react";
import React from "react";
import { Form } from "react-final-form";

import { CADRE } from "../Categorie";
import { Result } from "../Result";

const initialValues = {
  absencePeriods: [],
  age: "64",
  anciennete: 10.58,
  branche: "0016",
  cadreDuration: "120",
  categorie: CADRE,
  contrat: "cdi",
  dateEntree: "2009-01-06",
  dateNotification: "2019-06-03",
  dateSortie: "2019-09-02",
  fauteGrave: false,
  hasAbsenceProlonge: false,
  hasRetirementAge: true,
  hasSameSalaire: true,
  hasTempsPartiel: false,
  inaptitude: false,
  salaire: "2000",
  salairePeriods: [],
  salaires: [],
  tamDuration: "5",
};
describe("<Result />", () => {
  it("should render", () => {
    const onSubmit = jest.fn();
    const { container } = render(
      <Form onSubmit={onSubmit} initialValues={initialValues}>
        {({ form }) => <Result form={form} />}
      </Form>
    );
    expect(container).toMatchSnapshot();
  });
});
