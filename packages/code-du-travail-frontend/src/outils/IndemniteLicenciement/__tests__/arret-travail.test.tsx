import { render } from "@testing-library/react";
import React from "react";
import { CalculateurIndemniteLicenciement } from "../../../../src/outils";
import { ui } from "../../CommonIndemniteDepart/__tests__/ui";
import { byText } from "testing-library-selector";
import { UserAction } from "../../../common";

describe("Arrêt de travail", () => {
  let userAction: UserAction;
  describe("Page contrat de travail: vérification des questions affichées", () => {
    beforeEach(async () => {
      render(
        <CalculateurIndemniteLicenciement
          icon={""}
          title={""}
          displayTitle={""}
        />,
      );
      userAction = new UserAction();
      userAction.click(ui.introduction.startButton.get());
      userAction.click(ui.contract.type.cdi.get());
      userAction.click(ui.contract.fauteGrave.non.get());
      userAction.click(ui.contract.inaptitude.non.get());
    });

    test("should display a new question", async () => {
      expect(ui.contract.arretTravail.question.query()).toBeInTheDocument();
    });

    test("should stop because a new question is display", async () => {
      userAction.click(ui.next.get());
      expect(ui.agreement.agreement.query()).not.toBeInTheDocument();
    });

    test("should pass to next step", async () => {
      userAction.click(ui.contract.arretTravail.non.get());
      userAction.click(ui.next.get());
      expect(ui.agreement.agreement.query()).toBeInTheDocument();
    });

    test("should stop because a date question about the 'arret de travail' is asked", async () => {
      userAction.click(ui.contract.arretTravail.oui.get());
      userAction.click(ui.next.get());
      expect(ui.agreement.agreement.query()).not.toBeInTheDocument();
    });

    test("should pass to next step after selecting a date", async () => {
      userAction.click(ui.contract.arretTravail.oui.get());
      userAction.setInput(ui.contract.dateArretTravail.get(), "15/09/2022");
      userAction.click(ui.next.get());
      expect(ui.agreement.agreement.query()).toBeInTheDocument();
    });

    test("user can put an invalid date and then click 'no'", async () => {
      userAction.click(ui.contract.arretTravail.oui.get());
      userAction.setInput(ui.contract.dateArretTravail.get(), "15/09/2000");
      userAction.click(ui.next.get());
      userAction.click(ui.agreement.noAgreement.get());
      userAction.click(ui.next.get());
      expect(ui.seniority.startDate.query()).toBeInTheDocument();

      userAction.setInput(ui.seniority.startDate.get(), "01/01/2022");
      userAction.click(ui.next.get());
      expect(
        byText(
          "La date de début de contrat doit se situer avant la date d'arrêt de travail indiquée à l'étape n°2",
        ).query(),
      ).toBeInTheDocument();
      userAction.click(ui.previous.get());
      userAction.click(ui.previous.get());
      userAction.click(ui.contract.arretTravail.non.get());
      userAction.click(ui.next.get());
      userAction.click(ui.next.get());
      expect(ui.seniority.startDate.query()).toBeInTheDocument();

      expect(
        byText(
          "La date de début de contrat doit se situer avant la date d'arrêt de travail indiquée à l'étape n°2",
        ).query(),
      ).not.toBeInTheDocument();
    });
  });

  describe("Page salaires: vérification de la liste affichée", () => {
    beforeEach(async () => {
      render(
        <CalculateurIndemniteLicenciement
          icon={""}
          title={""}
          displayTitle={""}
        />,
      );
    });

    test("should display with the good number of months at the 'Salaires' step if no inaptitude", async () => {
      userAction.click(ui.introduction.startButton.get());
      userAction.click(ui.contract.type.cdi.get());
      userAction.click(ui.contract.fauteGrave.non.get());
      userAction.click(ui.contract.inaptitude.non.get());
      userAction.click(ui.contract.arretTravail.non.get());
      userAction.click(ui.next.get());
      userAction.click(ui.agreement.noAgreement.get());
      userAction.click(ui.next.get());
      userAction.setInput(ui.seniority.startDate.get(), "01/01/2022");
      userAction.setInput(ui.seniority.notificationDate.get(), "01/09/2022");
      userAction.setInput(ui.seniority.endDate.get(), "01/12/2022");
      userAction.click(ui.seniority.hasAbsence.non.get());
      userAction.click(ui.next.get());
      userAction.click(ui.salary.hasPartialTime.non.get());
      userAction.click(ui.salary.hasSameSalary.non.get());
      expect(ui.salary.salaries.queryAll()).toHaveLength(8);
    });

    test("should display with the good number of months at the 'Salaires' step", async () => {
      userAction.click(ui.introduction.startButton.get());
      userAction.click(ui.contract.type.cdi.get());
      userAction.click(ui.contract.fauteGrave.non.get());
      userAction.click(ui.contract.inaptitude.non.get());
      userAction.click(ui.contract.arretTravail.oui.get());
      userAction.setInput(ui.contract.dateArretTravail.get(), "01/07/2022");
      userAction.click(ui.next.get());
      userAction.click(ui.agreement.noAgreement.get());
      userAction.click(ui.next.get());
      userAction.setInput(ui.seniority.startDate.get(), "01/01/2022");
      userAction.setInput(ui.seniority.notificationDate.get(), "01/09/2022");
      userAction.setInput(ui.seniority.endDate.get(), "01/12/2022");
      userAction.click(ui.seniority.hasAbsence.non.get());
      userAction.click(ui.next.get());
      userAction.click(ui.salary.hasPartialTime.non.get());
      userAction.click(ui.salary.hasSameSalary.non.get());
      expect(ui.salary.salaries.queryAll()).toHaveLength(6);
    });
  });
});
