import { render } from "@testing-library/react";
import React from "react";
import { UserAction } from "../../common/utils/UserAction";
import { ui } from "../../indemnite-depart/__tests__/ui";
import IndemniteRuptureCoSimulator from "../IndemniteRuptureCoSimulator";

jest.spyOn(Storage.prototype, "setItem");
Storage.prototype.getItem = jest.fn(
  () => `
  {
    "effectif": 216431,
    "cdtnId": "a25dfc974f",
    "contributions": true,
    "num": 2120,
    "shortTitle": "Banque",
    "id": "2120",
    "title": "Convention collective nationale de la banque du 10 janvier 2000.  Etendue par arrêté du 17 novembre 2004 JORF 11 décembre 2004.",
    "url": "https://www.legifrance.gouv.fr/affichIDCC.do?idConvention=KALICONT000005635780",
    "slug": "2120-banque"
}
`
);

describe("Rupture Co - CC 2120", () => {
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

    userAction
      .click(ui.introduction.startButton.get())
      .click(ui.contract.type.cdi.get())
      .click(ui.contract.arretTravail.non.get())
      .click(ui.next.get())
      .click(ui.next.get());
  });

  test(`Verification du processus`, () => {
    userAction
      .changeInputList(ui.information.agreement2120.proCategory.get(), "Cadres")
      .click(ui.next.get())
      .setInput(ui.seniority.startDate.get(), "01/01/1980")
      .setInput(ui.seniority.endDate.get(), "01/03/2024")
      .click(ui.seniority.hasAbsence.non.get())
      .click(ui.next.get())
      .click(ui.salary.hasPartialTime.non.get())
      .click(ui.salary.hasSameSalary.oui.get())
      .setInput(ui.salary.sameSalaryValue.get(), "1488")
      .setInput(ui.salary.agreement2120.salariesVariablePart.get(), "2000")
      .click(ui.next.get());

    expect(ui.activeStep.query()).toHaveTextContent("Indemnité");
    expect(ui.result.resultat.get()).toHaveTextContent("20 666,67 €");
    expect(ui.result.resultatLegal.get()).toHaveTextContent("20 666,67 €");
    expect(ui.result.resultatAgreement.get()).toHaveTextContent("20 666,67 €");
    expect(ui.result.dismissalType.economic.query()).not.toBeInTheDocument();
    expect(ui.result.dismissalType.discipline.query()).not.toBeInTheDocument();
    expect(ui.result.notifications.queryAll()).toHaveLength(1);
  });

  test(`affiche une notif si absence pour maladie non pro`, () => {
    userAction
      .changeInputList(ui.information.agreement2120.proCategory.get(), "Cadres")
      .click(ui.next.get())
      .setInput(ui.seniority.startDate.get(), "01/01/1980")
      .setInput(ui.seniority.endDate.get(), "01/03/2024")
      .click(ui.seniority.hasAbsence.oui.get())
      .setInput(ui.seniority.absences.duration(0).get(), "8")
      .setInput(ui.seniority.absences.date(0).get(), "01/01/2015")

      .click(ui.next.get())
      .click(ui.salary.hasPartialTime.non.get())
      .click(ui.salary.hasSameSalary.oui.get())
      .setInput(ui.salary.sameSalaryValue.get(), "1488")
      .setInput(ui.salary.agreement2120.salariesVariablePart.get(), "2000")
      .click(ui.next.get());

    expect(ui.activeStep.query()).toHaveTextContent("Indemnité");
    expect(ui.result.resultat.get()).toHaveTextContent("20 336,00 €");
    expect(ui.result.resultatLegal.get()).toHaveTextContent("20 336,00 €");
    expect(ui.result.resultatAgreement.get()).toHaveTextContent("20 336,00 €");
    expect(ui.result.dismissalType.economic.query()).not.toBeInTheDocument();
    expect(ui.result.dismissalType.discipline.query()).not.toBeInTheDocument();
    expect(ui.result.notifications.queryAll()).toHaveLength(2);
    expect(ui.result.notification(1).get()).toHaveTextContent(
      "(2) Si lors de l’absence pour maladie non professionnelle le salarié a bénéficié d’une indemnisation complémentaire versée par l'employeur (maintien de salaire), en plus des indemnités journalières de la sécurité sociale, le montant de l’indemnité prévu par la convention collective pourrait être plus élevé. En effet, dans ce cas, la période d’absence est intégrée dans l’ancienneté du salarié. Par soucis de simplification, ce simulateur déduit toutes les absences pour maladie non professionnelle sans distinguer, pour calculer l’ancienneté du salarié, selon qu’elles ont été indemnisées ou pas."
    );
  });
});
