import { render } from "@testing-library/react";
import React from "react";
import { UserAction } from "../../common/utils/UserAction";
import { ui } from "../../indemnite-depart/__tests__/ui";
import { byText } from "testing-library-selector";
import IndemniteRuptureCoSimulator from "../IndemniteRuptureCoSimulator";
import { push } from "@socialgouv/matomo-next";

jest.mock("@socialgouv/matomo-next", () => ({
  push: jest.fn(),
}));

describe("Rupture conventionnelle - légale", () => {
  test("parcours classique", () => {
    let userAction: UserAction;
    render(
      <IndemniteRuptureCoSimulator
        displayTitle="Simulateur d'indemnité de rupture conventionnelle"
        relatedItems={[]}
        title="Indemnité de rupture conventionnelle"
      />
    );
    expect(push).toHaveBeenNthCalledWith(1, [
      "trackEvent",
      "outil",
      "view_step_Indemnité de rupture conventionnelle",
      "start",
    ]);

    const startEventCalls = (push as jest.Mock).mock.calls.filter(
      (call) =>
        call[0][0] === "trackEvent" &&
        call[0][1] === "outil" &&
        call[0][2] === "view_step_Indemnité de rupture conventionnelle" &&
        call[0][3] === "start"
    );
    expect(startEventCalls.length).toBe(1);
    userAction = new UserAction();
    userAction
      .click(ui.introduction.startButton.get())
      .click(ui.contract.type.cdi.get());
    expect(push).toHaveBeenCalledWith([
      "trackEvent",
      "outil",
      "view_step_Indemnité de rupture conventionnelle",
      "contrat_travail",
    ]);

    expect(ui.contract.fauteGrave.question.query()).not.toBeInTheDocument();
    expect(ui.result.dismissalType.inaptitude.query()).not.toBeInTheDocument();

    userAction.click(ui.contract.arretTravail.non.get()).click(ui.next.get());

    expect(push).toHaveBeenCalledWith([
      "trackEvent",
      "outil",
      "view_step_Indemnité de rupture conventionnelle",
      "info_cc",
    ]);

    expect(ui.activeStep.query()).toHaveTextContent("Convention collective");

    userAction.click(ui.agreement.noAgreement.get()).click(ui.next.get());

    expect(push).toHaveBeenCalledWith([
      "trackEvent",
      "outil",
      "view_step_Indemnité de rupture conventionnelle",
      "anciennete",
    ]);
    expect(ui.activeStep.query()).toHaveTextContent("Ancienneté");
    expect(ui.seniority.notificationDate.query()).not.toBeInTheDocument();

    userAction
      .setInput(ui.seniority.startDate.get(), "01/01/2024")
      .setInput(ui.seniority.endDate.get(), "01/05/2024")
      .click(ui.seniority.hasAbsence.non.get())
      .click(ui.next.get());

    expect(push).toHaveBeenCalledWith([
      "trackEvent",
      "outil",
      "view_step_Indemnité de rupture conventionnelle",
      "salaires",
    ]);
    expect(ui.activeStep.query()).toHaveTextContent("Salaire");

    userAction
      .click(ui.salary.hasPartialTime.non.get())
      .click(ui.salary.hasSameSalary.oui.get())
      .setInput(ui.salary.sameSalaryValue.get(), "1000")
      .click(ui.next.get());

    expect(push).toHaveBeenCalledWith([
      "trackEvent",
      "outil",
      "view_step_Indemnité de rupture conventionnelle",
      "results",
    ]);
    expect(ui.activeStep.query()).toHaveTextContent("Indemnité");

    expect(ui.result.resultat.get()).toHaveTextContent("83,33 €");
    expect(ui.result.resultatLegal.get()).toHaveTextContent("83,33");
    expect(ui.result.resultatAgreement.get()).toHaveTextContent(
      "Convention collective non renseignée"
    );
    expect(ui.result.data.get()).not.toHaveTextContent(
      "Licenciement dû à une faute grave"
    );
    expect(byText(/Type de contrat/).query()).toBeInTheDocument();
    expect(
      byText(/Date de notification du licenciement/).query()
    ).not.toBeInTheDocument();
    expect(
      byText(
        /Rupture conventionnelle dûe à une inaptitude d’origine professionnelle/
      ).query()
    ).not.toBeInTheDocument();
  });
});
