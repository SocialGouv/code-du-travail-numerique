import { render } from "@testing-library/react";
import React from "react";
import { CalculateurRuptureConventionnelle } from "../..";
import { ui } from "../../CommonIndemniteDepart/__tests__/ui";
import { UserAction } from "../../../common";

jest.spyOn(Storage.prototype, "setItem");
Storage.prototype.getItem = jest.fn(
  () => `
  {
    "effectif": 80901,
    "cdtnId": "36c0ef9881",
    "contributions": true,
    "num": 2511,
    "shortTitle": "Sport",
    "id": "2511",
    "title": "Convention collective nationale du sport du 7 juillet 2005 étendue par arrêté du 21 novembre 2006",
    "url": "https://www.legifrance.gouv.fr/affichIDCC.do?idConvention=KALICONT000017577652",
    "slug": "2511-sport"
  }
`
);

describe("Indemnité licenciement - CC 2511", () => {
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
