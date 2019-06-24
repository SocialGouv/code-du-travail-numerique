import React from "react";
import { render } from "react-testing-library";
import Result_0044 from "../Result_0044";
import { Form } from "react-final-form";

const initialValues = {
  contrat: "cdi",
  fauteGrave: false,
  inaptitude: false,
  hasAbsenceProlonge: false,
  hasTempsPartiel: false,
  hasSameSalaire: true,
  salaire: 2000,
  dataEntree: "2016-06-01",
  dateSortie: "2019-01-02",
  dateNotification: "2018-12-01",
  anciennete: 2.5,
  branche: "0044",
  groupe: "I"
};

describe("<Result_0044 />", () => {
  it("should render", () => {
    const onSubmit = jest.fn();
    const { container } = render(
      <Form
        initialValues={initialValues}
        onSubmit={onSubmit}
        render={({ form }) => <Result_0044 form={form} />}
      />
    );
    expect(container).toMatchSnapshot();
  });
});
