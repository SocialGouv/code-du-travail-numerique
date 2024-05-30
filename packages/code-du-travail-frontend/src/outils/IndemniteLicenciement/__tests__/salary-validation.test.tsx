import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { CalculateurIndemniteLicenciement } from "../../../../src/outils";
import { ui } from "../../CommonIndemniteDepart/__tests__/ui";
import userEvent from "@testing-library/user-event";

jest.spyOn(Storage.prototype, "setItem");
jest.spyOn(Storage.prototype, "getItem");

describe("Indemnité licenciement - Step salaire", () => {
  describe("validation de la step salaire", () => {
    beforeEach(() => {
      render(
        <CalculateurIndemniteLicenciement
          icon={""}
          title={""}
          displayTitle={""}
        />
      );
      userEvent.click(ui.introduction.startButton.get());
      userEvent.click(ui.contract.type.cdi.get());
      userEvent.click(ui.contract.fauteGrave.non.get());
      userEvent.click(ui.contract.inaptitude.non.get());
      userEvent.click(ui.contract.arretTravail.non.get());
      userEvent.click(ui.next.get());
      userEvent.click(ui.agreement.noAgreement.get());
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
     - vérification que l'on affiche une erreur si on ne répond pas à la première question
     - vérification que l'on affiche un message à noter quand on a des périodes d'alternances
     - vérification que le message disparait quand on n'a pas de périodes d'alternances
     - vérification que l'on demande si le salaire a été le même sur les 12 derniers mois
     - vérification que l'on affiche un champ pour saisir son salaire s'il a été identique
     - vérification que l'on affiche un message d'erreur si l'on n'a pas saisi le salaire
     - vérification que l'on affiche 12 champs pour saisir son salaire avec 3 champs prime s'il n'a pas été identique
     - vérification que l'on affiche un message d'erreur si l'on n'a pas saisi les salaires
     - vérification que les primes ne sont pas obligatoires
     - vérification que si on indique une prime, les autres ne sont pas obligatoires
     - vérification que si l'on change un montant et supprime la prime, on ne bloque pas l'utilisateur
    `, () => {
      // vérification que l'on affiche une erreur si on ne répond pas à la première question
      userEvent.click(ui.next.get());
      expect(
        screen.queryByText("Vous devez répondre à cette question")
      ).toBeInTheDocument();

      // vérification que l'on affiche un message à noter quand on a des périodes d'alternances
      userEvent.click(ui.salary.hasPartialTime.oui.get());
      expect(screen.queryByText("À noter")).toBeInTheDocument();
      expect(
        screen.queryByText(
          "Le calcul de l’indemnité de licenciement dans le cas d’une alternance de temps plein et de temps partiel est actuellement en cours de développement."
        )
      ).toBeInTheDocument();

      // vérification que le message disparait quand on n'a pas de périodes d'alternances
      userEvent.click(ui.salary.hasPartialTime.non.get());
      expect(screen.queryByText("À noter")).not.toBeInTheDocument();

      // vérification que l'on demande si le salaire a été le même sur les 12 derniers mois
      expect(
        screen.queryByText(
          "Le salaire mensuel brut a-t-il été le même durant les 12 derniers mois précédant la notification du licenciement ?"
        )
      ).toBeInTheDocument();

      // vérification que l'on affiche un champ pour saisir son salaire s'il a été identique
      userEvent.click(ui.salary.hasSameSalary.oui.get());
      expect(ui.salary.sameSalaryValue.query()).toBeInTheDocument();

      // vérification que l'on affiche un message d'erreur si l'on a pas saisi le salaire
      userEvent.click(ui.next.get());
      expect(
        screen.queryByText("Vous devez répondre à cette question")
      ).toBeInTheDocument();

      // vérification que l'on affiche 12 champs pour saisir son salaire avec 3 champs prime s'il n'a pas été identique
      userEvent.click(ui.salary.hasSameSalary.non.get());
      expect(ui.salary.salaries.queryAll()).toHaveLength(12);
      expect(ui.salary.primes.queryAll()).toHaveLength(3);

      // vérification que l'on affiche un message d'erreur si l'on n'a pas saisi les salaires
      userEvent.click(ui.next.get());
      expect(
        screen.queryByText("Vous devez compléter l'ensemble des champs")
      ).toBeInTheDocument();

      // vérification que les primes ne sont pas obligatoires
      ui.salary.salaries.getAll().forEach((input) => {
        fireEvent.change(input, { target: { value: "1000" } });
      });
      userEvent.click(ui.next.get());
      expect(
        screen.queryByText("Vous devez compléter l'ensemble des champs")
      ).not.toBeInTheDocument();
      expect(ui.activeStep.query()).toHaveTextContent("Indemnité");
      expect(ui.result.salaryTableRows.getAll().length).toBe(12);
      expect(ui.result.salaryTableRows.getAll()[0]).toHaveTextContent(
        "décembre 20211 000,00 €"
      );

      // vérification que si on indique une prime, les autres ne sont pas obligatoires
      userEvent.click(ui.previous.get());
      fireEvent.change(ui.salary.primes.getAll()[1], {
        target: { value: "100" },
      });
      userEvent.click(ui.next.get());
      expect(ui.activeStep.query()).toHaveTextContent("Indemnité");

      // vérification que si l'on change un montant et supprime la prime, on ne bloque pas l'utilisateur
      userEvent.click(ui.previous.get());
      fireEvent.change(ui.salary.salaries.getAll()[2], {
        target: { value: "1500" },
      });
      fireEvent.change(ui.salary.primes.getAll()[1], {
        target: { value: "" },
      });
      userEvent.click(ui.next.get());
      expect(ui.activeStep.query()).toHaveTextContent("Indemnité");
    });

    test("Vérification qu'un salaire ne peut pas être inférieur à 0 dans le champ où on saisit plusieurs salaires pour chaque mois", () => {
      fireEvent.click(ui.salary.hasPartialTime.non.get());
      fireEvent.click(ui.salary.hasSameSalary.non.get());
      ui.salary.salaries.getAll().forEach((input) => {
        fireEvent.change(input, { target: { value: "0" } });
      });
      userEvent.click(ui.next.get());
      expect(
        screen.queryByText("Vous devez saisir un montant supérieur à zéro")
      ).toBeInTheDocument();
      // Avec les bonnes valeurs
      ui.salary.salaries.getAll().forEach((input) => {
        fireEvent.change(input, { target: { value: "1000" } });
      });
      userEvent.click(ui.next.get());
      expect(ui.activeStep.query()).toHaveTextContent("Indemnité");
    });

    test("Vérification qu'un salaire ne peut pas être inférieur à 0 dans le champ où on saisit un seul salaire", () => {
      fireEvent.click(ui.salary.hasPartialTime.non.get());
      fireEvent.click(ui.salary.hasSameSalary.oui.get());
      fireEvent.change(ui.salary.sameSalaryValue.get(), {
        target: { value: "0" },
      });
      userEvent.click(ui.next.get());
      expect(
        screen.queryByText("Vous devez saisir un montant supérieur à zéro")
      ).toBeInTheDocument();
      // Avec les bonnes valeurs
      fireEvent.change(ui.salary.sameSalaryValue.get(), {
        target: { value: "1000" },
      });
      userEvent.click(ui.next.get());
      expect(ui.activeStep.query()).toHaveTextContent("Indemnité");
    });
  });
});
