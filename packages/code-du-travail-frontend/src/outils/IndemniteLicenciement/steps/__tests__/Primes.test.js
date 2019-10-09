import React from "react";
import arrayMutators from "final-form-arrays";

import { render } from "../../../../../test/utils";
import { StepPrimes } from "../Primes";
import { Form } from "react-final-form";

function renderForm(data) {
  return render(
    <Form
      mutators={{ ...arrayMutators }}
      onSubmit={jest.fn()}
      initialValues={{
        ...data
      }}
      render={({ form }) => <StepPrimes form={form} />}
    />
  );
}

describe("<StepPrimes />", () => {
  it("should render", () => {
    const { container } = renderForm({
      hasPrimes: true,
      primes: [{ prime: 3000 }]
    });
    expect(container).toMatchSnapshot();
  });
});
