import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { CalculateurIndemnitePrecarite } from "../IndemnitePrecariteSimulator";
import { ui } from "./ui";

beforeEach(() => {
  // Mock localStorage
  Object.defineProperty(window, "localStorage", {
    value: {
      getItem: jest.fn(() => null),
      setItem: jest.fn(() => null),
      removeItem: jest.fn(() => null),
      clear: jest.fn(() => null),
    },
    writable: true,
  });

  render(<CalculateurIndemnitePrecarite title="Test Indemnité de Précarité" />);

  // Naviguer jusqu'à l'étape "Informations générales"
  // 1. Cliquer sur "Commencer" pour passer à l'étape Convention collective
  fireEvent.click(ui.introduction.startButton.get());

  // 2. Sélectionner "Je ne souhaite pas renseigner ma convention collective" et passer à l'étape suivante
  fireEvent.click(
    screen.getByText(
      "Je ne souhaite pas renseigner ma convention collective (je passe l'étape)."
    )
  );
  fireEvent.click(ui.next.get());
});

describe("SimulateurIndemnitePrecarite - Sans Convention Collective", () => {
  describe("Étape 3/5 - informations générales", () => {
    it("devrait afficher une erreur si aucun type de contrat n'est sélectionné", () => {
      // Cliquer sur suivant sans sélectionner de type de contrat
      fireEvent.click(ui.next.get());

      // Vérifier qu'un message d'erreur s'affiche
      expect(
        screen.getByText("Veuillez sélectionner un type de contrat")
      ).toBeInTheDocument();
    });

    it("Scénario CDD complet", () => {
      fireEvent.click(ui.contractType.cdd.get());

      expect(ui.contractType.cdd.get()).toBeChecked();

      expect(ui.cddType.get()).toBeInTheDocument();

      fireEvent.change(ui.cddType.get(), {
        target: { value: "CDD saisonnier" },
      });

      expect(ui.cddType.get()).toHaveValue("CDD saisonnier");

      fireEvent.change(ui.cddType.get(), {
        target: { value: "Autres" },
      });

      expect(ui.cddType.get()).toHaveValue("Autres");

      expect(
        ui.cddQuestions.finContratPeriodeDessai.non.get()
      ).toBeInTheDocument();

      fireEvent.click(ui.cddQuestions.finContratPeriodeDessai.non.get());

      expect(ui.cddQuestions.finContratPeriodeDessai.non.get()).toBeChecked();

      fireEvent.click(ui.cddQuestions.propositionCDIFindeContrat.non.get());
      fireEvent.click(ui.cddQuestions.refusCDIFindeContrat.non.get());
      fireEvent.click(ui.cddQuestions.interruptionFauteGrave.non.get());
      fireEvent.click(ui.cddQuestions.refusRenouvellementAuto.non.get());

      fireEvent.click(ui.next.get());

      expect(
        screen.getByText(
          "Comment souhaitez-vous indiquer la rémunération perçue pendant le contrat de travail ?"
        )
      ).toBeInTheDocument();
    });

    it("Scénario CTT complet", () => {
      fireEvent.click(ui.contractType.ctt.get());

      expect(ui.contractType.ctt.get()).toBeChecked();

      fireEvent.click(ui.cttQuestions.cttFormation.non.get());
      fireEvent.click(ui.cttQuestions.ruptureContratFauteGrave.non.get());
      fireEvent.click(ui.cttQuestions.propositionCDIFinContrat.non.get());
      fireEvent.click(ui.cttQuestions.refusSouplesse.non.get());

      fireEvent.click(ui.next.get());

      expect(
        screen.getByText(
          "Comment souhaitez-vous indiquer la rémunération perçue pendant le contrat de travail ?"
        )
      ).toBeInTheDocument();
    });
  });

  describe("Étape 4/5 - Rémunération", () => {
    beforeEach(() => {
      // Naviguer jusqu'à l'étape Rémunération
      fireEvent.click(ui.contractType.cdd.get());
      fireEvent.change(ui.cddType.get(), {
        target: { value: "Autres" },
      });

      // Répondre à toutes les questions CDD avec "Non"
      fireEvent.click(ui.cddQuestions.finContratPeriodeDessai.non.get());
      fireEvent.click(ui.cddQuestions.propositionCDIFindeContrat.non.get());
      fireEvent.click(ui.cddQuestions.refusCDIFindeContrat.non.get());
      fireEvent.click(ui.cddQuestions.interruptionFauteGrave.non.get());
      fireEvent.click(ui.cddQuestions.refusRenouvellementAuto.non.get());

      fireEvent.click(ui.next.get());
    });

    describe("Scénario où il complète le montant total des salaires à l'étape rémunération", () => {
      it("devrait permettre de sélectionner le montant total et saisir un montant", () => {
        // Sélectionner le type "montant total"
        fireEvent.click(ui.remuneration.typeRemuneration.total.get());

        // Vérifier que l'option est sélectionnée
        expect(ui.remuneration.typeRemuneration.total.get()).toBeChecked();

        // Vérifier que le champ de saisie du montant total apparaît
        expect(ui.remuneration.salaireTotal.get()).toBeInTheDocument();

        // Saisir un montant
        fireEvent.change(ui.remuneration.salaireTotal.get(), {
          target: { value: "25000" },
        });

        // Vérifier que la valeur est bien saisie
        expect(ui.remuneration.salaireTotal.get()).toHaveValue(25000);
      });

      it("devrait afficher une erreur si le montant total n'est pas renseigné", () => {
        // Sélectionner le type "montant total" mais ne pas saisir de montant
        fireEvent.click(ui.remuneration.typeRemuneration.total.get());
        fireEvent.click(ui.next.get());

        // Vérifier qu'un message d'erreur s'affiche
        expect(
          screen.getByText(
            "Veuillez saisir un montant total valide supérieur à 0"
          )
        ).toBeInTheDocument();
      });

      it("devrait permettre de naviguer vers l'étape suivante avec un montant valide", () => {
        // Sélectionner le type "montant total" et saisir un montant
        fireEvent.click(ui.remuneration.typeRemuneration.total.get());
        fireEvent.change(ui.remuneration.salaireTotal.get(), {
          target: { value: "25000" },
        });

        // Cliquer sur suivant
        fireEvent.click(ui.next.get());

        // Vérifier qu'on arrive à l'étape suivante (Résultat)
        expect(screen.getByText("Résultat")).toBeInTheDocument();
      });
    });

    describe("Scénario où on fait la somme de salaires mensuels à l'étape rémunération", () => {
      it("devrait permettre de sélectionner le type salaire mensuel", () => {
        // Sélectionner le type "salaire mensuel"
        fireEvent.click(ui.remuneration.typeRemuneration.mensuel.get());

        // Vérifier que l'option est sélectionnée
        expect(ui.remuneration.typeRemuneration.mensuel.get()).toBeChecked();

        // Vérifier qu'un champ de salaire mensuel apparaît par défaut
        expect(ui.remuneration.salaireMensuel(1).get()).toBeInTheDocument();
      });

      it("devrait permettre d'ajouter et supprimer des salaires mensuels", () => {
        // Sélectionner le type "salaire mensuel"
        fireEvent.click(ui.remuneration.typeRemuneration.mensuel.get());

        expect(ui.remuneration.salaireMensuel(1).get()).toBeInTheDocument();
        expect(ui.remuneration.salaireMensuel(2).get()).toBeInTheDocument();

        fireEvent.click(ui.remuneration.addSalaire.get());
        expect(ui.remuneration.salaireMensuel(3).get()).toBeInTheDocument();
        expect(
          ui.remuneration.salaireMensuel(4).query()
        ).not.toBeInTheDocument();

        fireEvent.click(ui.remuneration.removeSalaire(3).get());

        expect(
          ui.remuneration.salaireMensuel(3).query()
        ).not.toBeInTheDocument();
      });

      it("devrait afficher une erreur si aucun salaire mensuel n'est renseigné", () => {
        // Sélectionner le type "salaire mensuel" mais ne pas saisir de montant
        fireEvent.click(ui.remuneration.typeRemuneration.mensuel.get());
        fireEvent.click(ui.next.get());

        // Vérifier qu'un message d'erreur s'affiche
        expect(
          screen.getByText(
            "Veuillez saisir au moins 2 salaires mensuels valides"
          )
        ).toBeInTheDocument();
      });

      it("devrait permettre de naviguer vers l'étape suivante avec des salaires valides", () => {
        // Sélectionner le type "salaire mensuel" et saisir des montants
        fireEvent.click(ui.remuneration.typeRemuneration.mensuel.get());
        fireEvent.change(ui.remuneration.salaireMensuel(1).get(), {
          target: { value: "2500" },
        });

        // Ajouter un deuxième salaire
        fireEvent.click(ui.remuneration.addSalaire.get());
        fireEvent.change(ui.remuneration.salaireMensuel(2).get(), {
          target: { value: "2600" },
        });

        // Cliquer sur suivant
        fireEvent.click(ui.next.get());

        // Vérifier qu'on arrive à l'étape suivante (Résultat)
        expect(screen.getByText("Résultat")).toBeInTheDocument();
      });
    });
  });

  describe("Étape 5/5 - Résultat", () => {
    beforeEach(() => {
      // Étape Informations - Sélectionner CTT
      fireEvent.click(ui.contractType.ctt.get());

      // Répondre à toutes les questions CTT avec "Non"
      fireEvent.click(ui.cttQuestions.cttFormation.non.get());
      fireEvent.click(ui.cttQuestions.ruptureContratFauteGrave.non.get());
      fireEvent.click(ui.cttQuestions.propositionCDIFinContrat.non.get());
      fireEvent.click(ui.cttQuestions.refusSouplesse.non.get());
      fireEvent.click(ui.next.get());
    });
    it("devrait permettre un parcours avec salaires mensuels", () => {
      expect(
        screen.getByText(
          "Comment souhaitez-vous indiquer la rémunération perçue pendant le contrat de travail ?"
        )
      ).toBeInTheDocument();

      fireEvent.click(ui.remuneration.typeRemuneration.mensuel.get());
      fireEvent.change(ui.remuneration.salaireMensuel(1).get(), {
        target: { value: "2500" },
      });

      fireEvent.click(ui.remuneration.addSalaire.get());
      fireEvent.change(ui.remuneration.salaireMensuel(2).get(), {
        target: { value: "2600" },
      });

      fireEvent.click(ui.remuneration.addSalaire.get());
      fireEvent.change(ui.remuneration.salaireMensuel(3).get(), {
        target: { value: "2700" },
      });

      fireEvent.click(ui.next.get());

      expect(screen.getByText("Résultat")).toBeInTheDocument();
    });

    it("devrait permettre un parcours avec montant total", () => {
      expect(
        screen.getByText(
          "Comment souhaitez-vous indiquer la rémunération perçue pendant le contrat de travail ?"
        )
      ).toBeInTheDocument();
      fireEvent.click(ui.remuneration.typeRemuneration.total.get());
      fireEvent.change(ui.remuneration.salaireTotal.get(), {
        target: { value: "15000" },
      });

      fireEvent.click(ui.next.get());
      expect(screen.getByText("Résultat")).toBeInTheDocument();
    });
  });
});
