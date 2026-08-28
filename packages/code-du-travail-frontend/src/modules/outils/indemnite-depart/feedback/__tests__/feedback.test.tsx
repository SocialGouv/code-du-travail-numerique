import { fireEvent, render } from "@testing-library/react";
import { Feedback } from "..";
import { sendEvent } from "@socialgouv/matomo-next";
import { usePathname } from "next/navigation";
import { SIMULATOR_FEEDBACK_CONTEXT } from "../tracking";
import { ui } from "./ui";

jest.mock("@socialgouv/matomo-next", () => {
  return {
    sendEvent: jest.fn(),
  };
});

// La catégorie et le chemin viennent de la route courante : le questionnaire
// s'affiche après le résultat d'un simulateur.
const PAGE = "/outils/indemnite-licenciement";
const PATH = "outils/indemnite-licenciement";
const SIMULATEUR = SIMULATOR_FEEDBACK_CONTEXT.indemniteLicenciement;

describe("Etant donné un composant Feedback", () => {
  beforeEach(() => {
    (usePathname as jest.Mock).mockReturnValue(PAGE);
    render(
      <Feedback category={SIMULATOR_FEEDBACK_CONTEXT.indemniteLicenciement} />
    );
  });
  test("Vérification que l'introduction s'affiche", () => {
    expect(ui.introduction.title.query()).toBeInTheDocument();
    expect(ui.introduction.button.query()).toBeInTheDocument();
  });
  describe("Lors d'un clique sur le bouton 'Donner mon avis'", () => {
    beforeEach(() => {
      fireEvent.click(ui.introduction.button.get());
    });
    test("Vérification que le 1er questionnaire s'affiche bien", () => {
      expect(ui.questionnaire1.title.query()).toBeInTheDocument();
      expect(ui.questionnaire1.bad.query()).toBeInTheDocument();
      expect(ui.questionnaire1.average.query()).toBeInTheDocument();
      expect(ui.questionnaire1.good.query()).toBeInTheDocument();
      expect(ui.sendButton.query()).toBeInTheDocument();
    });
    describe("Lors d'un clic directement sur le bouton 'Envoyer'", () => {
      beforeEach(() => {
        fireEvent.click(ui.sendButton.get());
      });
      test("Vérification que le message d'erreur s'affiche bien", () => {
        expect(ui.questionnaire1.requiredError.query()).toBeInTheDocument();
      });
    });
    describe("Lors d'une sélection et clique sur le bouton 'Envoyer'", () => {
      beforeEach(() => {
        fireEvent.click(ui.questionnaire1.average.get());
        fireEvent.click(ui.sendButton.get());
      });
      test("Vérification du tracking et que le 2e questionnaire s'affiche", () => {
        expect(sendEvent).toHaveBeenCalledWith({
          category: "outil",
          action: "submit_simulator_feedback_global",
          name: `{"path":"${PATH}","answer":"moyen","simulator":"${SIMULATEUR}"}`,
        });

        expect(ui.questionnaire2.simulator.title.query()).toBeInTheDocument();
        expect(ui.questionnaire2.simulator.one.query()).toBeInTheDocument();
        expect(ui.questionnaire2.simulator.two.query()).toBeInTheDocument();
        expect(ui.questionnaire2.simulator.three.query()).toBeInTheDocument();
        expect(ui.questionnaire2.simulator.four.query()).toBeInTheDocument();
        expect(ui.questionnaire2.simulator.five.query()).toBeInTheDocument();

        expect(
          ui.questionnaire2.questionClarity.title.query()
        ).toBeInTheDocument();
        expect(
          ui.questionnaire2.questionClarity.one.query()
        ).toBeInTheDocument();
        expect(
          ui.questionnaire2.questionClarity.two.query()
        ).toBeInTheDocument();
        expect(
          ui.questionnaire2.questionClarity.three.query()
        ).toBeInTheDocument();
        expect(
          ui.questionnaire2.questionClarity.four.query()
        ).toBeInTheDocument();
        expect(
          ui.questionnaire2.questionClarity.five.query()
        ).toBeInTheDocument();

        expect(
          ui.questionnaire2.resultClarity.title.query()
        ).toBeInTheDocument();
        expect(ui.questionnaire2.resultClarity.one.query()).toBeInTheDocument();
        expect(ui.questionnaire2.resultClarity.two.query()).toBeInTheDocument();
        expect(
          ui.questionnaire2.resultClarity.three.query()
        ).toBeInTheDocument();
        expect(
          ui.questionnaire2.resultClarity.four.query()
        ).toBeInTheDocument();
        expect(
          ui.questionnaire2.resultClarity.five.query()
        ).toBeInTheDocument();

        expect(ui.questionnaire2.more.title.query()).toBeInTheDocument();
        expect(ui.questionnaire2.more.input.query()).toBeInTheDocument();
      });
      describe("Lors d'une sélection et clique sur le bouton 'Envoyer'", () => {
        beforeEach(() => {
          fireEvent.click(ui.questionnaire2.simulator.one.get());
          fireEvent.click(ui.questionnaire2.questionClarity.three.get());
          fireEvent.click(ui.questionnaire2.resultClarity.five.get());
          fireEvent.change(ui.questionnaire2.more.input.get(), {
            target: { value: "test" },
          });
          fireEvent.click(ui.sendButton.get());
        });
        test("Vérification du tracking et que la fin du questionnaire s'affiche", () => {
          expect(sendEvent).toHaveBeenCalledWith({
            category: "outil",
            action: "submit_simulator_feedback_global",
            name: `{"path":"${PATH}","answer":"moyen","simulator":"${SIMULATEUR}"}`,
          });
          // Les questions notées renseignent aussi `value`, pour obtenir la
          // moyenne dans Matomo sans perdre la distribution portée par le payload.
          expect(sendEvent).toHaveBeenCalledWith({
            category: "outil",
            action: "submit_simulator_feedback_easiness",
            name: `{"path":"${PATH}","answer":"1","simulator":"${SIMULATEUR}"}`,
            value: 1,
          });
          expect(sendEvent).toHaveBeenCalledWith({
            category: "outil",
            action: "submit_simulator_feedback_question_clarity",
            name: `{"path":"${PATH}","answer":"3","simulator":"${SIMULATEUR}"}`,
            value: 3,
          });
          expect(sendEvent).toHaveBeenCalledWith({
            category: "outil",
            action: "submit_simulator_feedback_result_clarity",
            name: `{"path":"${PATH}","answer":"5","simulator":"${SIMULATEUR}"}`,
            value: 5,
          });
          expect(ui.questionnaireEnd.title.query()).toBeInTheDocument();
          expect(ui.questionnaireEnd.description.query()).toBeInTheDocument();
        });
      });
    });
  });
});
