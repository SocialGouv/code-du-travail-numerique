import { fireEvent, render } from "@testing-library/react";
import React from "react";
import { CalculateurRuptureConventionnelle } from "../..";
import { ui } from "../../CommonIndemniteDepart/__tests__/ui";
import userEvent from "@testing-library/user-event";

jest.spyOn(Storage.prototype, "setItem");
Storage.prototype.getItem = jest.fn(
  () => `
  {
    "url": "https://www.legifrance.gouv.fr/affichIDCC.do?idConvention=KALICONT000005635596",
    "id": "1501",
    "num": 1501,
    "shortTitle": "Restauration rapide",
    "slug": "1501-restauration-rapide",
    "title": "Convention collective nationale de la restauration rapide du 18 mars 1988",
    "contributions": true
  }  
`
);

describe("Indemnité licenciement - CC 1501", () => {
  beforeEach(() => {
    render(
      <CalculateurRuptureConventionnelle
        icon={""}
        title={""}
        displayTitle={""}
      />
    );
    userEvent.click(ui.introduction.startButton.get());
    userEvent.click(ui.contract.type.cdi.get());
    userEvent.click(ui.contract.arretTravail.non.get());
    userEvent.click(ui.next.get());
    userEvent.click(ui.next.get());
  });

  test(`Vérifier l'enchainement de question à l'étape information`, () => {
    fireEvent.change(ui.information.agreement1501.proCategory.get(), {
      target: { value: "'Cadres'" },
    });
    fireEvent.change(ui.information.agreement1501.age.get(), {
      target: { value: "55" },
    });
    userEvent.click(ui.next.get());

    fireEvent.change(ui.seniority.startDate.get(), {
      target: { value: "01/01/2000" },
    });
    fireEvent.change(ui.seniority.endDate.get(), {
      target: { value: "01/03/2024" },
    });
    userEvent.click(ui.seniority.hasAbsence.non.get());
    userEvent.click(ui.next.get());
    userEvent.click(ui.salary.hasPartialTime.non.get());
    userEvent.click(ui.salary.hasSameSalary.oui.get());
    fireEvent.change(ui.salary.sameSalaryValue.get(), {
      target: { value: "1488" },
    });
    userEvent.click(ui.next.get());

    expect(ui.activeStep.query()).toHaveTextContent("Indemnité");
    expect(ui.result.resultat.get()).toHaveTextContent("11408 €");
    expect(ui.result.resultatLegal.get()).toHaveTextContent("10746.67 €");
    expect(ui.result.resultatAgreement.get()).toHaveTextContent("11408 €");
    expect(
      ui.result.agreement1501.dismissalType.query()
    ).not.toBeInTheDocument();
  });
});
