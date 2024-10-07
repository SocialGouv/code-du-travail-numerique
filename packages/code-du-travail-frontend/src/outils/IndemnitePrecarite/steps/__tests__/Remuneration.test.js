import { render } from "@testing-library/react";
import arrayMutators from "final-form-arrays";
import React from "react";
import { Form } from "react-final-form";

import { StepRemuneration } from "../Remuneration";

function renderForm(data) {
  return render(
    <Form
      mutators={{ ...arrayMutators }}
      onSubmit={jest.fn()}
      initialValues={{
        ...data,
      }}
      render={({ form }) => <StepRemuneration form={form} />}
    />,
  );
}

describe("<StepRemuneration />", () => {
  it("should render one input", () => {
    const { container } = renderForm({
      salaire: 3000,
      typeRemuneration: "total",
    });
    expect(container).toMatchSnapshot();
  });
  it("should render multiple inputs", () => {
    const { container } = renderForm({
      salaires: [{ salaire: 2000 }, { salaire: 1500 }],
      typeRemuneration: "mensuel",
    });
    expect(container).toMatchSnapshot();
  });
});
