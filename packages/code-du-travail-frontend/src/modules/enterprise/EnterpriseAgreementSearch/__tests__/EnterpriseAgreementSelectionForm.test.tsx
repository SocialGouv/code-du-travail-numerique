import { render, screen } from "@testing-library/react";
import React from "react";

import { EnterpriseAgreementSelectionForm } from "../EnterpriseAgreementSelectionForm";

const enterpriseWithoutAgreement = {
  label: "BRICOMANIE",
  siren: "123456789",
  address: "123 AVENUE DU BRICOLAGE 75000 PARIS",
  activitePrincipale: "Commerce de détail",
  conventions: [],
} as any;

describe("<EnterpriseAgreementSelectionForm /> entreprise sans convention collective", () => {
  it("affiche le texte d'accès aux dispositions générales du Code du travail hors simulateur", () => {
    render(
      <EnterpriseAgreementSelectionForm
        enterprise={enterpriseWithoutAgreement}
        goBack={jest.fn()}
        onAgreementSelect={jest.fn()}
        level={3}
      />
    );

    expect(
      screen.getByText(
        /Aucune convention collective n'a été déclarée pour l'entreprise/
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Vous pouvez consulter les dispositions générales du Code du travail"
      )
    ).toBeInTheDocument();
  });
});
