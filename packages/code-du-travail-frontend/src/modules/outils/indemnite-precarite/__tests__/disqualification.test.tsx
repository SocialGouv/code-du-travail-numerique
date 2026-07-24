import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { CalculateurIndemnitePrecarite } from "../IndemnitePrecariteSimulator";
import { ui } from "./ui";

describe("SimulateurIndemnitePrecarite - parcours de disqualification (sans CC)", () => {
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

  it("CDD saisonnier → résultat avec motif sous-type exclu", () => {
    fireEvent.click(ui.contractType.cdd.get());
    fireEvent.click(ui.cddType("CDD saisonnier").get());
    fireEvent.click(ui.next.get());

    expect(ui.result.disqualificationTitle.get()).toBeInTheDocument();
    expect(
      screen.getByText(
        "Ce type de contrat ne permet pas au salarié d'avoir droit à une prime de précarité."
      )
    ).toBeInTheDocument();
  });

  it("CDD Autres + propositionCDIFindeContrat coché → résultat avec motif", () => {
    fireEvent.click(ui.contractType.cdd.get());
    fireEvent.click(ui.cddType("Autres").get());
    fireEvent.click(ui.cddQuestions.propositionCDIFindeContrat.get());
    fireEvent.click(ui.next.get());

    expect(ui.result.disqualificationTitle.get()).toBeInTheDocument();
    expect(
      screen.getByText(
        /Le salarié en CDD qui est immédiatement embauché dans l'entreprise en CDI/
      )
    ).toBeInTheDocument();
  });

  it("CDD Autres sans aucune case cochée → étape Rémunération (parcours normal)", () => {
    fireEvent.click(ui.contractType.cdd.get());
    fireEvent.click(ui.cddType("Autres").get());
    fireEvent.click(ui.next.get());

    expect(
      screen.getByText(
        "Comment souhaitez-vous indiquer la rémunération perçue pendant le contrat de travail ?"
      )
    ).toBeInTheDocument();
  });

  it("CTT + refusSouplesse coché → résultat avec motif", () => {
    fireEvent.click(ui.contractType.ctt.get());
    fireEvent.click(ui.cttQuestions.refusSouplesse.get());
    fireEvent.click(ui.next.get());

    expect(ui.result.disqualificationTitle.get()).toBeInTheDocument();
    expect(
      screen.getByText(
        /Le salarié en contrat d'intérim qui refuse la mise en œuvre de la souplesse/
      )
    ).toBeInTheDocument();
  });

  it("Toggle CDD: coché puis décoché → parcours normal", () => {
    fireEvent.click(ui.contractType.cdd.get());
    fireEvent.click(ui.cddType("Autres").get());
    fireEvent.click(ui.cddQuestions.finContratPeriodeDessai.get());
    fireEvent.click(ui.cddQuestions.finContratPeriodeDessai.get());
    fireEvent.click(ui.next.get());

    expect(
      screen.getByText(
        "Comment souhaitez-vous indiquer la rémunération perçue pendant le contrat de travail ?"
      )
    ).toBeInTheDocument();
  });
});
