import React from "react";
import { render } from "@wrapped-testing-library/react";
import { Result } from "../Result";
import { Form } from "react-final-form";
import { CADRE, ECONOMIQUE } from "../Step";

const initialValues = {
  salaires: Array.from({ length: 12 }).fill({ salary: 2000 }),
  hasTempsPartiel: false,
  dateEntree: "1999-01-01",
  dateSortie: "2019-09-01",
  anciennete: 20.667,
  motif: ECONOMIQUE,
  categorie: CADRE,
  branche: "2120",
  age: "55"
};

describe("<Result />", () => {
  it("should render", () => {
    const onSubmit = jest.fn();
    const { container } = render(
      <Form initialValues={initialValues} onSubmit={onSubmit}>
        {({ form }) => <Result form={form} />}
      </Form>
    );
    expect(container).toMatchSnapshot();
  });
});
