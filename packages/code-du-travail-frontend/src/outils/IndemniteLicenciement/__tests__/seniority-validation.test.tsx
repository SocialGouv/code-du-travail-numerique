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

describe("Indemnité licenciement - Validation des erreurs sur l'étape ancienneté", () => {
  describe("parcours avec la convention collective 16 pour valider les erreurs", () => {
    let rendering: RenderResult;
    let userAction: UserAction;
    beforeEach(() => {
      rendering = render(
        <CalculateurIndemnite
          icon={""}
          title={""}
          displayTitle={""}
          publicodesRules={loadPublicodesRules("indemnite-licenciement")}
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
      On doit afficher des erreurs à la validation quand les informations sont erronées:
       - validation des erreurs sur les champs vides
       - validation de l'erreur quand cela fait plus de 18 mois que l'on a quitté l'entreprise
       - validation de l'erreur quand on a saisi une date de notification avant la date de d'entrée
       - validation de l'erreur quand on a saisi une date de sortie avant la date de notification
       - validation de l'erreur quand on a saisi une période (entrée -> notification) inférieure à 8 mois
       - validation de l'erreur quand on a saisi une période (entrée -> notification) inférieure à 8 mois et que l'on change la date de fin de contrat
       - validation de la disparition de l'erreur quand on a change la période  (entrée -> notification) pour plus de 8 mois
       - validation de l'erreur quand on a pas répondu à présence de périodes d'absence
       - validation de l'erreur quand on a des périodes d'absence mais que l'on a pas saisi le motif de l'absence
       - validation de l'erreur quand on a des périodes d'absence mais que l'on a pas saisi la durée et la date de l'absence
       - validation de l'erreur quand on a une date d'absence en dehors de la période de présence dans l'entreprise
       - validation de l'erreur quand on a une absence qui réduit la période de présence de l'entreprise à moins de 8 mois
       - validation de la disparition des erreurs quand on a tout renseigné
    `, () => {
      // validation des erreurs sur les champs vides
      userAction.click(ui.next.get());
      expect(
        rendering.queryAllByText("Veuillez saisir cette date")
      ).toHaveLength(3);

      // validation de l'erreur quand cela fait plus de 18 mois que l'on a quitté l'entreprise
      userAction
        .setInput(ui.seniority.startDate.get(), "01/01/2000")
        .setInput(ui.seniority.notificationDate.get(), "01/01/2012");

      expect(
        rendering.queryByText(
          "La date de notification doit se situer dans les 18 derniers mois"
        )
      ).toBeInTheDocument();

      // validation de l'erreur quand on a saisi une date de notification avant la date de d'entrée
      userAction
        .setInput(ui.seniority.startDate.get(), "01/03/2022")
        .setInput(ui.seniority.notificationDate.get(), "01/01/2022");

      expect(
        rendering.queryByText(
          "La date de notification doit se situer après la date de début de contrat"
        )
      ).toBeInTheDocument();

      // validation de l'erreur quand on a saisi une date de sortie avant la date de notification
      userAction
        .setInput(ui.seniority.startDate.get(), "01/01/2010")
        .setInput(ui.seniority.endDate.get(), "01/01/2021");

      expect(
        rendering.queryByText(
          "La date de notification doit se situer avant la date de fin de contrat"
        )
      ).toBeInTheDocument();

      userAction
        .setInput(ui.seniority.startDate.get(), "01/01/2022")
        .setInput(ui.seniority.notificationDate.get(), "01/09/2022")
        .setInput(ui.seniority.endDate.get(), "01/10/2022");

      // validation de l'erreur quand on a pas répondu à présence de périodes d'absence
      expect(
        rendering.queryByText("Vous devez répondre à cette question")
      ).toBeInTheDocument();

      // validation de l'erreur quand on a des périodes d'absence mais que l'on a pas saisi le motif de l'absence
      userAction.click(ui.seniority.hasAbsence.oui.get());

      expect(
        rendering.queryByText("Vous devez renseigner tous les champs")
      ).toBeInTheDocument();
      expect(
        rendering.queryByText("Date de début de l'absence")
      ).toBeInTheDocument();

      // validation de l'erreur quand on a des périodes d'absence mais que l'on a pas saisi la durée et la date de l'absence
      userAction.changeInputList(
        ui.seniority.absences.motif(0).get(),
        "Congés sans solde"
      );

      expect(
        rendering.queryByText("Veuillez saisir la durée de l'absence")
      ).toBeInTheDocument();
      expect(
        rendering.queryByText("Veuillez saisir la date de l'absence")
      ).toBeInTheDocument();

      userAction.setInput(ui.seniority.absences.duration(0).get(), "6");
      expect(
        rendering.queryByText("Veuillez saisir la durée de l'absence")
      ).not.toBeInTheDocument();

      // validation de l'erreur quand on a une date d'absence en dehors de la période de présence dans l'entreprise
      userAction.setInput(ui.seniority.absences.date(0).get(), "01/03/1999");
      expect(
        rendering.queryByText(
          "La date de l'absence doit être comprise entre le 01/01/2022 et le 01/10/2022 (dates de début et de fin de contrat)"
        )
      ).toBeInTheDocument();

      // validation de l'erreur quand on a une absence qui réduit la période de présence de l'entreprise à moins de 8 mois
      userAction.setInput(ui.seniority.absences.date(0).get(), "01/02/2022");
      expect(
        rendering.queryByText(
          "La date de l'absence doit être comprise entre le 01/01/2022 et le 01/10/2022 (dates de début et de fin de contrat)"
        )
      ).not.toBeInTheDocument();

      // validation de la disparition des erreurs quand on a tout renseigné
      userAction.setInput(ui.seniority.startDate.get(), "01/02/2000");
      userAction.click(ui.next.get());
      expect(ui.activeStep.query()).toHaveTextContent("Salaires");
    });
  });
  describe("parcours sans la convention collective valider les erreurs", () => {
    let rendering: RenderResult;
    let userAction: UserAction;
    beforeEach(() => {
      rendering = render(
        <CalculateurIndemnite
          icon={""}
          title={""}
          displayTitle={""}
          publicodesRules={loadPublicodesRules("indemnite-licenciement")}
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

    it("Parcours particulier reproduisant un bug sur l'erreur concernant les 8 mois d'ancienneté", () => {
      // validation que l'erreur est toujours présente si je change la période et la durée de l'absence
      userAction
        .setInput(ui.seniority.startDate.get(), "01/01/2022")
        .setInput(ui.seniority.notificationDate.get(), "01/09/2022")
        .setInput(ui.seniority.endDate.get(), "01/09/2022")
        .click(ui.seniority.hasAbsence.oui.get())
        .setInput(ui.seniority.absences.duration(0).get(), "1")
        .click(ui.next.get())
        .click(ui.previous.get())
        .setInput(ui.seniority.notificationDate.get(), "01/10/2022")
        .setInput(ui.seniority.endDate.get(), "01/10/2022")
        .setInput(ui.seniority.absences.duration(0).get(), "6")
        .click(ui.next.get());
      expect(
        rendering.queryByText(
          /L’indemnité de licenciement n’est pas due lorsque l’ancienneté dans l’entreprise est inférieure à 8 mois./
        )
      ).toBeInTheDocument();
    });
  });
});
