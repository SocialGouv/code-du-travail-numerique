import React from "react";
import { render } from "react-testing-library";
import Result from "../Result";
import { Form } from "react-final-form";

const form = {
  getState: () => ({
    values: {
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
      groupe: "I",
      branche: "3043"
    }
  })
};

describe("<Result />", () => {
  it("should render", () => {
    const onSubmit = jest.fn();
    const { container } = render(
      <Form onSubmit={onSubmit} render={() => <Result form={form} />} />
    );
    expect(container).toMatchSnapshot();
  });
});
