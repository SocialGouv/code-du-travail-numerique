import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { CalculateurPreavisLicenciement } from "../PreavisLicenciementSimulator";
import { ui } from "./ui";

beforeEach(() => {
  Object.defineProperty(window, "localStorage", {
    value: {
      getItem: jest.fn(() => null),
      setItem: jest.fn(() => null),
      removeItem: jest.fn(() => null),
      clear: jest.fn(() => null),
    },
    writable: true,
  });

  render(
    <CalculateurPreavisLicenciement title="Test Préavis de Licenciement" />
  );

  // Commencer le simulateur (étape introduction)
  fireEvent.click(ui.introduction.startButton.get());
});

describe("SimulateurPreavisLicenciement - Sans Convention Collective", () => {
  describe("Étape - Situation du salarié", () => {
    it("devrait afficher une erreur si aucune réponse n'est sélectionnée pour la faute grave", () => {
      fireEvent.click(ui.next.get());

      expect(
        screen.getByText(
          "Veuillez indiquer si le licenciement est pour faute grave"
        )
      ).toBeInTheDocument();
    });

    it("Scénario licenciement pour faute grave - bouton désactivé", () => {
      fireEvent.click(ui.situation.fauteGraveOui.get());

      expect(ui.situation.fauteGraveOui.get()).toBeChecked();

      expect(
        screen.getByText("Pas de préavis en cas de faute grave")
      ).toBeInTheDocument();

      // Le bouton suivant reste désactivé pour faute grave
      expect(ui.next.get()).toBeDisabled();
    });

    it("Scénario licenciement sans faute grave - salarié handicapé", () => {
      fireEvent.click(ui.situation.fauteGraveNon.get());

      expect(ui.situation.fauteGraveNon.get()).toBeChecked();

      // Question sur le handicap apparaît
      expect(
        screen.getByText(
          "Le salarié concerné est-il reconnu en tant que travailleur handicapé ?"
        )
      ).toBeInTheDocument();

      fireEvent.click(ui.situation.handicapOui.get());

      expect(ui.situation.handicapOui.get()).toBeChecked();

      // Question sur l'ancienneté apparaît
      expect(screen.getByText("Ancienneté du salarié")).toBeInTheDocument();

      fireEvent.change(ui.situation.seniority.get(), {
        target: { value: "'Plus de 2 ans'" },
      });

      expect(ui.situation.seniority.get()).toHaveValue("'Plus de 2 ans'");

      fireEvent.click(ui.next.get());

      // Passe à l'étape convention collective
      expect(
        screen.getByText(
          "Quel est le nom de la convention collective applicable ?"
        )
      ).toBeInTheDocument();
    });

    it("Scénario licenciement sans faute grave - salarié non handicapé", () => {
      fireEvent.click(ui.situation.fauteGraveNon.get());
      fireEvent.click(ui.situation.handicapNon.get());

      expect(ui.situation.handicapNon.get()).toBeChecked();

      fireEvent.change(ui.situation.seniority.get(), {
        target: { value: "'6 mois à moins de 2 ans'" },
      });

      fireEvent.click(ui.next.get());

      expect(
        screen.getByText(
          "Quel est le nom de la convention collective applicable ?"
        )
      ).toBeInTheDocument();
    });
  });

  describe("Étape - Convention collective", () => {
    beforeEach(() => {
      fireEvent.click(ui.situation.fauteGraveNon.get());
      fireEvent.click(ui.situation.handicapNon.get());
      fireEvent.change(ui.situation.seniority.get(), {
        target: { value: "'Plus de 2 ans'" },
      });
      fireEvent.click(ui.next.get());
    });

    it("devrait permettre de passer l'étape convention collective", () => {
      expect(
        screen.getByText(
          "Quel est le nom de la convention collective applicable ?"
        )
      ).toBeInTheDocument();

      fireEvent.click(ui.agreement.skipAgreement.get());
      fireEvent.click(ui.next.get());

      // Va directement au résultat (l'étape informations est sautée)
      expect(screen.getByText("Résultat")).toBeInTheDocument();
      expect(screen.getByText("Préavis de licenciement")).toBeInTheDocument();
    });
  });

  describe("Étape - Résultat", () => {
    beforeEach(() => {
      fireEvent.click(ui.situation.fauteGraveNon.get());
      fireEvent.click(ui.situation.handicapNon.get());
      fireEvent.change(ui.situation.seniority.get(), {
        target: { value: "'Plus de 2 ans'" },
      });
      fireEvent.click(ui.next.get());

      fireEvent.click(ui.agreement.skipAgreement.get());
      fireEvent.click(ui.next.get());
    });

    it("devrait afficher le résultat du calcul", () => {
      expect(screen.getByText("Résultat")).toBeInTheDocument();
      expect(screen.getByText("Préavis de licenciement")).toBeInTheDocument();

      // Vérifie qu'il y a un résultat affiché
      expect(ui.result.get()).toBeInTheDocument();

      // Vérifie qu'on a le bouton d'impression
      expect(ui.print.get()).toBeInTheDocument();

      // Vérifie les détails du calcul
      expect(screen.getByText("Détail du calcul")).toBeInTheDocument();
    });

    it("devrait afficher les éléments saisis corrects", () => {
      expect(screen.getByTestId("situation-seniority")).toBeInTheDocument();
      expect(
        screen.getByTestId("situation-serious-misconduct")
      ).toBeInTheDocument();
      expect(
        screen.getByTestId("situation-convention-collective")
      ).toBeInTheDocument();

      // Vérifie les valeurs affichées
      expect(screen.getByText("Plus de 2 ans")).toBeInTheDocument();
      expect(ui.result.get()).toHaveTextContent("2 mois");
      expect(screen.getByText("Non")).toBeInTheDocument(); // pour faute grave
      expect(screen.getByText("Code du travail")).toBeInTheDocument();
    });

    it("devrait afficher le bon résultat", () => {
      expect(ui.result.get()).toHaveTextContent("2 mois");
    });
  });

  describe("Étape - Résultat (si handicapé)", () => {
    it("devrait afficher le bon résultat", () => {
      fireEvent.click(ui.situation.fauteGraveNon.get());
      fireEvent.click(ui.situation.handicapOui.get());
      fireEvent.change(ui.situation.seniority.get(), {
        target: { value: "'Plus de 2 ans'" },
      });
      fireEvent.click(ui.next.get());

      fireEvent.click(ui.agreement.skipAgreement.get());
      fireEvent.click(ui.next.get());
      expect(ui.result.get()).toHaveTextContent("3 mois");
    });
  });
});
