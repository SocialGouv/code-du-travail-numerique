import React from "react";
import { render } from "../../../../../../test/utils";
import Result from "../Result";
import { Form } from "react-final-form";

const initialValues = {
  salaires: Array.from({ length: 12 }).fill({ salary: 2000 }),
  hasTempsPartiel: false,
  anciennete: 5,
  age: 55,
  groupe: "I",
  branche: "3043"
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
