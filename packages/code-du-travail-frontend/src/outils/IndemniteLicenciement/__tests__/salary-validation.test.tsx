import { render, screen } from "@testing-library/react";
import React from "react";
import { CalculateurIndemniteLicenciement } from "../../../../src/outils";
import { ui } from "../../CommonIndemniteDepart/__tests__/ui";
import { UserAction } from "../../../common";

jest.spyOn(Storage.prototype, "setItem");
jest.spyOn(Storage.prototype, "getItem");

describe("Indemnité licenciement - Step salaire", () => {
  let userAction: UserAction;
  describe("validation de la step salaire", () => {
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
      userAction.click(ui.agreement.noAgreement.get());
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
      userAction.click(ui.next.get());
      expect(
        screen.queryByText("Vous devez répondre à cette question")
      ).toBeInTheDocument();

      // vérification que l'on affiche un message à noter quand on a des périodes d'alternances
      userAction.click(ui.salary.hasPartialTime.oui.get());
      expect(screen.queryByText("À noter")).toBeInTheDocument();
      expect(
        screen.queryByText(
          "Le calcul de l’indemnité de licenciement dans le cas d’une alternance de temps plein et de temps partiel est actuellement en cours de développement."
        )
      ).toBeInTheDocument();

      // vérification que le message disparait quand on n'a pas de périodes d'alternances
      userAction.click(ui.salary.hasPartialTime.non.get());
      expect(screen.queryByText("À noter")).not.toBeInTheDocument();

      // vérification que l'on demande si le salaire a été le même sur les 12 derniers mois
      expect(
        screen.queryByText(
          "Le salaire mensuel brut a-t-il été le même durant les 12 derniers mois précédant la notification du licenciement ?"
        )
      ).toBeInTheDocument();

      // vérification que l'on affiche un champ pour saisir son salaire s'il a été identique
      userAction.click(ui.salary.hasSameSalary.oui.get());
      expect(ui.salary.sameSalaryValue.query()).toBeInTheDocument();

      // vérification que l'on affiche un message d'erreur si l'on a pas saisi le salaire
      userAction.click(ui.next.get());
      expect(
        screen.queryByText("Vous devez répondre à cette question")
      ).toBeInTheDocument();

      // vérification que l'on affiche 12 champs pour saisir son salaire avec 3 champs prime s'il n'a pas été identique
      userAction.click(ui.salary.hasSameSalary.non.get());
      expect(ui.salary.salaries.queryAll()).toHaveLength(12);
      expect(ui.salary.primes.queryAll()).toHaveLength(3);

      // vérification que l'on affiche un message d'erreur si l'on n'a pas saisi les salaires
      userAction.click(ui.next.get());
      expect(
        screen.queryByText("Vous devez compléter l'ensemble des champs")
      ).toBeInTheDocument();

      // vérification que les primes ne sont pas obligatoires
      ui.salary.salaries.getAll().forEach((input) => {
        userAction.setInput(input, "1000");
      });
      userAction.click(ui.next.get());
      expect(
        screen.queryByText("Vous devez compléter l'ensemble des champs")
      ).not.toBeInTheDocument();
      expect(ui.activeStep.query()).toHaveTextContent("Indemnité");
      expect(ui.result.salaryTableRows.getAll().length).toBe(12);
      expect(ui.result.salaryTableRows.getAll()[0]).toHaveTextContent(
        "décembre 20211 000,00 €"
      );

      // vérification que si on indique une prime, les autres ne sont pas obligatoires
      userAction.click(ui.previous.get());
      userAction.setInput(ui.salary.primes.getAll()[1], "100");
      userAction.click(ui.next.get());
      expect(ui.activeStep.query()).toHaveTextContent("Indemnité");
      expect(ui.result.salaryTableRows.getAll().length).toBe(12);
      expect(ui.result.salaryTableRows.getAll()[0]).toHaveTextContent(
        "décembre 20211 000,00 €"
      );
      expect(ui.result.salaryTableRows.getAll()[1]).toHaveTextContent(
        "novembre 20211 000,00 €100,00 €"
      );
      // vérification que si l'on change un montant et supprime la prime, on ne bloque pas l'utilisateur
      userAction.click(ui.previous.get());
      userAction.setInput(ui.salary.salaries.getAll()[2], "1500");
      userAction.setInput(ui.salary.primes.getAll()[1], "");
      userAction.click(ui.next.get());
      expect(ui.activeStep.query()).toHaveTextContent("Indemnité");

    });

    test("Vérification qu'un salaire ne peut pas être inférieur à 0 dans le champ où on saisit plusieurs salaires pour chaque mois", () => {
      userAction.click(ui.salary.hasPartialTime.non.get());
      userAction.click(ui.salary.hasSameSalary.non.get());
      ui.salary.salaries.getAll().forEach((input) => {
        userAction.setInput(input, "0");
      });
      userAction.click(ui.next.get());
      expect(
        screen.queryByText("Vous devez saisir un montant supérieur à zéro")
      ).toBeInTheDocument();
      // Avec les bonnes valeurs
      ui.salary.salaries.getAll().forEach((input) => {
        userAction.setInput(input, "1000");
      });
      userAction.click(ui.next.get());
      expect(ui.activeStep.query()).toHaveTextContent("Indemnité");
    });

    test("Vérification qu'un salaire ne peut pas être inférieur à 0 dans le champ où on saisit un seul salaire", () => {
      userAction.click(ui.salary.hasPartialTime.non.get());
      userAction.click(ui.salary.hasSameSalary.oui.get());
      userAction.setInput(ui.salary.sameSalaryValue.get(), "0");
      userAction.click(ui.next.get());
      expect(
        screen.queryByText("Vous devez saisir un montant supérieur à zéro")
      ).toBeInTheDocument();
      // Avec les bonnes valeurs
      userAction.setInput(ui.salary.sameSalaryValue.get(), "1000");
      userAction.click(ui.next.get());
      expect(ui.activeStep.query()).toHaveTextContent("Indemnité");
    });
  });
});
