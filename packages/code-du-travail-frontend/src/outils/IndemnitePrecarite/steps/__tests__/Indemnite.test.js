import React from "react";
import { render } from "@wrapped-testing-library/react";
import { StepIndemnite } from "../Indemnite";
import { Form } from "react-final-form";

describe("<StepIndemnite />", () => {
  it("should render cdd indemnite", () => {
    const { container } = render(
      <Form
        initialValues={{
          contrat: "cdd",
          typeRemuneration: "mensuel",
          salaires: Array.from({ length: 10 }).fill({ salaire: 2000 })
        }}
        onSubmit={jest.fn()}
        render={({ form }) => <StepIndemnite form={form} />}
      />
    );
    expect(container).toMatchSnapshot();
  });
  it("should render ctt indemnite", () => {
    const { container } = render(
      <Form
        initialValues={{
          contrat: "ctt",
          typeRemuneration: "total",
          salaire: 3000
        }}
        onSubmit={jest.fn()}
        render={({ form }) => <StepIndemnite form={form} />}
      />
    );
    expect(container).toMatchSnapshot();
  });
});
