import { fireEvent, render, RenderResult } from "@testing-library/react";
import React from "react";
import userEvent from "@testing-library/user-event";
import { ui } from "../../CommonIndemniteDepart/__tests__/ui";
import { CalculateurIndemniteLicenciement } from "../index";

describe("Indemnité licenciement - Gestion des erreurs sur l'étape ancienneté au niveau des dates", () => {
  let rendering: RenderResult;

  beforeEach(() => {
    rendering = render(
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
    // Validation que l'on est bien sur l'étape ancienneté
    expect(ui.activeStep.query()).toHaveTextContent("Ancienneté");
  });

  test(`On doit afficher une erreur si la date n'existe pas`, () => {
    fireEvent.change(ui.seniority.startDate.get(), {
      target: { value: "01/01/2000" },
    });
    fireEvent.change(ui.seniority.notificationDate.get(), {
      target: { value: "31/06/2022" },
    });
    fireEvent.change(ui.seniority.endDate.get(), {
      target: { value: "01/07/2022" },
    });
    userEvent.click(ui.seniority.hasAbsence.non.get());
    userEvent.click(ui.next.get());
    expect(
      rendering.queryByText("La date de notification est invalide")
    ).toBeTruthy();
  });

  test(`On ne doit pas afficher d'erreur si la date est ok`, () => {
    fireEvent.change(ui.seniority.startDate.get(), {
      target: { value: "01/01/2000" },
    });
    fireEvent.change(ui.seniority.notificationDate.get(), {
      target: { value: "30/06/2022" },
    });
    fireEvent.change(ui.seniority.endDate.get(), {
      target: { value: "01/07/2022" },
    });
    userEvent.click(ui.seniority.hasAbsence.non.get());
    userEvent.click(ui.next.get());
    expect(
      rendering.queryByText("La date de notification est invalide")
    ).toBeFalsy();
  });
});
