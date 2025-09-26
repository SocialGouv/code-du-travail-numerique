import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { CalculateurIndemnitePrecarite } from "../IndemnitePrecariteSimulator";
import { ui } from "./ui";

describe("SimulateurIndemnitePrecarite - Bug selection type contrat", () => {
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
  });

  it("ne devrait pas afficher de message d'erreur après avoir changé de type de contrat", () => {
    fireEvent.click(ui.introduction.startButton.get());

    fireEvent.click(
      screen.getByText(
        "Je ne souhaite pas renseigner ma convention collective (je passe l'étape)."
      )
    );
    fireEvent.click(ui.next.get());
    fireEvent.click(ui.contractType.cdd.get());
    fireEvent.change(ui.cddType.get(), {
      target: { value: "CDD saisonnier" },
    });
    fireEvent.click(ui.next.get());
    expect(ui.error.contractType.query()).toBeDefined();
    fireEvent.click(ui.contractType.ctt.get());
    fireEvent.click(ui.cttQuestions.cttFormation.non.get());
    fireEvent.click(ui.cttQuestions.ruptureContratFauteGrave.non.get());
    fireEvent.click(ui.cttQuestions.propositionCDIFinContrat.non.get());
    fireEvent.click(ui.cttQuestions.refusSouplesse.non.get());
    fireEvent.click(ui.next.get());
    fireEvent.click(ui.remuneration.typeRemuneration.total.get());
    fireEvent.change(ui.remuneration.salaireTotal.get(), {
      target: { value: "25000" },
    });
    fireEvent.click(ui.next.get());
    expect(ui.error.calculation.query()).toBeNull();
    expect(ui.result.presentation.query()).toBeDefined();
  });
});
