import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { Form } from "react-final-form";

import { generateAgreement } from "../../../../test/generateAgreement";
import { EmbeddedInjectedForm } from "../../../../test/TestForm";
import { MatomoActionEvent } from "../../../lib";
import { StepInformations, StepInformationsProps } from "../StepInformations";
import { FormContent } from "../type/WizardType";

describe("<StepInformations />", () => {
  it("should render", () => {
    const { container } = render(
      <Form initialValues={{}} onSubmit={jest.fn()}>
        {({ form }) => (
          <StepInformations
            actionEvent={MatomoActionEvent.PREAVIS_DEMISSION}
            form={form}
          />
        )}
      </Form>
    );
    expect(container).toMatchSnapshot();
  });

  it("should render questions for specific agreement", () => {
    const { getByText, getAllByRole, getByRole } = render(
      <EmbeddedInjectedForm<FormContent, Omit<StepInformationsProps, "form">>
        Step={StepInformations}
        formData={{
          ccn: { route: "agreement", selected: generateAgreement(1483) },
        }}
        props={{
          actionEvent: MatomoActionEvent.PREAVIS_DEMISSION,
        }}
      />
    );

    expect(getByText(/Statut du salarié/)).toBeInTheDocument();
    expect(
      getByText(/Quelle est la catégorie professionnelle du salarié \?/)
    ).toBeInTheDocument();
    expect(getAllByRole("option").length).toBe(4);
    expect(
      (getByRole("option", { name: "..." }) as HTMLOptionElement).selected
    ).toBeTruthy();
    expect(getByRole("option", { name: "Employés" })).toBeInTheDocument();
    expect(
      getByRole("option", { name: "Agents de maîtrise" })
    ).toBeInTheDocument();
    expect(getByRole("option", { name: "Cadres" })).toBeInTheDocument();
    userEvent.selectOptions(
      // Find the select element
      getByRole("combobox"),
      // Find and select the Ireland option
      getByRole("option", { name: "Employés" })
    );
    expect(
      getByText(/Quelle est l'ancienneté du salarié \?/)
    ).toBeInTheDocument();
    expect(getAllByRole("option").length).toBe(7);
    expect(
      (getAllByRole("option", { name: "..." })[1] as HTMLOptionElement).selected
    ).toBeTruthy();
    expect(
      getByRole("option", { name: "Moins de 6 mois" })
    ).toBeInTheDocument();
    expect(getByRole("option", { name: "Plus de 6 mois" })).toBeInTheDocument();
  });
});
