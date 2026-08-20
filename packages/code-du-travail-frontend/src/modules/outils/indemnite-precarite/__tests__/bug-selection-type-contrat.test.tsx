import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { CalculateurIndemnitePrecarite } from "../IndemnitePrecariteSimulator";
import { ui } from "./ui";
import { ISSUE_CONTRAT } from "../types";

/**
 * Non-régression : revenir en arrière pour changer de type de contrat ne doit
 * pas laisser l'étape « Terme du contrat » dans un état incohérent (issue
 * #7142, les options de l'étape 4 dépendent de la famille de contrat).
 */
describe("SimulateurIndemnitePrecarite - changement de type de contrat", () => {
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
      <CalculateurIndemnitePrecarite title="Test Indemnité de Précarité" />
    );
    fireEvent.click(ui.introduction.startButton.get());
    fireEvent.click(
      screen.getByText(
        "Je ne souhaite pas renseigner ma convention collective (je passe l'étape)."
      )
    );
    fireEvent.click(ui.next.get());
  });

  it("passer de CDD à CTT change les issues proposées à l'étape suivante", () => {
    fireEvent.click(ui.cddRemplacement.get());
    fireEvent.click(ui.next.get());
    fireEvent.click(ui.finALaDatePrevue.oui.get());

    expect(
      ui.issueContrat(ISSUE_CONTRAT.REFUS_CDI_EQUIVALENT).get()
    ).toBeInTheDocument();

    fireEvent.click(screen.getByTestId("previous-button"));
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

  it("changer de type de contrat efface les réponses de l'étape « Terme du contrat »", () => {
    fireEvent.click(ui.cddRemplacement.get());
    fireEvent.click(ui.next.get());
    fireEvent.click(ui.finALaDatePrevue.oui.get());
    fireEvent.click(ui.issueContrat(ISSUE_CONTRAT.REFUS_CDI_EQUIVALENT).get());

    fireEvent.click(screen.getByTestId("previous-button"));
    fireEvent.click(ui.ctt.get());
    fireEvent.click(ui.next.get());

    // La réponse « refus d'un CDI équivalent » n'existe pas dans le chemin CTT :
    // elle ne doit pas subsister et disqualifier l'usager à son insu.
    expect(ui.finALaDatePrevue.oui.get()).not.toBeChecked();

    fireEvent.click(ui.next.get());

    expect(ui.error.finALaDatePrevue.get()).toBeInTheDocument();
  });

  it("l'erreur du type de contrat disparaît dès qu'une option est choisie", () => {
    fireEvent.click(ui.next.get());

    expect(ui.error.contractType.get()).toBeInTheDocument();

    fireEvent.click(ui.ctt.get());

    expect(ui.error.contractType.query()).toBeNull();
  });

  it("choisir « Autres » après un CDD mène bien à l'écran sans indemnité", () => {
    fireEvent.click(ui.cddRemplacement.get());
    fireEvent.click(ui.autres.get());
    fireEvent.click(ui.next.get());

    expect(ui.result.noIndemnityMessage.get()).toBeInTheDocument();
    expect(ui.result.excludedContracts.get()).toBeInTheDocument();
  });
});
