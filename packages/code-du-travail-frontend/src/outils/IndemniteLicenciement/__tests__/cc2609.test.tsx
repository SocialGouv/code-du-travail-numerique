import { render, RenderResult } from "@testing-library/react";
import React from "react";
import { CalculateurIndemniteLicenciement } from "../..";
import { ui } from "../../CommonIndemniteDepart/__tests__/ui";
import { UserAction } from "../../../common";

jest.spyOn(Storage.prototype, "setItem");
Storage.prototype.getItem = jest.fn(
  () => `
{
  "url": "https://www.legifrance.gouv.fr/affichIDCC.do?idConvention=KALICONT000018773893",
  "id": "KALICONT000018773893",
  "num": 2609,
  "shortTitle": "Bâtiment ETAM",
  "slug": "2609-batiment-etam",
  "title": "Bâtiment ETAM"
}
`,
);

describe("Indemnité licenciement - CC 2609", () => {
  describe("parcours avec la convention collective pour valider ses spécificités", () => {
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
      userAction.click(ui.introduction.startButton.get());
      userAction.click(ui.contract.type.cdi.get());
      userAction.click(ui.contract.fauteGrave.non.get());
      userAction.click(ui.contract.inaptitude.non.get());
      userAction.click(ui.contract.arretTravail.non.get());
      userAction.click(ui.next.get());
      userAction.click(ui.next.get());
      expect(ui.activeStep.query()).toHaveTextContent("Informations");
    });

    test(`
     - vérification que l'on demande l'age
     - vérification que l'on ne demande pas si le salaire comporte une partie de variable si salaire fixe
     - vérification que l'on n'affiche pas la partie variable sur le résultat
     - vérification que l'on demande si le salaire comporte une partie de variable si salaires différents
     - vérification que l'on affiche la réponse du salaire variable sur l'étape de résultat
     `, () => {
      // vérification que l'on demande l'age
      expect(ui.information.agreement2609.age.query()).toBeInTheDocument();

      userAction.setInput(ui.information.agreement2609.age.get(), "45");
      userAction.click(ui.next.get());
      userAction.setInput(ui.seniority.startDate.get(), "01/01/2000");
      userAction.setInput(ui.seniority.notificationDate.get(), "01/01/2022");
      userAction.setInput(ui.seniority.endDate.get(), "01/03/2022");
      userAction.click(ui.seniority.hasAbsence.non.get());
      userAction.click(ui.next.get());
      expect(ui.activeStep.query()).toHaveTextContent("Salaires");

      userAction.click(ui.salary.hasPartialTime.non.get());

      // vérification que l'on ne demande pas si le salaire comporte une partie de variable si salaire fixe
      userAction.click(ui.salary.hasSameSalary.oui.get());

      expect(
        rendering.queryByText(
          "Les salaires indiqués comportent-ils une partie variable ?",
        ),
      ).not.toBeInTheDocument();

      // vérification que l'on n'affiche pas la partie variable sur le résultat
      userAction.setInput(ui.salary.sameSalaryValue.get(), "2500");
      userAction.click(ui.next.get());

      expect(ui.activeStep.query()).toHaveTextContent("Indemnité");
      expect(
        rendering.queryByText(
          /Les salaires indiqués comportent une partie variable/,
        ),
      ).not.toBeInTheDocument();

      // vérification que l'on demande si le salaire comporte une partie de variable si salaires différents
      userAction.click(ui.previous.get());
      userAction.click(ui.salary.hasSameSalary.non.get());

      expect(
        rendering.queryByText(
          "Les salaires indiqués comportent-ils une partie variable ?",
        ),
      ).toBeInTheDocument();

      // vérification que l'on affiche la réponse du salaire variable sur l'étape de résultat
      userAction.setInput(ui.salary.salaries.getAll()[0], "2500");
      userAction.click(ui.salary.variablePart.oui.get());
      userAction.click(ui.next.get());

      expect(ui.activeStep.query()).toHaveTextContent("Indemnité");
      expect(
        rendering.queryByText(
          /Les salaires indiqués comportent une partie variable/,
        ),
      ).toBeInTheDocument();
    });
  });
});
