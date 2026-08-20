import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { CalculateurIndemnitePrecarite } from "../IndemnitePrecariteSimulator";
import { fillContractSteps, fillRemunerationTotal, ui } from "./ui";
import { ISSUE_CONTRAT } from "../types";

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

  render(<CalculateurIndemnitePrecarite title="Test Indemnité de Précarité" />);

  fireEvent.click(ui.introduction.startButton.get());

  fireEvent.click(
    screen.getByText(
      "Je ne souhaite pas renseigner ma convention collective (je passe l'étape)."
    )
  );
  fireEvent.click(ui.next.get());
});

describe("SimulateurIndemnitePrecarite - Sans Convention Collective", () => {
  describe("Étape 3/6 - Type de contrat", () => {
    it("propose uniquement les options génériques", () => {
      expect(ui.cddRemplacement.get()).toBeInTheDocument();
      expect(ui.ctt.get()).toBeInTheDocument();
      expect(ui.autres.get()).toBeInTheDocument();
      expect(
        screen.getByText(
          "Le motif de l'embauche en CDD est obligatoirement indiqué dans le contrat de travail."
        )
      ).toBeInTheDocument();
    });

    it("affiche une erreur si aucun type de contrat n'est sélectionné", () => {
      fireEvent.click(ui.next.get());

      expect(ui.error.contractType.get()).toBeInTheDocument();
    });

    it("« Autres » mène au résultat avec la liste des contrats exclus", () => {
      fireEvent.click(ui.autres.get());
      fireEvent.click(ui.next.get());

      expect(ui.result.noIndemnity.get()).toBeInTheDocument();
      expect(ui.result.noIndemnityMessage.get()).toBeInTheDocument();
      expect(ui.result.excludedContracts.get()).toBeInTheDocument();
      expect(screen.getByText("CDD saisonnier")).toBeInTheDocument();
      expect(
        screen.getByText("CDD dans le cadre d'un congé de mobilité")
      ).toBeInTheDocument();
    });
  });

  describe("Étape 4/6 - Terme du contrat", () => {
    it("n'affiche l'issue du contrat qu'après la première question", () => {
      fireEvent.click(ui.cddRemplacement.get());
      fireEvent.click(ui.next.get());

      expect(ui.issueContrat(ISSUE_CONTRAT.AUTRE).query()).toBeNull();

      fireEvent.click(ui.finALaDatePrevue.oui.get());

      expect(ui.issueContrat(ISSUE_CONTRAT.AUTRE).get()).toBeInTheDocument();
    });

    it("affiche une erreur si les questions ne sont pas renseignées", () => {
      fireEvent.click(ui.cddRemplacement.get());
      fireEvent.click(ui.next.get());
      fireEvent.click(ui.next.get());

      expect(ui.error.finALaDatePrevue.get()).toBeInTheDocument();
    });

    it("propose les issues du chemin CDD quand le contrat va à son terme", () => {
      fireEvent.click(ui.cddRemplacement.get());
      fireEvent.click(ui.next.get());
      fireEvent.click(ui.finALaDatePrevue.oui.get());

      expect(
        ui.issueContrat(ISSUE_CONTRAT.EMBAUCHE_CDI).get()
      ).toBeInTheDocument();
      expect(
        ui.issueContrat(ISSUE_CONTRAT.REFUS_CDI_EQUIVALENT).get()
      ).toBeInTheDocument();
      expect(ui.issueContrat(ISSUE_CONTRAT.REFUS_SOUPLESSE).query()).toBeNull();
    });

    it("propose les issues du chemin CTT quand le contrat va à son terme", () => {
      fireEvent.click(ui.ctt.get());
      fireEvent.click(ui.next.get());
      fireEvent.click(ui.finALaDatePrevue.oui.get());

      expect(
        ui.issueContrat(ISSUE_CONTRAT.REFUS_SOUPLESSE).get()
      ).toBeInTheDocument();
      expect(
        ui.issueContrat(ISSUE_CONTRAT.REFUS_CDI_EQUIVALENT).query()
      ).toBeNull();
    });

    it("propose les issues de rupture anticipée quand le contrat a été rompu", () => {
      fireEvent.click(ui.cddRemplacement.get());
      fireEvent.click(ui.next.get());
      fireEvent.click(ui.finALaDatePrevue.non.get());

      expect(
        ui.issueContrat(ISSUE_CONTRAT.FORCE_MAJEURE).get()
      ).toBeInTheDocument();
      expect(
        ui.issueContrat(ISSUE_CONTRAT.FAUTE_GRAVE).get()
      ).toBeInTheDocument();
      expect(
        ui.issueContrat(ISSUE_CONTRAT.INITIATIVE_SALARIE).get()
      ).toBeInTheDocument();
    });

    it("réinitialise l'issue quand la première question change", () => {
      fireEvent.click(ui.cddRemplacement.get());
      fireEvent.click(ui.next.get());
      fireEvent.click(ui.finALaDatePrevue.oui.get());
      fireEvent.click(ui.issueContrat(ISSUE_CONTRAT.AUTRE).get());

      expect(ui.issueContrat(ISSUE_CONTRAT.AUTRE).get()).toBeChecked();

      fireEvent.click(ui.finALaDatePrevue.non.get());

      expect(ui.issueContrat(ISSUE_CONTRAT.AUTRE).get()).not.toBeChecked();
    });
  });

  describe("Étape 5/6 - Rémunération", () => {
    beforeEach(() => {
      fillContractSteps();
    });

    it("calcule l'indemnité à partir du montant total", () => {
      fillRemunerationTotal(3000);

      expect(ui.result.amount.get()).toHaveTextContent("300,00");
    });

    it("calcule l'indemnité à partir des salaires mensuels", () => {
      fireEvent.click(ui.remuneration.typeRemuneration.mensuel.get());
      fireEvent.change(ui.remuneration.dureeContrat.get(), {
        target: { value: "2" },
      });
      fireEvent.change(ui.remuneration.salaireMensuel(1).get(), {
        target: { value: "1000" },
      });
      fireEvent.change(ui.remuneration.salaireMensuel(2).get(), {
        target: { value: "2000" },
      });
      fireEvent.click(ui.next.get());

      expect(ui.result.amount.get()).toHaveTextContent("300,00");
    });
  });

  describe("Étape 6/6 - Résultat", () => {
    it("affiche le détail du calcul et les références légales", () => {
      fillContractSteps();
      fillRemunerationTotal(3000);

      expect(ui.result.amount.get()).toHaveTextContent("300,00");
      expect(screen.getByText("Détail du calcul")).toBeInTheDocument();
      expect(screen.getByTestId("situation-type-contrat")).toHaveTextContent(
        "CDD de remplacement ou d'accroissement temporaire d'activité"
      );
      expect(
        screen.queryAllByText(/Article L1243-8 du code du travail/)[0]
      ).toBeInTheDocument();
    });

    it.each([
      ["oui" as const, ISSUE_CONTRAT.EMBAUCHE_CDI],
      ["oui" as const, ISSUE_CONTRAT.REFUS_CDI_EQUIVALENT],
      ["non" as const, ISSUE_CONTRAT.FORCE_MAJEURE],
      ["non" as const, ISSUE_CONTRAT.FAUTE_GRAVE],
      ["non" as const, ISSUE_CONTRAT.INITIATIVE_SALARIE],
    ])(
      "n'accorde pas d'indemnité (CDD, fin à la date prévue = %s, issue = %s)",
      (finALaDatePrevue, issueContrat) => {
        fillContractSteps({ finALaDatePrevue, issueContrat });

        expect(ui.result.noIndemnityMessage.get()).toBeInTheDocument();
        expect(ui.result.excludedContracts.query()).toBeNull();
      }
    );

    it.each([
      ["oui" as const, ISSUE_CONTRAT.EMBAUCHE_CDI],
      ["oui" as const, ISSUE_CONTRAT.REFUS_SOUPLESSE],
      ["non" as const, ISSUE_CONTRAT.INITIATIVE_SALARIE],
    ])(
      "n'accorde pas d'indemnité (CTT, fin à la date prévue = %s, issue = %s)",
      (finALaDatePrevue, issueContrat) => {
        fillContractSteps({
          contractOptionId: "contrat-travail-temporaire",
          finALaDatePrevue,
          issueContrat,
        });

        expect(ui.result.noIndemnityMessage.get()).toBeInTheDocument();
      }
    );

    it("permet de revenir à l'étape « Terme du contrat » après une disqualification", () => {
      fillContractSteps({
        finALaDatePrevue: "non",
        issueContrat: ISSUE_CONTRAT.FAUTE_GRAVE,
      });

      expect(ui.result.noIndemnityMessage.get()).toBeInTheDocument();

      fireEvent.click(screen.getByTestId("previous-button"));

      expect(ui.finALaDatePrevue.non.get()).toBeChecked();
    });
  });
});
