import React from "react";
import { render } from "@testing-library/react";
import { StepIndemnite } from "../Indemnite";
import { Form } from "react-final-form";
import { CONTRACT_TYPE } from "../../components/TypeContrat";

describe("<StepIndemnite />", () => {
  it("should render cdd indemnite", () => {
    const { container } = render(
      <Form
        initialValues={{
          contractType: CONTRACT_TYPE.CDD,
          criteria: {
            cddType: "Autres"
          },
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
          contractType: CONTRACT_TYPE.CTT,
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
