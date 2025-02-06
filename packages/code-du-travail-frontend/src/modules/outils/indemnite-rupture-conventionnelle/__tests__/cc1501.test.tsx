import { render } from "@testing-library/react";
import React from "react";
import { UserAction } from "../../common/utils/UserAction";
import { ui } from "../../common/indemnite-depart/__tests__/ui";
import IndemniteRuptureCoSimulator from "../IndemniteRuptureCoSimulator";

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
  let userAction: UserAction;
  beforeEach(() => {
    render(
      <IndemniteRuptureCoSimulator
        breadcrumbTitle="Simulateur d'indemnité de rupture conventionnelle"
        description="Estimez le montant de l'indemnité de rupture conventionnelle"
        relatedItems={[]}
        title="Simulateur d'indemnité de rupture conventionnelle"
      />
    );
    userAction = new UserAction();
    userAction.click(ui.introduction.startButton.get());
    userAction.click(ui.contract.type.cdi.get());
    userAction.click(ui.contract.arretTravail.non.get());
    userAction.click(ui.next.get());
    userAction.click(ui.next.get());
  });

  test(`Vérifier l'enchainement de question à l'étape information`, () => {
    userAction.changeInputList(
      ui.information.agreement1501.proCategory.get(),
      "'Cadres'"
    );
    userAction.setInput(ui.information.agreement1501.ruptureAge.get(), "55");
    userAction.click(ui.next.get());

    userAction.setInput(ui.seniority.startDate.get(), "01/01/2000");
    userAction.setInput(ui.seniority.endDate.get(), "01/03/2024");
    userAction.click(ui.seniority.hasAbsence.non.get());
    userAction.click(ui.next.get());
    userAction.click(ui.salary.hasPartialTime.non.get());
    userAction.click(ui.salary.hasSameSalary.oui.get());
    userAction.setInput(ui.salary.sameSalaryValue.get(), "1488");
    userAction.click(ui.next.get());

    expect(ui.activeStep.query()).toHaveTextContent("Indemnité");
    expect(ui.result.resultat.get()).toHaveTextContent("11 408,00 €");
    expect(ui.result.resultatLegal.get()).toHaveTextContent("10 746,67 €");
    expect(ui.result.resultatAgreement.get()).toHaveTextContent("11 408,00 €");
    expect(ui.result.dismissalType.economic.query()).not.toBeInTheDocument();
  });
});
