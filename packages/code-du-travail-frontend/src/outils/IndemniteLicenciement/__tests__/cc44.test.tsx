import { render, screen } from "@testing-library/react";
import React from "react";
import { CalculateurIndemniteLicenciement } from "../../../../src/outils";
import { ui } from "../../CommonIndemniteDepart/__tests__/ui";
import { UserAction } from "../../../common";

jest.spyOn(Storage.prototype, "setItem");
Storage.prototype.getItem = jest.fn(
  () => `
{
  "url":"https://www.legifrance.gouv.fr/affichIDCC.do?idConvention=KALICONT000005635613",
  "id":"KALICONT000005635613",
  "num":44,
  "shortTitle":"Industries chimiques et connexes",
  "slug":"44-industries-chimiques-et-connexes","title":"Industries chimiques et connexes"}
`
);

describe("Indemnité licenciement - CC 44", () => {
  let userAction: UserAction;
  describe("parcours avec la convention collective pour valider ses spécificités AVEC PREAVIS", () => {
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
      userAction.changeInputList(
        ui.information.agreement44.proCategory.get(),
        "Ouvriers et collaborateurs (Groupes I à III)"
      );
      userAction.setInput(ui.information.agreement44.age.get(), "38");
      userAction.click(ui.next.get());
      userAction.setInput(ui.seniority.startDate.get(), "01/01/2000");
      userAction.setInput(ui.seniority.notificationDate.get(), "01/01/2022");
      userAction.setInput(ui.seniority.endDate.get(), "01/03/2022");
      userAction.click(ui.seniority.hasAbsence.non.get());
      userAction.click(ui.next.get());
      // Validation que l'on est bien sur l'étape ancienneté
      expect(ui.activeStep.query()).toHaveTextContent("Salaires");
    });

    test(`
      - vérification que l'on demande si le salaire a eu des primes pour un Ouvriers et collaborateurs (Groupes I à III)
      - vérification que l'on demande si le salaire a eu des primes pour un Agents de maîtrise et techniciens (Groupe IV)
      - vérification que l'on ne demande pas si le salaire a eu des primes pour un Ingénieurs et cadres (Groupe V)
    `, () => {
      // vérification que l'on demande si le salaire a eu des primes pour un Ouvriers et collaborateurs (Groupes I à III)
      userAction.click(ui.salary.hasPartialTime.non.get());
      userAction.click(ui.salary.hasSameSalary.oui.get());
      expect(
        screen.queryByText(
          "Les salaires indiqués comportent-ils une partie variable ?"
        )
      ).not.toBeInTheDocument();
      userAction.click(ui.salary.hasSameSalary.non.get());
      expect(
        screen.queryByText(
          "Les salaires indiqués comportent-ils une partie variable ?"
        )
      ).toBeInTheDocument();

      // vérification que l'on demande si le salaire a eu des primes pour un Agents de maîtrise et techniciens (Groupe IV)
      userAction.click(ui.previous.get());
      userAction.click(ui.previous.get());
      userAction.changeInputList(
        ui.information.agreement44.proCategory.get(),
        "Agents de maîtrise et techniciens (Groupe IV)"
      );
      userAction.setInput(ui.information.agreement44.age.get(), "36");
      userAction.click(ui.next.get());
      userAction.click(ui.next.get());
      userAction.click(ui.salary.hasSameSalary.oui.get());
      expect(
        screen.queryByText(
          "Les salaires indiqués comportent-ils une partie variable ?"
        )
      ).not.toBeInTheDocument();
      userAction.click(ui.salary.hasSameSalary.non.get());
      expect(
        screen.queryByText(
          "Les salaires indiqués comportent-ils une partie variable ?"
        )
      ).toBeInTheDocument();

      // vérification que l'on demande si le salaire a eu des primes pour un Ingénieurs et cadres (Groupe V)
      userAction.click(ui.previous.get());
      userAction.click(ui.previous.get());
      userAction.changeInputList(
        ui.information.agreement44.proCategory.get(),
        "Ingénieurs et cadres (Groupe V)"
      );
      userAction.setInput(ui.information.agreement44.age.get(), "36");
      userAction.click(ui.next.get());
      userAction.click(ui.next.get());
      userAction.click(ui.salary.hasSameSalary.oui.get());

      expect(
        screen.queryByText(
          "Les salaires indiqués comportent-ils une partie variable ?"
        )
      ).not.toBeInTheDocument();
      userAction.click(ui.salary.hasSameSalary.non.get());
      expect(
        screen.queryByText(
          "Les salaires indiqués comportent-ils une partie variable ?"
        )
      ).not.toBeInTheDocument();
    });

    test(`Ajout des questions supplémentaires pour le dernier salaire`, () => {
      // vérification que l'on demande si le salaire a eu des primes pour un Ouvriers et collaborateurs (Groupes I à III)
      userAction.click(ui.salary.hasPartialTime.non.get());
      userAction.click(ui.salary.hasSameSalary.non.get());
      userAction.click(ui.salary.variablePart.non.get());
      expect(
        screen.queryByText(
          "Connaissez-vous le montant du dernier salaire perçu (préavis inclus) ?"
        )
      ).toBeInTheDocument();
      userAction.click(ui.salary.agreement44.knowingLastSalary.oui.get());
      expect(
        screen.queryByText("Salaire et primes perçus au cours du dernier mois")
      ).toBeInTheDocument();
      userAction.setInput(ui.salary.agreement44.salaries.get(), "2500");
      userAction.setInput(ui.salary.agreement44.primes.get(), "500");
      userAction.click(ui.next.get());
    });
  });

  describe("parcours avec la convention collective pour valider ses spécificités SANS PREAVIS", () => {
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
      userAction.changeInputList(
        ui.information.agreement44.proCategory.get(),
        "Ouvriers et collaborateurs (Groupes I à III)"
      );
      userAction.setInput(ui.information.agreement44.age.get(), "40");
      userAction.click(ui.next.get());
      userAction.setInput(ui.seniority.startDate.get(), "01/01/2000");
      userAction.setInput(ui.seniority.notificationDate.get(), "01/01/2023");
      userAction.setInput(ui.seniority.endDate.get(), "01/01/2023");
      userAction.click(ui.seniority.hasAbsence.non.get());
      userAction.click(ui.next.get());
      // Validation que l'on est bien sur l'étape ancienneté
      expect(ui.activeStep.query()).toHaveTextContent("Salaires");
    });

    test("Vérification que la cc est privilégié grâce à un salaire de référence conventionnel import", () => {
      userAction.click(ui.salary.hasPartialTime.non.get());
      userAction.click(ui.salary.hasSameSalary.non.get());
      userAction.setInput(ui.salary.salaries.getAll()[0], "10000");
      userAction.setInput(ui.salary.salaries.getAll()[1], "1000");
      userAction.setInput(ui.salary.salaries.getAll()[2], "1000");
      userAction.setInput(ui.salary.salaries.getAll()[3], "1000");
      userAction.setInput(ui.salary.salaries.getAll()[4], "1000");
      userAction.setInput(ui.salary.salaries.getAll()[5], "1000");
      userAction.setInput(ui.salary.salaries.getAll()[6], "1000");
      userAction.setInput(ui.salary.salaries.getAll()[7], "1000");
      userAction.setInput(ui.salary.salaries.getAll()[8], "1000");
      userAction.setInput(ui.salary.salaries.getAll()[9], "1000");
      userAction.setInput(ui.salary.salaries.getAll()[10], "1000");
      userAction.setInput(ui.salary.salaries.getAll()[11], "1000");
      userAction.click(ui.salary.variablePart.non.get());
      userAction.click(ui.next.get());
      expect(ui.activeStep.query()).toHaveTextContent("Indemnité");
      expect(ui.result.resultat.get()).toHaveTextContent("69000 €");
    });
  });

  describe("parcours avec une date d'arrêt", () => {
    beforeEach(() => {
      render(
        <CalculateurIndemniteLicenciement
          icon={""}
          title={""}
          displayTitle={""}
        />
      );
      userAction = new UserAction();
    });

    test(`ne doit pas afficher la question sur le salaire pour le dernier mois`, () => {
      userAction.click(ui.introduction.startButton.get());
      userAction.click(ui.contract.type.cdi.get());
      userAction.click(ui.contract.fauteGrave.non.get());
      userAction.click(ui.contract.inaptitude.non.get());
      userAction.click(ui.contract.arretTravail.oui.get());
      userAction.setInput(ui.contract.dateArretTravail.get(), "01/09/2022");
      userAction.click(ui.next.get());
      userAction.click(ui.next.get());
      userAction.changeInputList(
        ui.information.agreement44.proCategory.get(),
        "Ouvriers et collaborateurs (Groupes I à III)"
      );
      userAction.setInput(ui.information.agreement44.age.get(), "38");
      userAction.click(ui.next.get());
      userAction.setInput(ui.seniority.startDate.get(), "01/01/2000");
      userAction.setInput(ui.seniority.notificationDate.get(), "01/01/2023");
      userAction.setInput(ui.seniority.endDate.get(), "01/03/2023");
      userAction.click(ui.seniority.hasAbsence.non.get());
      userAction.click(ui.next.get());
      userAction.click(ui.salary.hasPartialTime.non.get());
      userAction.click(ui.salary.hasSameSalary.non.get());
      userAction.click(ui.salary.variablePart.non.get());
      expect(
        screen.queryByText(
          "Connaissez-vous le montant du dernier salaire perçu (préavis inclus) ?"
        )
      ).not.toBeInTheDocument();
    });
  });

  test("parcours avec la convention collective pour valider le résultat", () => {
    render(
      <CalculateurIndemniteLicenciement
        icon={""}
        title={""}
        displayTitle={""}
      />
    );
    const userAction = new UserAction();
    userAction
      .click(ui.introduction.startButton.get())
      .click(ui.contract.type.cdi.get())
      .click(ui.contract.fauteGrave.non.get())
      .click(ui.contract.inaptitude.non.get())
      .click(ui.contract.arretTravail.non.get())
      .click(ui.next.get())
      .click(ui.next.get())
      .changeInputList(
        ui.information.agreement44.proCategory.get(),
        "Ouvriers et collaborateurs (Groupes I à III)"
      )
      .setInput(ui.information.agreement44.age.get(), "57")
      .click(ui.next.get())
      .setInput(ui.seniority.startDate.get(), "01/01/2019")
      .setInput(ui.seniority.notificationDate.get(), "01/01/2024")
      .setInput(ui.seniority.endDate.get(), "01/01/2024")
      .click(ui.seniority.hasAbsence.non.get())
      .click(ui.next.get())
      .click(ui.salary.hasPartialTime.non.get())
      .click(ui.salary.hasSameSalary.non.get())
      .setInput(ui.salary.salaries.getAll()[0], "3541")
      .setInput(ui.salary.salaries.getAll()[1], "3555")
      .setInput(ui.salary.salaries.getAll()[2], "3512")
      .setInput(ui.salary.salaries.getAll()[3], "3596")
      .setInput(ui.salary.salaries.getAll()[4], "3310")
      .setInput(ui.salary.salaries.getAll()[5], "3554")
      .setInput(ui.salary.salaries.getAll()[6], "3560")
      .setInput(ui.salary.salaries.getAll()[7], "3330")
      .setInput(ui.salary.salaries.getAll()[10], "3580")
      .setInput(ui.salary.salaries.getAll()[11], "3362")
      .click(ui.salary.variablePart.oui.get())
      .click(ui.next.get());

    expect(ui.activeStep.query()).toHaveTextContent("Indemnité");
    expect(ui.result.resultat.get()).toHaveTextContent("12244,75");
    expect(ui.result.resultatAgreement.get()).toHaveTextContent("12244.75");
  });
});
