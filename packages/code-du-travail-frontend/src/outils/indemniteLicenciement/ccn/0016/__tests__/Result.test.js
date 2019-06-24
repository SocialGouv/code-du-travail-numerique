import React from "react";
import { render } from "react-testing-library";
import { Result } from "../Result";
import { Form } from "react-final-form";
import { CADRE } from "../Categorie";

const initialValues = {
  contrat: "cdi",
  fauteGrave: false,
  inaptitude: false,
  dateEntree: "2009-01-06",
  anciennete: 10.58,
  dateNotification: "2019-06-03",
  dateSortie: "2019-09-02",
  hasAbsenceProlonge: false,
  absencePeriods: [],
  hasTempsPartiel: false,
  salairePeriods: [],
  hasSameSalaire: true,
  salaires: [],
  salaire: "2000",
  branche: "0016",
  categorie: CADRE,
  tamDuration: "5",
  cadreDuration: "120",
  age: "64",
  hasRetirementAge: true
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
