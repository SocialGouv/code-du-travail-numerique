import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { sendEvent } from "@socialgouv/matomo-next";
import { CalculateurIndemnitePrecarite } from "../IndemnitePrecariteSimulator";
import { fillContractSteps, fillRemunerationTotal, ui } from "./ui";
import { ISSUE_CONTRAT } from "../types";

jest.mock("@socialgouv/matomo-next", () => ({
  sendEvent: jest.fn(),
}));

// Permet de provoquer l'échec du moteur de calcul sur le seul test dédié.
let mockThrowOnCalculate = false;
jest.mock("../../common/publicodes", () => {
  const actual = jest.requireActual("../../common/publicodes");
  return {
    ...actual,
    loadPublicodes: (simulator: unknown, idcc?: string) => {
      const engine = actual.loadPublicodes(simulator, idcc);
      if (!engine.__wrappedForTest) {
        const calculate = engine.calculate.bind(engine);
        engine.calculate = (situation: unknown) => {
          if (mockThrowOnCalculate) throw new Error("erreur de calcul simulée");
          return calculate(situation);
        };
        engine.__wrappedForTest = true;
      }
      return engine;
    },
  };
});

const TITLE = "Indemnité de précarité";
const VIEW_STEP = `view_step_${TITLE}`;

const events = () =>
  (sendEvent as jest.Mock).mock.calls.map(([event]) => event);

// L'issue du résultat précède le `view_step` de l'étape : React exécute les
// effets de l'étape (enfant) avant ceux du `SimulatorLayout` (parent). Les deux
// events partent bien, seul leur ordre d'émission est inversé.

const withAgreementInLocalStorage = (num: number) => {
  Storage.prototype.getItem = jest.fn(() =>
    JSON.stringify({
      num,
      id: `id-${num}`,
      shortTitle: `CC ${num}`,
      title: `CC ${num}`,
      slug: `${num}`,
      url: "https://www.legifrance.gouv.fr",
    })
  );
  Storage.prototype.setItem = jest.fn();
  Storage.prototype.removeItem = jest.fn();
};

const withoutAgreementInLocalStorage = () => {
  Storage.prototype.getItem = jest.fn(() => null);
  Storage.prototype.setItem = jest.fn();
  Storage.prototype.removeItem = jest.fn();
};

/** Étape 2 : passer l'étape « convention collective ». */
const skipAgreementStep = () => {
  fireEvent.click(
    screen.getByText(
      "Je ne souhaite pas renseigner ma convention collective (je passe l'étape)."
    )
  );
  fireEvent.click(ui.next.get());
};

beforeEach(() => {
  mockThrowOnCalculate = false;
  (sendEvent as jest.Mock).mockReset();
});

describe("Tracking Matomo du simulateur d'indemnité de précarité", () => {
  it("émet l'entonnoir complet et `results_eligible` sur un parcours abouti", () => {
    withAgreementInLocalStorage(1043);
    render(<CalculateurIndemnitePrecarite title={TITLE} />);

    // L'affichage de l'introduction marque l'entrée dans le simulateur.
    expect(events()).toEqual([
      { category: "outil", action: VIEW_STEP, name: "start" },
    ]);

    fireEvent.click(ui.introduction.startButton.get());
    fireEvent.click(ui.next.get());
    fillContractSteps();
    fillRemunerationTotal(3000);

    expect(ui.result.amount.get()).toBeInTheDocument();
    expect(events()).toEqual([
      { category: "outil", action: VIEW_STEP, name: "start" },
      { category: "outil", action: VIEW_STEP, name: "info_cc" },
      {
        category: "cc_search_type_of_users",
        action: "click_p1",
        name: "INDEMNITE_PRECARITE",
      },
      {
        category: "cc_select_p1",
        action: "INDEMNITE_PRECARITE",
        name: "idcc1043",
      },
      { category: "outil", action: "cc_select_traitée", name: "1043" },
      { category: "outil", action: VIEW_STEP, name: "type_contrat" },
      { category: "outil", action: VIEW_STEP, name: "terme_contrat" },
      { category: "outil", action: VIEW_STEP, name: "remuneration" },
      { category: "outil", action: VIEW_STEP, name: "results_eligible" },
      { category: "outil", action: VIEW_STEP, name: "indemnite" },
    ]);
  });

  it("émet `results_ineligible` quand le parcours n'ouvre pas droit à l'indemnité", () => {
    withoutAgreementInLocalStorage();
    render(<CalculateurIndemnitePrecarite title={TITLE} />);

    fireEvent.click(ui.introduction.startButton.get());
    skipAgreementStep();
    fireEvent.click(ui.autres.get());
    fireEvent.click(ui.next.get());

    expect(ui.result.noIndemnity.get()).toBeInTheDocument();
    expect(events()).toEqual([
      { category: "outil", action: VIEW_STEP, name: "start" },
      { category: "outil", action: VIEW_STEP, name: "info_cc" },
      {
        category: "cc_search_type_of_users",
        action: "click_p3",
        name: "INDEMNITE_PRECARITE",
      },
      { category: "outil", action: VIEW_STEP, name: "type_contrat" },
      { category: "outil", action: VIEW_STEP, name: "results_ineligible" },
      { category: "outil", action: VIEW_STEP, name: "indemnite" },
    ]);
  });

  it("émet `results_ineligible` sur une rupture anticipée pour embauche en CDI", () => {
    withoutAgreementInLocalStorage();
    render(<CalculateurIndemnitePrecarite title={TITLE} />);

    fireEvent.click(ui.introduction.startButton.get());
    skipAgreementStep();
    fillContractSteps({ issueContrat: ISSUE_CONTRAT.EMBAUCHE_CDI });

    expect(ui.result.noIndemnity.get()).toBeInTheDocument();
    expect(events().map(({ name }) => name)).toEqual([
      "start",
      "info_cc",
      "INDEMNITE_PRECARITE",
      "type_contrat",
      "terme_contrat",
      "results_ineligible",
      "indemnite",
    ]);
  });

  it("émet `results_error` quand le moteur de calcul est en échec", () => {
    withoutAgreementInLocalStorage();
    render(<CalculateurIndemnitePrecarite title={TITLE} />);

    fireEvent.click(ui.introduction.startButton.get());
    skipAgreementStep();
    fillContractSteps();
    mockThrowOnCalculate = true;
    fillRemunerationTotal(3000);

    expect(events()).toContainEqual({
      category: "outil",
      action: VIEW_STEP,
      name: "results_error",
    });
    expect(
      events().filter(({ name }) => name?.startsWith("results_"))
    ).toHaveLength(1);
  });

  it("distingue une convention non traitée par le simulateur", () => {
    // L'idcc 1480 est présent dans `supportedCcn` (traité par d'autres
    // simulateurs) mais pas par l'indemnité de précarité.
    withAgreementInLocalStorage(1480);
    render(<CalculateurIndemnitePrecarite title={TITLE} />);

    fireEvent.click(ui.introduction.startButton.get());
    fireEvent.click(ui.next.get());

    expect(events()).toContainEqual({
      category: "outil",
      action: "cc_select_non_traitée",
      name: "1480",
    });
  });
});
