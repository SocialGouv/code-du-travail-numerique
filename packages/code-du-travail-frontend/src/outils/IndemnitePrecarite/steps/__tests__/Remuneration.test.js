import React from "react";
import arrayMutators from "final-form-arrays";

import { render } from "@wrapped-testing-library/react";
import { StepRemuneration } from "../Remuneration";
import { Form } from "react-final-form";

function renderForm(data) {
  return render(
    <Form
      mutators={{ ...arrayMutators }}
      onSubmit={jest.fn()}
      initialValues={{
        ...data
      }}
      render={({ form }) => <StepRemuneration form={form} />}
    />
  );
}

describe("<StepRemuneration />", () => {
  it("should render one input", () => {
    const { container } = renderForm({
      typeRemuneration: "total",
      salaire: 3000
    });
    expect(container).toMatchSnapshot();
  });
  it("should render multiple inputs", () => {
    const { container } = renderForm({
      typeRemuneration: "mensuel",
      salaires: [{ salaire: 2000 }, { salaire: 1500 }]
    });
    expect(container).toMatchSnapshot();
  });
});
