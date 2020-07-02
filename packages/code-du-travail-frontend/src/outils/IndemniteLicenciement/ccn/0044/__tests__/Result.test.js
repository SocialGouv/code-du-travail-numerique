import { render } from "@testing-library/react";
import React from "react";
import { Form } from "react-final-form";

import { Result } from "../Result";

const initialValues = {
  anciennete: 2.5,
  branche: "0044",
  contrat: "cdi",
  dataEntree: "2016-06-01",
  dateNotification: "2018-12-01",
  dateSortie: "2019-01-02",
  fauteGrave: false,
  groupe: "I",
  hasAbsenceProlonge: false,
  hasSameSalaire: true,
  hasTempsPartiel: false,
  inaptitude: false,
  salaire: 2000,
};

describe("<Result />", () => {
  it("should render", () => {
    const onSubmit = jest.fn();
    const { container } = render(
      <Form
        initialValues={initialValues}
        onSubmit={onSubmit}
        render={({ form }) => <Result form={form} />}
      />
    );
    expect(container).toMatchSnapshot();
  });
});
