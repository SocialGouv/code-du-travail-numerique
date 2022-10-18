import { render, RenderResult } from "@testing-library/react";
import { UserAction } from "../../../common";
import {
  CalculateurIndemnite,
  loadPublicodesRules,
} from "../../../../src/outils";
import React from "react";
import { ui } from "./ui";

jest.spyOn(Storage.prototype, "setItem");
jest.spyOn(Storage.prototype, "getItem");

describe("Indemnité licenciement - Date d'absence non présente", () => {
  let rendering: RenderResult;
  let userAction: UserAction;
  beforeEach(async () => {
    rendering = await render(
      <CalculateurIndemnite
        icon={""}
        title={""}
        displayTitle={""}
        publicodesRules={loadPublicodesRules("indemnite-licenciement")}
      />
    );
    userAction = new UserAction();
    userAction
      .click(await ui.introduction.startButton.get())
      .click(await ui.contract.type.cdi.get())
      .click(await ui.contract.fauteGrave.non.get())
      .click(await ui.contract.inaptitude.non.get())
      .click(await ui.next.get())
      .click(await ui.agreement.noAgreement.get())
      .click(await ui.next.get());

    // Validation que l'on est bien sur l'étape ancienneté
    expect(await ui.activeStep.query()).toHaveTextContent("Ancienneté");
  });

  it("Validation de l'absence du champ demandant la date de l'absence", async () => {
    // On renseigne la page ancienneté avec une absence avec une date
    userAction
      .setInput(await ui.seniority.startDate.get(), "01/01/2000")
      .setInput(await ui.seniority.notificationDate.get(), "01/01/2022")
      .setInput(await ui.seniority.endDate.get(), "01/03/2022")
      .click(await ui.next.get())
      .click(await ui.seniority.hasAbsence.oui.get());

    expect(
      rendering.queryByText("Date de début de l'absence")
    ).not.toBeInTheDocument();

    userAction
      .changeInputList(
        await ui.seniority.absences.motif(0).get(),
        "Congés sans solde"
      )
      .setInput(await ui.seniority.absences.duration(0).get(), "6")
      .click(await ui.next.get());

    // On se rend sur la page information pour vérifier que la date n'est pas présente
    expect(await ui.activeStep.query()).toHaveTextContent("Salaires");
    userAction
      .click(await ui.salary.hasPartialTime.non.get())
      .click(await ui.salary.hasSameSalary.oui.get())
      .setInput(await ui.salary.sameSalaryValue.get(), "2500")
      .click(await ui.next.get());

    expect(await ui.activeStep.get()).toHaveTextContent("Indemnité");
    // On valide que l'absence est présente avec la date
    expect(rendering.queryByText("Éléments saisis")).toBeInTheDocument();
    expect(rendering.queryByText("Congés sans solde")).toBeInTheDocument();
    expect(rendering.queryByTestId("absence-date")).not.toBeInTheDocument();
  });
});
