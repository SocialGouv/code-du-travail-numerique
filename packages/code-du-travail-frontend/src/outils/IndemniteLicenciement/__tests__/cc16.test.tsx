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

describe("Indemnité licenciement - CC 16", () => {
  describe("parcours avec la convention collective pour valider ses spécificités", () => {
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
        .click(ui.next.get())
        .setInput(ui.seniority.startDate.get(), "01/01/2000")
        .setInput(ui.seniority.notificationDate.get(), "01/01/2022")
        .setInput(ui.seniority.endDate.get(), "01/03/2022")
        .click(ui.seniority.hasAbsence.non.get())
        .click(ui.next.get());
      // Validation que l'on est bien sur l'étape ancienneté
      expect(ui.activeStep.query()).toHaveTextContent("Salaires");
    });

    test(`
     - vérification que l'on demande si le salaire a eu des primes pour un cadre
     - vérification que l'on demande si le salaire a eu des primes pour un TAM
     - vérification que l'on ne demande pas si le salaire a eu des primes pour un employé
     - vérification que l'on ne demande pas si le salaire a eu des primes pour un ouvrier
    `, () => {
      // vérification que l'on demande si le salaire a eu des primes pour un cadre
      userAction
        .click(ui.salary.hasPartialTime.non.get())
        .click(ui.salary.hasSameSalary.oui.get());

      expect(
        rendering.queryByText(
          "Les salaires indiqués comportent-ils une partie variable ?"
        )
      ).not.toBeInTheDocument();
      userAction.click(ui.salary.hasSameSalary.non.get());
      expect(
        rendering.queryByText(
          "Les salaires indiqués comportent-ils une partie variable ?"
        )
      ).toBeInTheDocument();
      expect(ui.salary.variablePart.oui.query()).toBeInTheDocument();
      expect(ui.salary.variablePart.non.query()).toBeInTheDocument();

      userAction
        .setInput(ui.salary.salaries.getAll()[0], "2500")
        .click(ui.salary.variablePart.oui.get())
        .click(ui.next.get());

      expect(
        rendering.queryByText(
          /Les salaires indiqués comportent une partie variable/
        )
      ).toBeInTheDocument();

      // vérification que l'on demande si le salaire a eu des primes pour un TAM
      userAction
        .click(ui.previous.get())
        .click(ui.previous.get())
        .click(ui.previous.get())
        .changeInputList(
          ui.information.agreement16.proCategory.get(),
          "Technicien et agents de maîtrise (TAM)"
        )
        .setInput(ui.information.agreement16.agentAge.get(), "36")
        .click(ui.next.get())
        .click(ui.next.get())
        .click(ui.salary.hasSameSalary.oui.get());

      expect(
        rendering.queryByText(
          "Les salaires indiqués comportent-ils une partie variable ?"
        )
      ).not.toBeInTheDocument();
      userAction.click(ui.salary.hasSameSalary.non.get());
      expect(
        rendering.queryByText(
          "Les salaires indiqués comportent-ils une partie variable ?"
        )
      ).toBeInTheDocument();
      expect(ui.salary.variablePart.oui.query()).toBeInTheDocument();
      expect(ui.salary.variablePart.non.query()).toBeInTheDocument();

      userAction
        .setInput(ui.salary.salaries.getAll()[0], "2500")
        .click(ui.salary.variablePart.oui.get())
        .click(ui.next.get());

      expect(
        rendering.queryByText(
          /Les salaires indiqués comportent une partie variable/
        )
      ).toBeInTheDocument();

      // vérification que l'on demande si le salaire a eu des primes pour un employé
      userAction
        .click(ui.previous.get())
        .click(ui.previous.get())
        .click(ui.previous.get())
        .changeInputList(
          ui.information.agreement16.proCategory.get(),
          "Employés"
        )
        .setInput(ui.information.agreement16.employeeAge.get(), "36")
        .click(ui.next.get())
        .click(ui.next.get())
        .click(ui.salary.hasSameSalary.oui.get());

      expect(
        rendering.queryByText(
          "Les salaires indiqués comportent-ils une partie variable ?"
        )
      ).not.toBeInTheDocument();
      userAction.click(ui.salary.hasSameSalary.non.get());
      expect(
        rendering.queryByText(
          "Les salaires indiqués comportent-ils une partie variable ?"
        )
      ).not.toBeInTheDocument();
      expect(ui.salary.variablePart.oui.query()).not.toBeInTheDocument();
      expect(ui.salary.variablePart.non.query()).not.toBeInTheDocument();

      userAction
        .setInput(ui.salary.salaries.getAll()[0], "2500")
        .click(ui.next.get());

      expect(
        rendering.queryByText(
          /Les salaires indiqués comportent une partie variable/
        )
      ).not.toBeInTheDocument();

      // vérification que l'on demande si le salaire a eu des primes pour un ouvrier
      userAction
        .click(ui.previous.get())
        .click(ui.previous.get())
        .click(ui.previous.get())
        .changeInputList(
          ui.information.agreement16.proCategory.get(),
          "Ouvriers"
        )
        .click(ui.information.agreement16.driveInability.non.get())
        .setInput(ui.information.agreement16.workerAge.get(), "36")
        .click(ui.next.get())
        .click(ui.next.get())
        .click(ui.salary.hasSameSalary.oui.get());

      expect(
        rendering.queryByText(
          "Les salaires indiqués comportent-ils une partie variable ?"
        )
      ).not.toBeInTheDocument();
      userAction.click(ui.salary.hasSameSalary.non.get());
      expect(
        rendering.queryByText(
          "Les salaires indiqués comportent-ils une partie variable ?"
        )
      ).not.toBeInTheDocument();
      expect(ui.salary.variablePart.oui.query()).not.toBeInTheDocument();
      expect(ui.salary.variablePart.non.query()).not.toBeInTheDocument();

      userAction
        .setInput(ui.salary.salaries.getAll()[0], "2500")
        .click(ui.next.get());

      expect(
        rendering.queryByText(
          /Les salaires indiqués comportent une partie variable/
        )
      ).not.toBeInTheDocument();
    });
  });
});
