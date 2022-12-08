import { fireEvent, render, RenderResult } from "@testing-library/react";
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
  "url": "https://www.legifrance.gouv.fr/affichIDCC.do?idConvention=KALICONT000018773893",
  "id": "KALICONT000018773893",
  "num": 2609,
  "shortTitle": "Bâtiment ETAM",
  "slug": "2609-batiment-etam",
  "title": "Bâtiment ETAM"
}
`
);

describe("Indemnité licenciement - CC 2609", () => {
  describe("parcours avec la convention collective pour valider ses spécificités", () => {
    let rendering: RenderResult;
    beforeEach(() => {
      rendering = render(
        <CalculateurIndemnite
          icon={""}
          title={""}
          displayTitle={""}
          publicodesRules={loadPublicodesRules("indemnite-licenciement")}
        />
      );
      fireEvent.click(ui.introduction.startButton.get());
      fireEvent.click(ui.contract.type.cdi.get());
      fireEvent.click(ui.contract.fauteGrave.non.get());
      fireEvent.click(ui.contract.inaptitude.non.get());
      fireEvent.click(ui.next.get());
      fireEvent.click(ui.next.get());
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

      fireEvent.change(ui.information.agreement2609.age.get(), {
        target: { value: "45" },
      });
      fireEvent.click(ui.next.get());
      fireEvent.change(ui.seniority.startDate.get(), {
        target: { value: "01/01/2000" },
      });
      fireEvent.change(ui.seniority.notificationDate.get(), {
        target: { value: "01/01/2022" },
      });
      fireEvent.change(ui.seniority.endDate.get(), {
        target: { value: "01/03/2022" },
      });
      fireEvent.click(ui.seniority.hasAbsence.non.get());
      fireEvent.click(ui.next.get());
      expect(ui.activeStep.query()).toHaveTextContent("Salaires");

      fireEvent.click(ui.salary.hasPartialTime.non.get());

      // vérification que l'on ne demande pas si le salaire comporte une partie de variable si salaire fixe
      fireEvent.click(ui.salary.hasSameSalary.oui.get());

      expect(
        rendering.queryByText(
          "Les salaires indiqués comportent-ils une partie variable ?"
        )
      ).not.toBeInTheDocument();

      // vérification que l'on n'affiche pas la partie variable sur le résultat
      fireEvent.change(ui.salary.sameSalaryValue.get(), {
        target: { value: "2500" },
      });
      fireEvent.click(ui.next.get());

      expect(ui.activeStep.query()).toHaveTextContent("Indemnité");
      expect(
        rendering.queryByText(
          /Les salaires indiqués comportent une partie variable/
        )
      ).not.toBeInTheDocument();

      // vérification que l'on demande si le salaire comporte une partie de variable si salaires différents
      fireEvent.click(ui.previous.get());
      fireEvent.click(ui.salary.hasSameSalary.non.get());

      expect(
        rendering.queryByText(
          "Les salaires indiqués comportent-ils une partie variable ?"
        )
      ).toBeInTheDocument();

      // vérification que l'on affiche la réponse du salaire variable sur l'étape de résultat
      fireEvent.change(ui.salary.salaries.getAll()[0], {
        target: { value: "2500" },
      });
      fireEvent.click(ui.salary.variablePart.oui.get());
      fireEvent.click(ui.next.get());

      expect(ui.activeStep.query()).toHaveTextContent("Indemnité");
      expect(
        rendering.queryByText(
          /Les salaires indiqués comportent une partie variable/
        )
      ).toBeInTheDocument();
    });
  });
});
