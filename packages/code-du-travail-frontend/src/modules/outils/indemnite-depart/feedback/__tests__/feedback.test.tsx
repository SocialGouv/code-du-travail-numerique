import { fireEvent, render } from "@testing-library/react";
import { Feedback } from "..";
import { push as matopush } from "@socialgouv/matomo-next";
import { EVENT_CATEGORY } from "../tracking";
import { ui } from "./ui";

jest.mock("@socialgouv/matomo-next", () => {
  return {
    push: jest.fn(),
  };
});

describe("Etant donné un composant Feedback", () => {
  beforeEach(() => {
    render(<Feedback category={EVENT_CATEGORY.indemniteLicenciement} />);
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
        expect(matopush).toHaveBeenCalledWith([
          "trackEvent",
          "feedback_simulateurs",
          "Comment_s_est_passée_la_simulation",
          "moyen",
        ]);

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
          expect(matopush).toHaveBeenCalledWith([
            "trackEvent",
            "feedback_simulateurs",
            "Comment_s_est_passée_la_simulation",
            "moyen",
          ]);
          expect(matopush).toHaveBeenCalledWith([
            "trackEvent",
            "feedback_simulateurs",
            "Facilité_utilisation_simulateur",
            "1",
          ]);
          expect(matopush).toHaveBeenCalledWith([
            "trackEvent",
            "feedback_simulateurs",
            "Clarté_questions",
            "3",
          ]);
          expect(matopush).toHaveBeenCalledWith([
            "trackEvent",
            "feedback_simulateurs",
            "Clarté_résultat",
            "5",
          ]);
          expect(ui.questionnaireEnd.title.query()).toBeInTheDocument();
          expect(ui.questionnaireEnd.description.query()).toBeInTheDocument();
        });
      });
    });
  });
});
