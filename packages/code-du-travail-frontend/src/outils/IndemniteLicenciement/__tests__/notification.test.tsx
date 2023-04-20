import { render, RenderResult } from "@testing-library/react";
import { UserAction } from "../../../common";
import { CalculateurIndemnite } from "../../../../src/outils";
import React from "react";
import { ui } from "./ui";

jest.spyOn(Storage.prototype, "setItem");
Storage.prototype.getItem = jest.fn(
  () => `
  {
    "effectif": 80901,
    "cdtnId": "36c0ef9881",
    "num": 2511,
    "shortTitle": "Sport",
    "id": "KALICONT000017577652",
    "title": "Sport",
    "url": "https://www.legifrance.gouv.fr/affichIDCC.do?idConvention=KALICONT000017577652",
    "slug": "2511-sport"
  }
`
);
describe("Indemnité licenciement - Affichage de la notification si le légal et le conventionnel sont égaux", () => {
  let rendering: RenderResult;
  let userAction: UserAction;
  beforeEach(() => {
    rendering = render(
      <CalculateurIndemnite
        icon={""}
        title={""}
        displayTitle={""}
        slug={"indemnite-licenciement"}
      />
    );
  });

  test("Pour la CC 2511, les formules du légal et du conventionnel sont identiques", () => {
    // On renseigne la page ancienneté avec une absence avec une date
    userAction = new UserAction();
    // Etape Contrat de travail
    userAction
      .click(ui.introduction.startButton.get())
      .click(ui.contract.type.cdi.get())
      .click(ui.contract.fauteGrave.non.get())
      .click(ui.contract.inaptitude.non.get())
      .click(ui.contract.arretTravail.non.get())
      .click(ui.next.get())
    // Etape Convention collective
    userAction.click(ui.next.get());
    // Etape Ancienneté
    userAction
      .setInput(ui.seniority.startDate.get(), "01/01/2000")
      .setInput(ui.seniority.notificationDate.get(), "01/01/2022")
      .setInput(ui.seniority.endDate.get(), "01/03/2022")
      .click(ui.seniority.hasAbsence.oui.get())
      .setInput(ui.seniority.absences.duration(0).get(), "2")
      .click(ui.next.get())

    // Etape Salaires
    userAction
      .click(ui.salary.hasPartialTime.non.get())
      .click(ui.salary.hasSameSalary.oui.get())
      .setInput(ui.salary.sameSalaryValue.get(), "2500")
      .click(ui.next.get());

    // Etape Indemnité
    expect(ui.activeStep.get()).toHaveTextContent("Indemnité");
    expect(rendering.queryByText("Éléments saisis")).toBeInTheDocument();
    // On détecte le fait qu'il ait deux notifications.
    // La première notification étant celle par défaut, la seconde est celle qu'on souhaite tracker.
    expect(rendering.queryByText("(1)")).toBeInTheDocument();
    expect(rendering.queryByText("(2)")).toBeInTheDocument();
    expect(rendering.queryByText("(3)")).not.toBeInTheDocument();

  });

});
