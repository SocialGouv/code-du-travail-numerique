import { fireEvent, render } from "@testing-library/react";
import React from "react";
import { CalculateurIndemniteLicenciement } from "../../../../src/outils";
import { ui } from "../../CommonIndemniteDepart/__tests__/ui";
import { UserAction } from "../../../common";

jest.spyOn(Storage.prototype, "setItem");
Storage.prototype.getItem = jest.fn(
  () => `
  {
    "url": "https://www.legifrance.gouv.fr/affichIDCC.do?idConvention=KALICONT000005635617",
    "id": "0675",
    "num": 675,
    "shortTitle": "Maisons à succursales de vente au détail d'habillement",
    "slug": "675-maisons-a-succursales-de-vente-au-detail-dhabillement",
    "title": "Convention collective nationale des maisons à succursales de vente au détail d'habillement du 30 juin 1972.  Etendue par arrêté du 8 décembre 1972 (JO du 7 janvier 1973).",
    "contributions": true
  }
`
);

describe("Indemnité licenciement - CC 675", () => {
  let userAction: UserAction;
  test("cas spécifique", () => {
    render(
      <CalculateurIndemniteLicenciement
        icon={""}
        title={""}
        displayTitle={""}
      />
    );
    userAction = new UserAction();
    userAction.click(ui.introduction.startButton.get());
    userAction.click(ui.contract.type.cdi.get());
    userAction.click(ui.contract.fauteGrave.non.get());
    userAction.click(ui.contract.inaptitude.non.get());
    userAction.click(ui.contract.arretTravail.non.get());
    userAction.click(ui.next.get());
    userAction.click(ui.next.get());
    userAction.click(ui.next.get());
    userAction.click(ui.next.get());
    userAction.changeInputList(
      ui.information.agreement675.proCategory.get(),
      "'Employés'"
    );
    fireEvent.click(ui.next.get());
    userAction.setInput(ui.seniority.startDate.get(), "01/01/2021");
    userAction.setInput(ui.seniority.notificationDate.get(), "01/01/2024");
    userAction.setInput(ui.seniority.endDate.get(), "01/01/2024");
    fireEvent.click(ui.seniority.hasAbsence.non.get());
    fireEvent.click(ui.next.get());
    fireEvent.click(ui.salary.hasPartialTime.non.get());
    fireEvent.click(ui.salary.hasSameSalary.oui.get());
    userAction.setInput(ui.salary.sameSalaryValue.get(), "1488");
    fireEvent.click(ui.next.get());

    expect(ui.activeStep.query()).toHaveTextContent("Indemnité");
    expect(ui.result.resultatAgreement.get()).toHaveTextContent("446.4");
    expect(ui.result.resultat.get()).toHaveTextContent("1116");
  });
});
