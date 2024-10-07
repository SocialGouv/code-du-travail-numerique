import { render, RenderResult } from "@testing-library/react";
import { UserAction } from "../../../common";
import React from "react";
import { CalculateurIndemniteLicenciement } from "../../../../src/outils";
import { ui } from "../../CommonIndemniteDepart/__tests__/ui";

jest.spyOn(Storage.prototype, "setItem");
Storage.prototype.getItem = jest.fn(
  () => `
{
  "num": 2941,
  "shortTitle": "Transports routiers et activités auxiliaires du transport",
  "id": "KALICONT000005635624",
  "title": "Transports routiers et activités auxiliaires du transport",
  "url": "https://www.legifrance.gouv.fr/affichIDCC.do?idConvention=KALICONT000005635624",
  "slug": "16-transports-routiers-et-activites-auxiliaires-du-transport"
}
`,
);

describe("Indemnité licenciement", () => {
  describe("parcours avec la convention collective 2941 pour tester la suppression de la date de l'absence quand on change de catégorie pro", () => {
    let rendering: RenderResult;
    let userAction: UserAction;
    beforeEach(() => {
      rendering = render(
        <CalculateurIndemniteLicenciement
          icon={""}
          title={""}
          displayTitle={""}
        />,
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
      // Validation que l'on est bien sur l'étape ancienneté
      expect(ui.activeStep.query()).toHaveTextContent("Ancienneté");
    });

    test(`
     - vérification que la date de l'absence est présente pour le motif Absence pour maladie non pro
     - vérification que la date de l'absence saisie apparait dans l'écran résultat
     - vérification que la date de l'absence n'est plus présente pour un autre motif
     - vérification que la date de l'absence n'apparait plus dans l'écran résultat
    `, () => {
      // vérification que la date de l'absence est présente pour le motif Absence pour maladie non pro
      userAction
        .setInput(ui.seniority.startDate.get(), "01/01/2000")
        .setInput(ui.seniority.notificationDate.get(), "01/01/2022")
        .setInput(ui.seniority.endDate.get(), "01/03/2022")
        .click(ui.seniority.hasAbsence.oui.get())
        .changeInputList(
          ui.seniority.absences.motif(0).get(),
          "Absence pour maladie non professionnelle",
        );

      expect(ui.seniority.absences.date(0).query()).toBeInTheDocument();

      // vérification que la date de l'absence saisie apparait dans l'écran résultat
      userAction
        .setInput(ui.seniority.absences.duration(0).get(), "6")
        .setInput(ui.seniority.absences.date(0).get(), "01/01/2015")
        .click(ui.next.get())
        .click(ui.salary.hasPartialTime.non.get())
        .click(ui.salary.hasSameSalary.oui.get())
        .setInput(ui.salary.sameSalaryValue.get(), "2500")
        .click(ui.next.get());

      expect(ui.activeStep.query()).toHaveTextContent("Indemnité");
      expect(rendering.queryByText("Éléments saisis")).toBeInTheDocument();
      expect(
        rendering.queryByText("Absence pour maladie non professionnelle"),
      ).toBeInTheDocument();
      expect(rendering.queryByTestId("absence-date")).toBeInTheDocument();
      expect(rendering.queryByText("01/01/2015")).toBeInTheDocument();

      // vérification que la date de l'absence n'est plus présente pour un autre motif
      userAction
        .click(ui.previous.get())
        .click(ui.previous.get())
        .changeInputList(
          ui.seniority.absences.motif(0).get(),
          "Congés sans solde",
        );

      expect(ui.activeStep.query()).toHaveTextContent("Ancienneté");
      expect(
        rendering.queryByText("Date de début de l'absence"),
      ).not.toBeInTheDocument();
      // On doit garder les anciennes informations saisies
      expect(ui.seniority.absences.motif(0).query()).toHaveValue(
        "Congés sans solde",
      );
      expect(ui.seniority.absences.duration(0).query()).toHaveValue(6);
      expect(ui.seniority.absences.date(0).query()).not.toBeInTheDocument();

      // vérification que la date de l'absence n'apparait plus dans l'écran résultat
      userAction.click(ui.next.get()).click(ui.next.get());

      expect(ui.activeStep.query()).toHaveTextContent("Indemnité");
      expect(rendering.queryByText("Éléments saisis")).toBeInTheDocument();
      expect(rendering.queryByTestId("absence-date")).not.toBeInTheDocument();
      expect(rendering.queryByText("01/01/2015")).not.toBeInTheDocument();
    });
  });
});
