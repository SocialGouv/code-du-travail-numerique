import { render } from "@testing-library/react";
import React from "react";
import { CalculateurRuptureConventionnelle } from "../..";
import { ui } from "../../CommonIndemniteDepart/__tests__/ui";
import { UserAction } from "../../../common";

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
      <CalculateurRuptureConventionnelle
        icon={""}
        title={""}
        displayTitle={""}
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
    expect(ui.result.resultat.get()).toHaveTextContent("20666,67 €");
    expect(ui.result.resultatLegal.get()).toHaveTextContent("20666.67 €");
    expect(ui.result.resultatAgreement.get()).toHaveTextContent("20666.67 €");
    expect(ui.result.dismissalType.economic.query()).not.toBeInTheDocument();
    expect(ui.result.dismissalType.discipline.query()).not.toBeInTheDocument();
  });
});
