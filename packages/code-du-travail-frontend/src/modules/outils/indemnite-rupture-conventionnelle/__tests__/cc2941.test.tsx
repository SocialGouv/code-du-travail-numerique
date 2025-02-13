import { render } from "@testing-library/react";
import React from "react";
import { UserAction } from "../../common/utils/UserAction";
import { ui } from "../../indemnite-depart/__tests__/ui";
import IndemniteRuptureCoSimulator from "../IndemniteRuptureCoSimulator";

jest.spyOn(Storage.prototype, "setItem");
Storage.prototype.getItem = jest.fn(
  () => `
  {
    "effectif": 203690,
    "cdtnId": "75d77e831c",
    "contributions": true,
    "num": 2941,
    "shortTitle": "Aide, accompagnement, soins et services à domicile (BAD)",
    "id": "2941",
    "title": "Convention collective nationale de la branche de l'aide, de l'accompagnement, des soins et des services à domicile du 21 mai 2010",
    "url": "https://www.legifrance.gouv.fr/affichIDCC.do?idConvention=KALICONT000025805800",
    "slug": "2941-aide-accompagnement-soins-et-services-a-domicile-bad"
  }
`
);

describe("Indemnité licenciement - CC 2941", () => {
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

  test(`Rupture conventionnelle Hors ANI`, () => {
    userAction
      .setInput(ui.seniority.startDate.get(), "01/01/2000")
      .setInput(ui.seniority.endDate.get(), "01/01/2025")
      .click(ui.seniority.hasAbsence.non.get())
      .click(ui.next.get())
      .click(ui.salary.hasPartialTime.non.get())
      .click(ui.salary.hasSameSalary.oui.get())
      .setInput(ui.salary.sameSalaryValue.get(), "2700")
      .click(ui.next.get());

    expect(ui.activeStep.query()).toHaveTextContent("Indemnité");
    expect(ui.result.resultat.get()).toHaveTextContent("20 250,00 €");
    expect(ui.result.resultatAgreement.get()).toHaveTextContent(
      "Non applicable dans votre situation"
    );
  });
});
