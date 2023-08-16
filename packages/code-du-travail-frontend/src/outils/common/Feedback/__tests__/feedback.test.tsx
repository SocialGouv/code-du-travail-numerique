import { fireEvent, render, screen } from "@testing-library/react";
import { Feedback } from "..";
import { ui } from "./ui";
import { push as matopush } from "@socialgouv/matomo-next";

jest.mock("@socialgouv/matomo-next", () => {
  return {
    push: jest.fn(),
  };
});

describe("Etant donné un composant Feedback", () => {
  beforeEach(() => {
    render(<Feedback />);
  });
  test("Vérification que l'introduction s'affiche", () => {
    expect(ui.introduction.title.query()).toBeInTheDocument();
    expect(ui.introduction.button.query()).toBeInTheDocument();
  });
  describe("Lors d'un clique sur le bouton 'Fermer'", () => {
    beforeEach(() => {
      fireEvent.click(ui.closeButton.get());
    });
    test("Vérification que le composant ne s'affiche plus", () => {
      expect(ui.introduction.title.query()).not.toBeInTheDocument();
      expect(ui.introduction.button.query()).not.toBeInTheDocument();
    });
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
        expect(ui.questionnaire2.simulator.bad.query()).toBeInTheDocument();
        expect(ui.questionnaire2.simulator.average.query()).toBeInTheDocument();
        expect(ui.questionnaire2.simulator.good.query()).toBeInTheDocument();

        expect(
          ui.questionnaire2.questionClarity.title.query()
        ).toBeInTheDocument();
        expect(
          ui.questionnaire2.questionClarity.bad.query()
        ).toBeInTheDocument();
        expect(
          ui.questionnaire2.questionClarity.average.query()
        ).toBeInTheDocument();
        expect(
          ui.questionnaire2.questionClarity.good.query()
        ).toBeInTheDocument();

        expect(
          ui.questionnaire2.resultClarity.title.query()
        ).toBeInTheDocument();
        expect(ui.questionnaire2.resultClarity.bad.query()).toBeInTheDocument();
        expect(
          ui.questionnaire2.resultClarity.average.query()
        ).toBeInTheDocument();
        expect(
          ui.questionnaire2.resultClarity.good.query()
        ).toBeInTheDocument();

        expect(ui.questionnaire2.more.title.query()).toBeInTheDocument();
        expect(ui.questionnaire2.more.input.query()).toBeInTheDocument();
      });
      describe("Lors d'une sélection et clique sur le bouton 'Envoyer'", () => {
        beforeEach(() => {
          fireEvent.click(ui.questionnaire2.simulator.bad.get());
          fireEvent.click(ui.questionnaire2.questionClarity.average.get());
          fireEvent.click(ui.questionnaire2.resultClarity.good.get());
          fireEvent.change(ui.questionnaire2.more.input.get(), {
            target: { value: "test" },
          });
          fireEvent.click(ui.sendButton.get());
        });
        test("Vérification du tracking et que la fin du questionnaire s'affiche", () => {
          expect(matopush).toHaveBeenCalledWith([
            "trackEvent",
            "feedback_simulateurs",
            "Facilité_utilisation_simulateur",
            "pas_du_tout",
          ]);
          expect(matopush).toHaveBeenCalledWith([
            "trackEvent",
            "feedback_simulateurs",
            "Clarté_questions",
            "moyen",
          ]);
          expect(matopush).toHaveBeenCalledWith([
            "trackEvent",
            "feedback_simulateurs",
            "Clarté_résultat",
            "oui",
          ]);
          expect(matopush).toHaveBeenCalledWith([
            "trackEvent",
            "feedback_suggestion",
            "test",
            "mock",
          ]);
          expect(ui.questionnaireEnd.title.query()).toBeInTheDocument();
          expect(ui.questionnaireEnd.description.query()).toBeInTheDocument();
        });
      });
    });
  });
});
