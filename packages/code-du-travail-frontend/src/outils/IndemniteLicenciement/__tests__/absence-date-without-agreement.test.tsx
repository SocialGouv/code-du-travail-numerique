import { render, RenderResult } from "@testing-library/react";
import { UserAction } from "../../../common";
import { CalculateurIndemnite } from "../../../../src/outils";
import React from "react";
import { ui } from "./ui";

jest.spyOn(Storage.prototype, "setItem");
jest.spyOn(Storage.prototype, "getItem");

describe("Indemnité licenciement - Validation du comportement avec l'absence de date", () => {
  describe("parcours sans convention collective pour tester l'absence de la date de l'absence", () => {
    let rendering: RenderResult;
    let userAction: UserAction;
    beforeEach(() => {
      rendering = render(
        <CalculateurIndemnite
          icon={""}
          title={""}
          displayTitle={""}
          slug={"indemnite-licenciement"}
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
        .click(ui.agreement.noAgreement.get())
        .click(ui.next.get());

      // Validation que l'on est bien sur l'étape ancienneté
      expect(ui.activeStep.query()).toHaveTextContent("Ancienneté");
    });

    test("On ne doit pas demander la date de l'absence", () => {
      // On renseigne la page ancienneté avec une absence avec une date
      userAction
        .setInput(ui.seniority.startDate.get(), "01/01/2000")
        .setInput(ui.seniority.notificationDate.get(), "01/01/2022")
        .setInput(ui.seniority.endDate.get(), "01/03/2022")
        .click(ui.next.get())
        .click(ui.seniority.hasAbsence.oui.get());

      expect(
        rendering.queryByText("Date de début de l'absence")
      ).not.toBeInTheDocument();

      userAction
        .changeInputList(
          ui.seniority.absences.motif(0).get(),
          "Congés sans solde"
        )
        .setInput(ui.seniority.absences.duration(0).get(), "6")
        .click(ui.next.get());

      // On se rend sur la page information pour vérifier que la date n'est pas présente
      expect(ui.activeStep.query()).toHaveTextContent("Salaires");
      userAction
        .click(ui.salary.hasPartialTime.non.get())
        .click(ui.salary.hasSameSalary.oui.get())
        .setInput(ui.salary.sameSalaryValue.get(), "2500")
        .click(ui.next.get());

      expect(ui.activeStep.get()).toHaveTextContent("Indemnité");
      // On valide que l'absence est présente avec la date
      expect(rendering.queryByText("Éléments saisis")).toBeInTheDocument();
      expect(rendering.queryByText("Congés sans solde")).toBeInTheDocument();
      expect(rendering.queryByTestId("absence-date")).not.toBeInTheDocument();
    });
  });
});
