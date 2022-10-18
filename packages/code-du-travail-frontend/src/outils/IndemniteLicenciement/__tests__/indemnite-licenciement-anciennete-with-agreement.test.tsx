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
    beforeEach(async () => {
      rendering = await render(
        <CalculateurIndemnite
          icon={""}
          title={""}
          displayTitle={""}
          publicodesRules={loadPublicodesRules("indemnite-licenciement")}
        />
      );
      userAction = new UserAction();
      userAction
        .click(await ui.introduction.startButton.get())
        .click(await ui.contract.type.cdi.get())
        .click(await ui.contract.fauteGrave.non.get())
        .click(await ui.contract.inaptitude.non.get())
        .click(await ui.next.get())
        .click(await ui.next.get())
        .changeInputList(
          await ui.information.proCategory.get(),
          "Ingénieurs et cadres"
        )
        .click(await ui.information.proCategoryHasChanged.oui.get())
        .setInput(
          await ui.information.dateProCategoryChanged.get(),
          "01/01/2010"
        )
        .setInput(await ui.information.age.get(), "38")
        .click(ui.next.get());
      // Validation que l'on est bien sur l'étape ancienneté
      expect(await ui.activeStep.query()).toHaveTextContent("Ancienneté");
    });
    test("Validation des erreurs à la validation du formulaire d'ancienneté", async () => {
      userAction.click(await ui.next.get());
      expect(
        rendering.queryAllByText("Veuillez saisir cette date")
      ).toHaveLength(3);

      // On renseigne les champs dates
      userAction
        .setInput(await ui.seniority.startDate.get(), "01/01/2000")
        .setInput(await ui.seniority.notificationDate.get(), "01/01/2022")
        .setInput(await ui.seniority.endDate.get(), "01/03/2022")
        .click(await ui.next.get());

      expect(
        rendering.queryByText("Veuillez saisir cette date")
      ).not.toBeInTheDocument();
      expect(
        rendering.queryByText("Vous devez répondre à cette question")
      ).toBeInTheDocument();

      // On indique qu'il y a des absences
      userAction.click(await ui.seniority.hasAbsence.oui.get());

      // Absences non renseignés
      expect(
        rendering.queryByText("Vous devez renseigner tous les champs")
      ).toBeInTheDocument();
      expect(
        rendering.queryByText("Date de début de l'absence")
      ).toBeInTheDocument();

      userAction.changeInputList(
        await ui.seniority.absences.motif(0).get(),
        "Congés sans solde"
      );

      // Absence renseignée sans la durée et la date
      expect(
        rendering.queryByText("Veuillez saisir la durée de l'absence")
      ).toBeInTheDocument();
      expect(
        rendering.queryByText("Veuillez saisir la date de l'absence")
      ).toBeInTheDocument();

      // Durée de l'absence renseignée, on ne doit plus voir l'erreur
      userAction.setInput(await ui.seniority.absences.duration(0).get(), "6");
      expect(
        rendering.queryByText("Veuillez saisir la durée de l'absence")
      ).not.toBeInTheDocument();

      // Date de l'absence hors de la présence dans l'entreprise
      userAction.setInput(
        await ui.seniority.absences.date(0).get(),
        "01/03/1999"
      );
      expect(
        rendering.queryByText(
          "La date de l'absence doit être comprise entre le 01/01/2000 et le 01/03/2022 (dates d'entrée et de sortie de l'entreprise)"
        )
      ).toBeInTheDocument();

      // Change la date de l'absence pour être dans la période de présence de l'entreprise
      userAction.setInput(
        await ui.seniority.absences.date(0).get(),
        "01/01/2015"
      );
      expect(
        rendering.queryByText(
          "La date de l'absence doit être comprise entre le 01/01/2000 et le 01/03/2022 (dates d'entrée et de sortie de l'entreprise)"
        )
      ).not.toBeInTheDocument();

      // On peut passer à l'étape suivante
      userAction.click(await ui.next.get());
      expect(await ui.activeStep.query()).toHaveTextContent("Salaires");
    });

    test("Validation de la disparition du champ demandant la date de l'absence après changement des informations", async () => {
      // On renseigne la page ancienneté avec une absence avec une date
      userAction
        .setInput(await ui.seniority.startDate.get(), "01/01/2000")
        .setInput(await ui.seniority.notificationDate.get(), "01/01/2022")
        .setInput(await ui.seniority.endDate.get(), "01/03/2022")
        .click(await ui.seniority.hasAbsence.oui.get())
        .changeInputList(
          await ui.seniority.absences.motif(0).get(),
          "Congés sans solde"
        )
        .setInput(await ui.seniority.absences.duration(0).get(), "6")
        .setInput(await ui.seniority.absences.date(0).get(), "01/01/2015")
        .click(await ui.next.get());

      // On se rend sur la page information pour vérifier que la date est présente
      expect(await ui.activeStep.query()).toHaveTextContent("Salaires");
      userAction
        .click(await ui.salary.hasPartialTime.non.get())
        .click(await ui.salary.hasSameSalary.oui.get())
        .setInput(await ui.salary.sameSalaryValue.get(), "2500")
        .click(await ui.next.get());

      expect(await ui.activeStep.query()).toHaveTextContent("Indemnité");
      // On valide que l'absence est présente avec la date
      expect(rendering.queryByText("Éléments saisis")).toBeInTheDocument();
      expect(rendering.queryByText("Congés sans solde")).toBeInTheDocument();
      expect(rendering.queryByTestId("absence-date")).toBeInTheDocument();
      expect(rendering.queryByText("01/01/2015")).toBeInTheDocument();

      // On revient sur la page information pour changer une information et ne plus avoir besoin de la date sur une absence
      userAction
        .click(await ui.previous.get())
        .click(await ui.previous.get())
        .click(await ui.previous.get())
        .click(await ui.information.proCategoryHasChanged.non.get())
        .setInput(await ui.information.age.get(), "38")
        .click(await ui.next.get());

      expect(await ui.activeStep.query()).toHaveTextContent("Ancienneté");

      // Il ne doit plus y avoir la date de l'absence
      expect(
        rendering.queryByText("Date de début de l'absence")
      ).not.toBeInTheDocument();
      // On doit garder les anciennes informations saisies
      expect(await ui.seniority.absences.motif(0).get()).toHaveValue(
        "Congés sans solde"
      );
      expect(await ui.seniority.absences.duration(0).get()).toHaveValue(6);

      // On passe à l'étape Résultat
      userAction.click(await ui.next.get()).click(await ui.next.get());
      expect(await ui.activeStep.query()).toHaveTextContent("Indemnité");

      // On vérifie que la date de l'absence n'est pas présente dans le résultat
      expect(rendering.queryByText("Éléments saisis")).toBeInTheDocument();
      expect(rendering.queryByTestId("absence-date")).not.toBeInTheDocument();
      expect(rendering.queryByText("01/01/2015")).not.toBeInTheDocument();
    });
  });
});
