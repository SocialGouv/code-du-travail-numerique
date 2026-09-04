import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { CalculateurIndemnitePrecarite } from "../IndemnitePrecariteSimulator";
import { ui } from "./ui";
import { ISSUE_CONTRAT } from "../types";

/**
 * Les options de l'étape « Type de contrat » dépendent de la convention
 * collective : changer de CC doit remettre les étapes suivantes à zéro.
 */
describe("SimulateurIndemnitePrecarite - changement de convention collective", () => {
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
  });

  it("sans convention collective, aucune option conventionnelle n'est proposée", () => {
    fireEvent.click(
      screen.getByText(
        "Je ne souhaite pas renseigner ma convention collective (je passe l'étape)."
      )
    );
    fireEvent.click(ui.next.get());

    expect(ui.contractType("1516-usage-formateurs").query()).toBeNull();
    expect(ui.contractType("2098-optimisation-lineaire").query()).toBeNull();
  });

  it("changer de parcours convention collective réinitialise le type de contrat", () => {
    fireEvent.click(
      screen.getByText(
        "Je ne souhaite pas renseigner ma convention collective (je passe l'étape)."
      )
    );
    fireEvent.click(ui.next.get());

    fireEvent.click(ui.ctt.get());
    expect(ui.ctt.get()).toBeChecked();

    fireEvent.click(screen.getByTestId("previous-button"));
    fireEvent.click(
      screen.getByText(
        "Je sais quelle est ma convention collective et je la saisis."
      )
    );
    fireEvent.click(
      screen.getByText(
        "Je ne souhaite pas renseigner ma convention collective (je passe l'étape)."
      )
    );
    fireEvent.click(ui.next.get());

    expect(ui.ctt.get()).not.toBeChecked();
  });

  it("revenir sur l'étape convention collective sans rien changer préserve la saisie", () => {
    fireEvent.click(
      screen.getByText(
        "Je ne souhaite pas renseigner ma convention collective (je passe l'étape)."
      )
    );
    fireEvent.click(ui.next.get());

    fireEvent.click(ui.cddRemplacement.get());
    fireEvent.click(ui.next.get());
    fireEvent.click(ui.finALaDatePrevue.oui.get());
    fireEvent.click(ui.issueContrat(ISSUE_CONTRAT.AUTRE).get());

    fireEvent.click(screen.getByTestId("previous-button"));
    fireEvent.click(screen.getByTestId("previous-button"));
    fireEvent.click(ui.next.get());

    expect(ui.cddRemplacement.get()).toBeChecked();

    fireEvent.click(ui.next.get());

    expect(ui.finALaDatePrevue.oui.get()).toBeChecked();
    expect(ui.issueContrat(ISSUE_CONTRAT.AUTRE).get()).toBeChecked();
  });
});
