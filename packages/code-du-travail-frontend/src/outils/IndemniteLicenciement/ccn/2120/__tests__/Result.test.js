import { render } from "@testing-library/react";
import React from "react";
import { Form } from "react-final-form";

import { Result } from "../Result";
import { CADRE, ECONOMIQUE } from "../Step";

const initialValues = {
  age: "55",
  anciennete: 20.667,
  branche: "2120",
  categorie: CADRE,
  dateEntree: "1999-01-01",
  dateSortie: "2019-09-01",
  hasTempsPartiel: false,
  motif: ECONOMIQUE,
  salaires: Array.from({ length: 12 }).fill({ salary: 2000 }),
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
