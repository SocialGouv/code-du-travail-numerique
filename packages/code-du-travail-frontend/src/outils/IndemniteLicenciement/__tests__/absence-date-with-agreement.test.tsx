import { render, RenderResult } from "@testing-library/react";
import { UserAction } from "../../../common";
import React from "react";
import {
  CalculateurIndemnite,
  loadPublicodesRules,
} from "../../../../src/outils";
import { ui } from "./ui";

jest.spyOn(Storage.prototype, "setItem");
Storage.prototype.getItem = jest.fn(
  () => `
{
  "num": 16,
  "shortTitle": "Transports routiers et activités auxiliaires du transport",
  "id": "KALICONT000005635624",
  "title": "Transports routiers et activités auxiliaires du transport",
  "url": "https://www.legifrance.gouv.fr/affichIDCC.do?idConvention=KALICONT000005635624",
  "slug": "16-transports-routiers-et-activites-auxiliaires-du-transport"
}
`
);

describe("Indemnité licenciement", () => {
  describe("parcours avec la convention collective 16 pour tester la date de l'absence", () => {
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
        .click(ui.next.get())
        .changeInputList(
          ui.information.agreement16.proCategory.get(),
          "Ingénieurs et cadres"
        )
        .click(ui.information.agreement16.proCategoryHasChanged.oui.get())
        .setInput(
          ui.information.agreement16.dateProCategoryChanged.get(),
          "01/01/2010"
        )
        .setInput(ui.information.agreement16.engineerAge.get(), "38")
        .click(ui.next.get());
      // Validation que l'on est bien sur l'étape ancienneté
      expect(ui.activeStep.query()).toHaveTextContent("Ancienneté");
    });

    test(`
    On doit demander la date de l'absence puis ne plus la demander quand on change les informations sur le salarié
     - vérification que la date de l'absence est présente sur la page information
     - vérification que la date de l'absence n'est plus présente après avoir changé les informations du salarié
    `, () => {
      // vérification que la date de l'absence est présente sur la page information
      userAction
        .setInput(ui.seniority.startDate.get(), "01/01/2000")
        .setInput(ui.seniority.notificationDate.get(), "01/01/2022")
        .setInput(ui.seniority.endDate.get(), "01/03/2022")
        .click(ui.seniority.hasAbsence.oui.get())
        .changeInputList(
          ui.seniority.absences.motif(0).get(),
          "Congés sans solde"
        )
        .setInput(ui.seniority.absences.duration(0).get(), "6")
        .setInput(ui.seniority.absences.date(0).get(), "01/01/2015")
        .click(ui.next.get())
        .click(ui.salary.hasPartialTime.non.get())
        .click(ui.salary.hasSameSalary.oui.get())
        .setInput(ui.salary.sameSalaryValue.get(), "2500")
        .click(ui.next.get());

      expect(ui.activeStep.query()).toHaveTextContent("Indemnité");
      expect(rendering.queryByText("Éléments saisis")).toBeInTheDocument();
      expect(rendering.queryByText("Congés sans solde")).toBeInTheDocument();
      expect(rendering.queryByTestId("absence-date")).toBeInTheDocument();
      expect(rendering.queryByText("01/01/2015")).toBeInTheDocument();

      // vérification que la date de l'absence n'est plus présente après avoir changé les informations du salarié
      userAction
        .click(ui.previous.get())
        .click(ui.previous.get())
        .click(ui.previous.get())
        .click(ui.information.agreement16.proCategoryHasChanged.non.get())
        .setInput(ui.information.agreement16.engineerAge.get(), "38")
        .click(ui.next.get());

      expect(ui.activeStep.query()).toHaveTextContent("Ancienneté");
      // Il ne doit plus y avoir la date de l'absence
      expect(
        rendering.queryByText("Date de début de l'absence")
      ).not.toBeInTheDocument();
      // On doit garder les anciennes informations saisies
      expect(ui.seniority.absences.motif(0).get()).toHaveValue(
        "Congés sans solde"
      );
      expect(ui.seniority.absences.duration(0).get()).toHaveValue(6);

      // On passe à l'étape Résultat
      userAction.click(ui.next.get()).click(ui.next.get());
      expect(ui.activeStep.query()).toHaveTextContent("Indemnité");

      // On vérifie que la date de l'absence n'est pas présente dans le résultat
      expect(rendering.queryByText("Éléments saisis")).toBeInTheDocument();
      expect(rendering.queryByTestId("absence-date")).not.toBeInTheDocument();
      expect(rendering.queryByText("01/01/2015")).not.toBeInTheDocument();
    });
  });
});
