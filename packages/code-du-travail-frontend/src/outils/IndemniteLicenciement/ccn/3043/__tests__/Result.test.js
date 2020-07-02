import { render } from "@testing-library/react";
import React from "react";
import { Form } from "react-final-form";

import Result from "../Result";

const initialValues = {
  age: 55,
  anciennete: 5,
  branche: "3043",
  groupe: "I",
  hasTempsPartiel: false,
  salaires: Array.from({ length: 12 }).fill({ salary: 2000 }),
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
