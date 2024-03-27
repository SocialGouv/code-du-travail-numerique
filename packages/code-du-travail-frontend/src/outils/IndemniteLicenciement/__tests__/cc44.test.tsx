import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { CalculateurIndemniteLicenciement } from "../../../../src/outils";
import { ui } from "../../CommonIndemniteDepart/__tests__/ui";
import userEvent from "@testing-library/user-event";
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
  describe("parcours avec la convention collective pour valider ses spécificités AVEC PREAVIS", () => {
    beforeEach(() => {
      render(<CalculateurIndemniteLicenciement icon={""} title={""} displayTitle={""} />);
      userEvent.click(ui.introduction.startButton.get());
      userEvent.click(ui.contract.type.cdi.get());
      userEvent.click(ui.contract.fauteGrave.non.get());
      userEvent.click(ui.contract.inaptitude.non.get());
      userEvent.click(ui.contract.arretTravail.non.get());
      userEvent.click(ui.next.get());
      userEvent.click(ui.next.get());
      userEvent.selectOptions(
        ui.information.agreement44.proCategory.get(),
        "Ouvriers et collaborateurs (Groupes I à III)"
      );
      fireEvent.change(ui.information.agreement44.age.get(), {
        target: { value: "38" },
      });
      userEvent.click(ui.next.get());
      fireEvent.change(ui.seniority.startDate.get(), {
        target: { value: "01/01/2000" },
      });
      fireEvent.change(ui.seniority.notificationDate.get(), {
        target: { value: "01/01/2022" },
      });
      fireEvent.change(ui.seniority.endDate.get(), {
        target: { value: "01/03/2022" },
      });
      userEvent.click(ui.seniority.hasAbsence.non.get());
      userEvent.click(ui.next.get());
      // Validation que l'on est bien sur l'étape ancienneté
      expect(ui.activeStep.query()).toHaveTextContent("Salaires");
    });

    test(`
      - vérification que l'on demande si le salaire a eu des primes pour un Ouvriers et collaborateurs (Groupes I à III)
      - vérification que l'on demande si le salaire a eu des primes pour un Agents de maîtrise et techniciens (Groupe IV)
      - vérification que l'on ne demande pas si le salaire a eu des primes pour un Ingénieurs et cadres (Groupe V)
    `, () => {
      // vérification que l'on demande si le salaire a eu des primes pour un Ouvriers et collaborateurs (Groupes I à III)
      userEvent.click(ui.salary.hasPartialTime.non.get());
      userEvent.click(ui.salary.hasSameSalary.oui.get());
      expect(
        screen.queryByText(
          "Les salaires indiqués comportent-ils une partie variable ?"
        )
      ).not.toBeInTheDocument();
      userEvent.click(ui.salary.hasSameSalary.non.get());
      expect(
        screen.queryByText(
          "Les salaires indiqués comportent-ils une partie variable ?"
        )
      ).toBeInTheDocument();

      // vérification que l'on demande si le salaire a eu des primes pour un Agents de maîtrise et techniciens (Groupe IV)
      userEvent.click(ui.previous.get());
      userEvent.click(ui.previous.get());
      userEvent.selectOptions(
        ui.information.agreement44.proCategory.get(),
        "Agents de maîtrise et techniciens (Groupe IV)"
      );
      fireEvent.change(ui.information.agreement44.age.get(), {
        target: { value: "36" },
      });
      userEvent.click(ui.next.get());
      userEvent.click(ui.next.get());
      userEvent.click(ui.salary.hasSameSalary.oui.get());
      expect(
        screen.queryByText(
          "Les salaires indiqués comportent-ils une partie variable ?"
        )
      ).not.toBeInTheDocument();
      userEvent.click(ui.salary.hasSameSalary.non.get());
      expect(
        screen.queryByText(
          "Les salaires indiqués comportent-ils une partie variable ?"
        )
      ).toBeInTheDocument();

      // vérification que l'on demande si le salaire a eu des primes pour un Ingénieurs et cadres (Groupe V)
      userEvent.click(ui.previous.get());
      userEvent.click(ui.previous.get());
      userEvent.selectOptions(
        ui.information.agreement44.proCategory.get(),
        "Ingénieurs et cadres (Groupe V)"
      );
      fireEvent.change(ui.information.agreement44.age.get(), {
        target: { value: "36" },
      });
      userEvent.click(ui.next.get());
      userEvent.click(ui.next.get());
      userEvent.click(ui.salary.hasSameSalary.oui.get());

      expect(
        screen.queryByText(
          "Les salaires indiqués comportent-ils une partie variable ?"
        )
      ).not.toBeInTheDocument();
      userEvent.click(ui.salary.hasSameSalary.non.get());
      expect(
        screen.queryByText(
          "Les salaires indiqués comportent-ils une partie variable ?"
        )
      ).not.toBeInTheDocument();
    });

    test(`Ajout des questions supplémentaires pour le dernier salaire`, () => {
      // vérification que l'on demande si le salaire a eu des primes pour un Ouvriers et collaborateurs (Groupes I à III)
      userEvent.click(ui.salary.hasPartialTime.non.get());
      userEvent.click(ui.salary.hasSameSalary.non.get());
      userEvent.click(ui.salary.variablePart.non.get());
      expect(
        screen.queryByText(
          "Connaissez-vous le montant du dernier salaire perçu (préavis inclus) ?"
        )
      ).toBeInTheDocument();
      userEvent.click(ui.salary.agreement44.knowingLastSalary.oui.get());
      expect(
        screen.queryByText("Salaire et primes perçus au cours du dernier mois")
      ).toBeInTheDocument();
      fireEvent.change(ui.salary.agreement44.salaries.get(), {
        target: { value: "2500" },
      });
      fireEvent.change(ui.salary.agreement44.primes.get(), {
        target: { value: "500" },
      });
      userEvent.click(ui.next.get());
    });
  });

  describe("parcours avec la convention collective pour valider ses spécificités SANS PREAVIS", () => {
    beforeEach(() => {
      render(<CalculateurIndemniteLicenciement icon={""} title={""} displayTitle={""} />);
      userEvent.click(ui.introduction.startButton.get());
      userEvent.click(ui.contract.type.cdi.get());
      userEvent.click(ui.contract.fauteGrave.non.get());
      userEvent.click(ui.contract.inaptitude.non.get());
      userEvent.click(ui.contract.arretTravail.non.get());
      userEvent.click(ui.next.get());
      userEvent.click(ui.next.get());
      userEvent.selectOptions(
        ui.information.agreement44.proCategory.get(),
        "Ouvriers et collaborateurs (Groupes I à III)"
      );
      fireEvent.change(ui.information.agreement44.age.get(), {
        target: { value: "40" },
      });
      userEvent.click(ui.next.get());
      fireEvent.change(ui.seniority.startDate.get(), {
        target: { value: "01/01/2000" },
      });
      fireEvent.change(ui.seniority.notificationDate.get(), {
        target: { value: "01/01/2023" },
      });
      fireEvent.change(ui.seniority.endDate.get(), {
        target: { value: "01/01/2023" },
      });
      userEvent.click(ui.seniority.hasAbsence.non.get());
      userEvent.click(ui.next.get());
      // Validation que l'on est bien sur l'étape ancienneté
      expect(ui.activeStep.query()).toHaveTextContent("Salaires");
    });

    test("Vérification que la cc est privilégié grâce à un salaire de référence conventionnel import", () => {
      userEvent.click(ui.salary.hasPartialTime.non.get());
      userEvent.click(ui.salary.hasSameSalary.non.get());
      fireEvent.change(ui.salary.salaries.getAll()[0], {
        target: { value: "10000" },
      });
      fireEvent.change(ui.salary.salaries.getAll()[1], {
        target: { value: "1000" },
      });
      fireEvent.change(ui.salary.salaries.getAll()[2], {
        target: { value: "1000" },
      });
      fireEvent.change(ui.salary.salaries.getAll()[3], {
        target: { value: "1000" },
      });
      fireEvent.change(ui.salary.salaries.getAll()[4], {
        target: { value: "1000" },
      });
      fireEvent.change(ui.salary.salaries.getAll()[5], {
        target: { value: "1000" },
      });
      fireEvent.change(ui.salary.salaries.getAll()[6], {
        target: { value: "1000" },
      });
      fireEvent.change(ui.salary.salaries.getAll()[7], {
        target: { value: "1000" },
      });
      fireEvent.change(ui.salary.salaries.getAll()[8], {
        target: { value: "1000" },
      });
      fireEvent.change(ui.salary.salaries.getAll()[9], {
        target: { value: "1000" },
      });
      fireEvent.change(ui.salary.salaries.getAll()[10], {
        target: { value: "1000" },
      });
      fireEvent.change(ui.salary.salaries.getAll()[11], {
        target: { value: "1000" },
      });
      userEvent.click(ui.salary.variablePart.non.get());
      userEvent.click(ui.next.get());
      expect(ui.activeStep.query()).toHaveTextContent("Indemnité");
      expect(ui.result.resultat.get()).toHaveTextContent("69000 €");
    });
  });

  describe("parcours avec une date d'arrêt", () => {
    beforeEach(() => {
      render(<CalculateurIndemniteLicenciement icon={""} title={""} displayTitle={""} />);
    });

    test(`ne doit pas afficher la question sur le salaire pour le dernier mois`, () => {
      userEvent.click(ui.introduction.startButton.get());
      userEvent.click(ui.contract.type.cdi.get());
      userEvent.click(ui.contract.fauteGrave.non.get());
      userEvent.click(ui.contract.inaptitude.non.get());
      userEvent.click(ui.contract.arretTravail.oui.get());
      fireEvent.change(ui.contract.dateArretTravail.get(), {
        target: { value: "01/09/2022" },
      });
      userEvent.click(ui.next.get());
      userEvent.click(ui.next.get());
      userEvent.selectOptions(
        ui.information.agreement44.proCategory.get(),
        "Ouvriers et collaborateurs (Groupes I à III)"
      );
      fireEvent.change(ui.information.agreement44.age.get(), {
        target: { value: "38" },
      });
      userEvent.click(ui.next.get());
      fireEvent.change(ui.seniority.startDate.get(), {
        target: { value: "01/01/2000" },
      });
      fireEvent.change(ui.seniority.notificationDate.get(), {
        target: { value: "01/01/2023" },
      });
      fireEvent.change(ui.seniority.endDate.get(), {
        target: { value: "01/03/2023" },
      });
      userEvent.click(ui.seniority.hasAbsence.non.get());
      userEvent.click(ui.next.get());
      userEvent.click(ui.salary.hasPartialTime.non.get());
      userEvent.click(ui.salary.hasSameSalary.non.get());
      userEvent.click(ui.salary.variablePart.non.get());
      expect(
        screen.queryByText(
          "Connaissez-vous le montant du dernier salaire perçu (préavis inclus) ?"
        )
      ).not.toBeInTheDocument();
    });
  });

  test("parcours avec la convention collective pour valider le résultat", () => {
    render(<CalculateurIndemniteLicenciement icon={""} title={""} displayTitle={""} />);
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
      .setInput(ui.salary.salaries.getAll()[8], "3530")
      .setInput(ui.salary.salaries.getAll()[9], "3510")
      .setInput(ui.salary.salaries.getAll()[10], "3580")
      .setInput(ui.salary.salaries.getAll()[11], "3362")
      .click(ui.salary.variablePart.oui.get())
      .click(ui.next.get());

    expect(ui.activeStep.query()).toHaveTextContent("Indemnité");
    expect(ui.result.resultat.get()).toHaveTextContent("12232,5");
    expect(ui.result.resultatAgreement.get()).toHaveTextContent("12232.5");
  });
});
