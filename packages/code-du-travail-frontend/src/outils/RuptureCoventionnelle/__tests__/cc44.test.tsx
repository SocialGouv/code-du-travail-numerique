import { render } from "@testing-library/react";
import React from "react";
import { CalculateurRuptureConventionnelle } from "../..";
import { ui } from "../../CommonIndemniteDepart/__tests__/ui";
import { UserAction } from "../../../common";

jest.spyOn(Storage.prototype, "setItem");
Storage.prototype.getItem = jest.fn(
  () => `
  {
    "url": "https://www.legifrance.gouv.fr/affichIDCC.do?idConvention=KALICONT000005635613",
    "id": "0044",
    "num": 44,
    "shortTitle": "Industries chimiques et connexes",
    "slug": "44-industries-chimiques-et-connexes",
    "title": "Convention collective nationale des industries chimiques et connexes du 30 décembre 1952. Étendue par arrêté du 13 novembre 1956 JONC 12 décembre 1956",
    "contributions": true
  }  
`
);

describe("Indemnité licenciement - CC 44", () => {
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
    userAction.setInput(ui.information.agreement44.ruptureAge.get(), "60");
    userAction.changeInputList(
      ui.information.agreement44.proCategory.get(),
      "'Ouvriers et collaborateurs (Groupes I à III)'"
    );
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
    expect(ui.result.resultat.get()).toHaveTextContent("13764 €");
    expect(ui.result.resultatLegal.get()).toHaveTextContent("10746.67 €");
    expect(ui.result.resultatAgreement.get()).toHaveTextContent("13764 €");
    expect(ui.result.dismissalType.mobility.query()).not.toBeInTheDocument();
  });
});
