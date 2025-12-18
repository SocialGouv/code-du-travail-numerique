import { render } from "@testing-library/react";
import React from "react";
import { UserAction } from "../../common/utils/UserAction";
import { ui } from "../../indemnite-depart/__tests__/ui";
import { byText } from "testing-library-selector";
import IndemniteRuptureCoSimulator from "../IndemniteRuptureCoSimulator";
import { sendEvent } from "@socialgouv/matomo-next";

jest.mock("@socialgouv/matomo-next", () => ({
  sendEvent: jest.fn(),
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
    expect(sendEvent).toHaveBeenNthCalledWith(1, {
      category: "outil",
      action: "view_step_Indemnité de rupture conventionnelle",
      name: "start",
    });

    const startEventCalls = (sendEvent as jest.Mock).mock.calls.filter(
      (call) =>
        call[0].category === "outil" &&
        call[0].action === "view_step_Indemnité de rupture conventionnelle" &&
        call[0].name === "start"
    );
    expect(startEventCalls.length).toBe(1);
    userAction = new UserAction();
    userAction
      .click(ui.introduction.startButton.get())
      .click(ui.contract.type.cdi.get());
    expect(sendEvent).toHaveBeenCalledWith({
      category: "outil",
      action: "view_step_Indemnité de rupture conventionnelle",
      name: "contrat_travail",
    });

    expect(ui.contract.fauteGrave.question.query()).not.toBeInTheDocument();
    expect(ui.result.dismissalType.inaptitude.query()).not.toBeInTheDocument();

    userAction.click(ui.contract.arretTravail.non.get()).click(ui.next.get());

    expect(sendEvent).toHaveBeenCalledWith({
      category: "outil",
      action: "view_step_Indemnité de rupture conventionnelle",
      name: "info_cc",
    });

    expect(ui.activeStep.query()).toHaveTextContent("Convention collective");

    userAction.click(ui.agreement.noAgreement.get()).click(ui.next.get());

    expect(sendEvent).toHaveBeenCalledWith({
      category: "outil",
      action: "view_step_Indemnité de rupture conventionnelle",
      name: "anciennete",
    });
    expect(ui.activeStep.query()).toHaveTextContent("Ancienneté");
    expect(ui.seniority.notificationDate.query()).not.toBeInTheDocument();

    userAction
      .setInput(ui.seniority.startDate.get(), "01/01/2024")
      .setInput(ui.seniority.endDate.get(), "01/05/2024")
      .click(ui.seniority.hasAbsence.non.get())
      .click(ui.next.get());

    expect(sendEvent).toHaveBeenCalledWith({
      category: "outil",
      action: "view_step_Indemnité de rupture conventionnelle",
      name: "salaires",
    });
    expect(ui.activeStep.query()).toHaveTextContent("Salaire");

    userAction
      .click(ui.salary.hasPartialTime.non.get())
      .click(ui.salary.hasSameSalary.oui.get())
      .setInput(ui.salary.sameSalaryValue.get(), "1000")
      .click(ui.next.get());

    expect(sendEvent).toHaveBeenCalledWith({
      category: "outil",
      action: "view_step_Indemnité de rupture conventionnelle",
      name: "results",
    });
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
