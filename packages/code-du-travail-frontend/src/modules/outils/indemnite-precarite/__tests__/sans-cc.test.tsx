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
      expect(ui.cddAccroissement.get()).toBeInTheDocument();
      expect(ui.ctt.get()).toBeInTheDocument();
      expect(ui.autres.get()).toBeInTheDocument();
      expect(
        screen.queryAllByText(
          "Vous trouverez le motif d'embauche en CDD dans le contrat de travail."
        )
      ).toHaveLength(2);
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
      expect(
        screen.getByText("Article L1243-10 du code du travail")
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
        screen.getByText("Le salarié a-t-il été dans l'une des situations", {
          exact: false,
        })
      ).toBeInTheDocument();
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

    it("propose les cadres de rupture anticipée du CDD", () => {
      fireEvent.click(ui.cddRemplacement.get());
      fireEvent.click(ui.next.get());
      fireEvent.click(ui.finALaDatePrevue.non.get());

      [
        ISSUE_CONTRAT.PERIODE_ESSAI,
        ISSUE_CONTRAT.FORCE_MAJEURE,
        ISSUE_CONTRAT.FAUTE_GRAVE,
        ISSUE_CONTRAT.EMBAUCHE_CDI_AUTRE_ENTREPRISE,
        ISSUE_CONTRAT.INAPTITUDE,
        ISSUE_CONTRAT.COMMUN_ACCORD,
      ].forEach((issue) => {
        expect(ui.issueContrat(issue).get()).toBeInTheDocument();
      });
    });

    it("ne propose pas « Autre » en cas de rupture anticipée", () => {
      fireEvent.click(ui.cddRemplacement.get());
      fireEvent.click(ui.next.get());
      fireEvent.click(ui.finALaDatePrevue.non.get());

      expect(ui.issueContrat(ISSUE_CONTRAT.AUTRE).query()).toBeNull();
    });

    it("ne propose pas la rupture d'un commun accord pour un CTT", () => {
      fireEvent.click(ui.ctt.get());
      fireEvent.click(ui.next.get());
      fireEvent.click(ui.finALaDatePrevue.non.get());

      expect(
        ui.issueContrat(ISSUE_CONTRAT.INAPTITUDE).get()
      ).toBeInTheDocument();
      expect(ui.issueContrat(ISSUE_CONTRAT.COMMUN_ACCORD).query()).toBeNull();
    });

    it("réinitialise l'issue quand la première question change", () => {
      fireEvent.click(ui.cddRemplacement.get());
      fireEvent.click(ui.next.get());
      fireEvent.click(ui.finALaDatePrevue.oui.get());
      fireEvent.click(ui.issueContrat(ISSUE_CONTRAT.AUTRE).get());

      expect(ui.issueContrat(ISSUE_CONTRAT.AUTRE).get()).toBeChecked();

      fireEvent.click(ui.finALaDatePrevue.non.get());
      fireEvent.click(ui.finALaDatePrevue.oui.get());

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

    it("calcule l'indemnité pour un CTT allé à son terme", () => {
      fireEvent.click(screen.getByTestId("previous-button"));
      fireEvent.click(screen.getByTestId("previous-button"));
      fillContractSteps({ contractOptionId: "contrat-travail-temporaire" });
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
      expect(screen.getByText("Indemnité de précarité")).toBeInTheDocument();
      expect(screen.getByText("Détail du calcul")).toBeInTheDocument();
      expect(screen.getByTestId("situation-type-contrat")).toHaveTextContent(
        "CDD de remplacement"
      );
      expect(screen.getByTestId("situation-terme-contrat")).toHaveTextContent(
        "Le contrat a pris fin à la date initialement prévue"
      );
      [
        "Article L1243-4 du code du travail",
        "Article L1243-8 du code du travail",
        "Article L1243-9 du code du travail",
        "Article L1243-10 du code du travail",
      ].forEach((reference) => {
        expect(
          screen.queryAllByText(new RegExp(reference))[0]
        ).toBeInTheDocument();
      });
    });

    it("parle d'indemnité de fin de mission et des articles L1251 pour un CTT", () => {
      fillContractSteps({ contractOptionId: "contrat-travail-temporaire" });
      fillRemunerationTotal(2000);

      expect(ui.result.amount.get()).toHaveTextContent("200,00");
      expect(
        screen.getByText("Indemnité de fin de mission")
      ).toBeInTheDocument();
      expect(
        screen.getByText("Article L1251-32 du code du travail")
      ).toBeInTheDocument();
      expect(
        screen.getByText("Article L1251-33 du code du travail")
      ).toBeInTheDocument();
      expect(
        screen.queryByText("Article L1243-8 du code du travail")
      ).toBeNull();
    });

    it("affiche le bloc d'alerte sur le taux applicable", () => {
      fillContractSteps();
      fillRemunerationTotal(3000);

      expect(screen.getByTestId("warning-title")).toHaveTextContent(
        "Attention, il peut exister un autre montant applicable à votre situation."
      );
      expect(screen.getByTestId("warning-body-sans-cc")).toHaveTextContent(
        "celui fixé à 10 % par le Code du travail"
      );
    });

    it.each([
      ["oui" as const, ISSUE_CONTRAT.EMBAUCHE_CDI],
      ["oui" as const, ISSUE_CONTRAT.REFUS_CDI_EQUIVALENT],
      ["non" as const, ISSUE_CONTRAT.PERIODE_ESSAI],
      ["non" as const, ISSUE_CONTRAT.FORCE_MAJEURE],
      ["non" as const, ISSUE_CONTRAT.FAUTE_GRAVE],
      ["non" as const, ISSUE_CONTRAT.EMBAUCHE_CDI_AUTRE_ENTREPRISE],
    ])(
      "n'accorde pas d'indemnité (CDD, fin à la date prévue = %s, issue = %s)",
      (finALaDatePrevue, issueContrat) => {
        fillContractSteps({ finALaDatePrevue, issueContrat });

        expect(ui.result.noIndemnityMessage.get()).toBeInTheDocument();
        expect(ui.result.excludedContracts.query()).toBeNull();
        expect(
          screen.getByText("Article L1243-10 du code du travail")
        ).toBeInTheDocument();
      }
    );

    it.each([[ISSUE_CONTRAT.INAPTITUDE], [ISSUE_CONTRAT.COMMUN_ACCORD]])(
      "accorde l'indemnité malgré la rupture anticipée (CDD, issue = %s)",
      (issueContrat) => {
        fillContractSteps({ finALaDatePrevue: "non", issueContrat });
        fillRemunerationTotal(3000);

        expect(ui.result.amount.get()).toHaveTextContent("300,00");
        expect(screen.getByText("Indemnité de précarité")).toBeInTheDocument();
      }
    );

    it("accorde l'indemnité de fin de mission au CTT rompu pour inaptitude", () => {
      fillContractSteps({
        contractOptionId: "contrat-travail-temporaire",
        finALaDatePrevue: "non",
        issueContrat: ISSUE_CONTRAT.INAPTITUDE,
      });
      fillRemunerationTotal(2000);

      expect(ui.result.amount.get()).toHaveTextContent("200,00");
      expect(
        screen.getByText("Indemnité de fin de mission")
      ).toBeInTheDocument();
    });

    it.each([
      ["oui" as const, ISSUE_CONTRAT.EMBAUCHE_CDI],
      ["oui" as const, ISSUE_CONTRAT.REFUS_SOUPLESSE],
      ["non" as const, ISSUE_CONTRAT.PERIODE_ESSAI],
    ])(
      "n'accorde pas d'indemnité de fin de mission (CTT, fin à la date prévue = %s, issue = %s)",
      (finALaDatePrevue, issueContrat) => {
        fillContractSteps({
          contractOptionId: "contrat-travail-temporaire",
          finALaDatePrevue,
          issueContrat,
        });

        expect(ui.result.noFinDeMissionMessage.get()).toBeInTheDocument();
        expect(
          screen.getByText("Article L1251-33 du code du travail")
        ).toBeInTheDocument();
        expect(
          screen.queryByText("Article L1243-10 du code du travail")
        ).toBeNull();
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
