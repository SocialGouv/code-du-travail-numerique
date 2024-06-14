import { render } from "@testing-library/react";
import React from "react";
import { CalculateurRuptureConventionnelle } from "../..";
import { ui } from "../../CommonIndemniteDepart/__tests__/ui";
import { UserAction } from "../../../common";

jest.spyOn(Storage.prototype, "setItem");
Storage.prototype.getItem = jest.fn(
  () => `
  {
    "url": "https://www.legifrance.gouv.fr/affichIDCC.do?idConvention=KALICONT000005635085",
    "id": "2216",
    "num": 2216,
    "shortTitle": "Commerce de détail et de gros à prédominance alimentaire",
    "slug": "2216-commerce-de-detail-et-de-gros-a-predominance-alimentaire",
    "title": "Convention collective nationale du commerce de détail et de gros à prédominance alimentaire du 12 juillet 2001.  Etendue par arrêté du 26 juillet 2002 JORF 6 août 2002.",
    "contributions": true
  }  
`
);

describe("Indemnité licenciement - CC 2216", () => {
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
    userAction.click(ui.introduction.startButton.get());
    userAction.click(ui.contract.type.cdi.get());
    userAction.click(ui.contract.arretTravail.non.get());
    userAction.click(ui.next.get());
    userAction.click(ui.next.get());
  });

  test(`Vérifier l'enchainement de question à l'étape information`, () => {
    userAction.changeInputList(
      ui.information.agreement2216.proCategory.get(),
      "'Cadres'"
    );
    userAction.setInput(ui.information.agreement2216.ruptureAge.get(), "65");
    userAction.click(ui.next.get());

    userAction.setInput(ui.seniority.startDate.get(), "01/01/1980");
    userAction.setInput(ui.seniority.endDate.get(), "01/03/2024");
    userAction.click(ui.seniority.hasAbsence.non.get());
    userAction.click(ui.next.get());
    userAction.click(ui.salary.hasPartialTime.non.get());
    userAction.click(ui.salary.hasSameSalary.oui.get());
    userAction.setInput(ui.salary.sameSalaryValue.get(), "1488");
    userAction.click(ui.next.get());

    expect(ui.activeStep.query()).toHaveTextContent("Indemnité");
    expect(ui.result.resultat.get()).toHaveTextContent("20 666,67 €");
    expect(ui.result.resultatLegal.get()).toHaveTextContent("20 666,67 €");
    expect(ui.result.resultatAgreement.get()).toHaveTextContent("19 922,67 €");
    expect(ui.result.dismissalType.economic.query()).not.toBeInTheDocument();
  });
});
