import { render } from "@testing-library/react";
import React from "react";
import { UserAction } from "../../common/utils/UserAction";
import { ui } from "../../indemnite-depart/__tests__/ui";
import { byText } from "testing-library-selector";
import IndemniteRuptureCoSimulator from "../IndemniteRuptureCoSimulator";
import { sendEvent } from "@socialgouv/matomo-next";
import { usePathname } from "next/navigation";

// La catégorie et le chemin viennent de la route courante. Le titre du
// simulateur, qui suffixait l'action dans l'ancien schéma, est en payload.
const PAGE = "/outils/indemnite-rupture-conventionnelle";
const PATH = "outils/indemnite-rupture-conventionnelle";
const viewStep = (step: string) =>
  `{"path":"${PATH}","simulator":"Indemnité de rupture conventionnelle","step":"${step}"}`;

jest.mock("@socialgouv/matomo-next", () => ({
  sendEvent: jest.fn(),
}));

describe("Rupture conventionnelle - légale", () => {
  beforeEach(() => {
    (usePathname as jest.Mock).mockReturnValue(PAGE);
  });

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
      action: "view_step",
      name: viewStep("start"),
    });

    const startEventCalls = (sendEvent as jest.Mock).mock.calls.filter(
      (call) =>
        call[0].action === "view_step" &&
        JSON.parse(call[0].name).step === "start"
    );
    expect(startEventCalls.length).toBe(1);
    userAction = new UserAction();
    userAction.click(ui.introduction.startButton.get());

    expect(sendEvent).toHaveBeenCalledWith({
      category: "outil",
      action: "view_step",
      name: viewStep("info_cc"),
    });

    expect(ui.activeStep.query()).toHaveTextContent("Convention collective");

    userAction.click(ui.agreement.noAgreement.get()).click(ui.next.get());

    expect(sendEvent).toHaveBeenCalledWith({
      category: "outil",
      action: "view_step",
      name: viewStep("anciennete"),
    });
    expect(ui.activeStep.query()).toHaveTextContent("Ancienneté");
    expect(ui.seniority.notificationDate.query()).not.toBeInTheDocument();

    userAction
      .setInput(ui.seniority.startDate.get(), "01/01/2024")
      .setInput(ui.seniority.endDate.get(), "01/05/2024")
      .click(ui.next.get());

    expect(sendEvent).toHaveBeenCalledWith({
      category: "outil",
      action: "view_step",
      name: viewStep("absences"),
    });
    expect(ui.activeStep.query()).toHaveTextContent("Absences");

    userAction
      .click(ui.absences.arretTravail.non.get())
      .click(ui.absences.hasAbsence.non.get())
      .click(ui.next.get());

    expect(sendEvent).toHaveBeenCalledWith({
      category: "outil",
      action: "view_step",
      name: viewStep("salaires"),
    });
    expect(ui.activeStep.query()).toHaveTextContent("Salaire");

    userAction
      .click(ui.salary.hasSameSalary.oui.get())
      .setInput(ui.salary.sameSalaryValue.get(), "1000")
      .click(ui.next.get());

    expect(sendEvent).toHaveBeenCalledWith({
      category: "outil",
      action: "view_step",
      name: viewStep("results"),
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
