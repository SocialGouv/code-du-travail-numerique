import { render, screen } from "@testing-library/react";
import React from "react";
import { CalculateurIndemniteLicenciement } from "../..";
import { ui } from "../../CommonIndemniteDepart/__tests__/ui";
import { UserAction } from "../../../common";

jest.spyOn(Storage.prototype, "setItem");
Storage.prototype.getItem = jest.fn(
  () => `
{
  "url": "https://www.legifrance.gouv.fr/affichIDCC.do?idConvention=KALICONT000005635467",
  "id": "KALICONT000005635467",
  "num": 3127,
  "shortTitle": "Travaux publics (Tome II : Ouvriers)",
  "slug": "1702-travaux-publics-tome-ii-ouvriers",
  "title": "Travaux publics (Tome II : Ouvriers)"
}
`
);

describe("Indemnité licenciement - CC 3127", () => {
  let userAction: UserAction;
  beforeEach(() => {
    render(
      <CalculateurIndemniteLicenciement
        icon={""}
        title={""}
        displayTitle={""}
      />
    );
    userAction = new UserAction();

    userAction
      .click(ui.introduction.startButton.get())
      .click(ui.contract.type.cdi.get())
      .click(ui.contract.fauteGrave.non.get())
      .click(ui.contract.inaptitude.non.get())
      .click(ui.contract.arretTravail.non.get())
      .click(ui.next.get())
      .click(ui.next.get());
  });
  test(`Cas nominal`, () => {
    userAction
      .setInput(ui.seniority.startDate.get(), "01/01/2024")
      .setInput(ui.seniority.notificationDate.get(), "01/01/2025")
      .setInput(ui.seniority.endDate.get(), "01/12/2025")
      .click(ui.seniority.hasAbsence.non.get())
      .click(ui.next.get())
      .click(ui.salary.hasPartialTime.non.get())
      .click(ui.salary.hasSameSalary.oui.get())
      .setInput(ui.salary.sameSalaryValue.get(), "2345")
      .click(ui.next.get());

    expect(ui.activeStep.query()).toHaveTextContent("Indemnité");
    expect(ui.result.resultatAgreement.get()).toHaveTextContent("898.92 €");

    expect(
      screen.queryByText(
        /Depuis le 11 mars 2023 les périodes d’absence pour congé paternité ne sont plus retirées/
      )
    ).toBeInTheDocument();

    expect(ui.result.notifications.queryAll()).toHaveLength(1);
    expect(ui.result.notification(0).get()).toHaveTextContent(
      "Ce montant est exonéré d’impôt sur le revenu et de cotisations sociales sous certaines conditions"
    );
  });
});
