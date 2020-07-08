import { render } from "@testing-library/react";
import arrayMutators from "final-form-arrays";
import React from "react";
import { Form } from "react-final-form";

import { StepPrimes } from "../Primes";

function renderForm(data) {
  return render(
    <Form
      mutators={{ ...arrayMutators }}
      onSubmit={jest.fn()}
      initialValues={{
        ...data,
      }}
      render={({ form }) => <StepPrimes form={form} />}
    />
  );
}

describe("<StepPrimes />", () => {
  it("should render", () => {
    const { container } = renderForm({
      hasPrimes: true,
      primes: [{ prime: 3000 }],
    });
    expect(container).toMatchSnapshot();
  });
});
