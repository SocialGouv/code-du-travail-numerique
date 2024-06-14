import { render } from "@testing-library/react";
import React from "react";
import { CalculateurIndemniteLicenciement } from "../../../../src/outils";
import { ui } from "../../CommonIndemniteDepart/__tests__/ui";
import { UserAction } from "../../../common";

jest.spyOn(Storage.prototype, "setItem");
Storage.prototype.getItem = jest.fn(
  () => `{
    "url":"https://www.legifrance.gouv.fr/affichIDCC.do?idConvention=KALICONT000005635653",
    "id":"KALICONT000005635653",
    "num":1404,
    "shortTitle":"Entreprises de la maintenance, distribution et location de matériels agricoles, de travaux publics, de bâtiment, de manutention, de motoculture de plaisance et activités connexes, dite SDLM",
    "slug":"1404-entreprises-de-la-maintenance-distribution-et-location-de-materiels-agrico",
    "title":"Entreprises de la maintenance, distribution et location de matériels agricoles, de travaux publics, de bâtiment, de manutention, de motoculture de plaisance et activités connexes, dite SDLM"
}`
);

describe("Indemnité licenciement - CC 1404", () => {
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
    userAction.click(ui.introduction.startButton.get());
    userAction.click(ui.contract.type.cdi.get());
    userAction.click(ui.contract.fauteGrave.non.get());
    userAction.click(ui.contract.inaptitude.non.get());
    userAction.click(ui.contract.arretTravail.non.get());
    userAction.click(ui.next.get());
    userAction.click(ui.next.get());
  });

  test("Vérifier que le CDI classique amène au résultat", () => {
    userAction.click(ui.information.agreement1404.cdiOperation.non.get());
    userAction.click(ui.next.get());
    userAction.setInput(ui.seniority.startDate.get(), "01/01/2000");
    userAction.setInput(ui.seniority.notificationDate.get(), "01/01/2022");
    userAction.setInput(ui.seniority.endDate.get(), "01/03/2022");
    userAction.click(ui.seniority.hasAbsence.non.get());
    userAction.click(ui.next.get());
    userAction.click(ui.salary.hasPartialTime.non.get());
    userAction.click(ui.salary.hasSameSalary.oui.get());
    userAction.setInput(ui.salary.sameSalaryValue.get(), "3000");
    userAction.click(ui.next.get());
    expect(ui.activeStep.query()).toHaveTextContent("Indemnité");
  });
  describe("Etant donné un CDI opération", () => {
    beforeEach(() =>
      userAction.click(ui.information.agreement1404.cdiOperation.oui.get())
    );
    describe("Etant donné une ancienneté < 6 mois", () => {
      beforeEach(() =>
        userAction.setInput(ui.information.agreement1404.duree.get(), "5")
      );
      test("Vérifier que le licenciement avant fin de la période d'essai amène au résultat", () => {
        userAction.click(ui.information.agreement1404.trial.oui.get());
        userAction.click(ui.next.get());
        userAction.setInput(ui.seniority.startDate.get(), "01/01/2022");
        userAction.setInput(ui.seniority.notificationDate.get(), "01/04/2022");
        userAction.setInput(ui.seniority.endDate.get(), "01/05/2022");
        userAction.click(ui.seniority.hasAbsence.non.get());
        userAction.click(ui.next.get());
        expect(ui.activeStep.query()).toHaveTextContent("Indemnité");
      });
      test("Vérifier que le licenciement après fin de la période d'essai amène au résultat", () => {
        userAction.click(ui.information.agreement1404.trial.non.get());
        userAction.setInput(
          ui.information.agreement1404.salaryTotal.get(),
          "50000"
        );
        userAction.click(ui.next.get());
        userAction.setInput(ui.seniority.startDate.get(), "01/01/2022");
        userAction.setInput(ui.seniority.notificationDate.get(), "01/04/2022");
        userAction.setInput(ui.seniority.endDate.get(), "01/05/2022");
        userAction.click(ui.seniority.hasAbsence.non.get());
        userAction.click(ui.next.get());
        expect(ui.activeStep.query()).toHaveTextContent("Indemnité");
      });
    });
    test("Vérifier qu'avec plus de 6 mois on arrive au résultat", () => {
      userAction.setInput(ui.information.agreement1404.duree.get(), "30");
      userAction.setInput(ui.information.agreement1404.salary1.get(), "100000");
      userAction.setInput(ui.information.agreement1404.salary2.get(), "150000");
      userAction.setInput(ui.information.agreement1404.salary3.get(), "200000");
      userAction.click(ui.next.get());
      userAction.setInput(ui.seniority.startDate.get(), "01/01/2000");
      userAction.setInput(ui.seniority.notificationDate.get(), "01/01/2022");
      userAction.setInput(ui.seniority.endDate.get(), "01/03/2022");
      userAction.click(ui.seniority.hasAbsence.non.get());
      userAction.click(ui.next.get());
      expect(ui.activeStep.query()).toHaveTextContent("Indemnité");
    });
  });
});
