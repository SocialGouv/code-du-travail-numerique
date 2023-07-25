import { fireEvent, render, screen } from "@testing-library/react";
import { Feedback } from "..";
import { ui } from "./ui";

describe("Etant donné un composant Feedback", () => {
  beforeEach(() => {
    render(<Feedback />);
  });
  test("Vérification que l'introduction s'affiche", () => {
    expect(ui.introduction.title.query()).toBeInTheDocument();
    expect(ui.introduction.button.query()).toBeInTheDocument();
  });
  describe("Etant donné un click sur le bouton 'Fermer'", () => {
    beforeEach(() => {
      fireEvent.click(ui.closeButton.get());
    });
    test("Vérification que le composant ne s'affiche plus", () => {
      expect(ui.introduction.title.query()).not.toBeInTheDocument();
      expect(ui.introduction.button.query()).not.toBeInTheDocument();
    });
  });
  describe("Etant donné un click sur le bouton 'Donner mon avis'", () => {
    beforeEach(() => {
      fireEvent.click(ui.introduction.button.get());
    });
    test("Vérification que le composant ne s'affiche plus", () => {
      expect(ui.questionnaire.title.query()).toBeInTheDocument();
      expect(ui.questionnaire.notGood.query()).toBeInTheDocument();
      expect(ui.questionnaire.average.query()).toBeInTheDocument();
      expect(ui.questionnaire.good.query()).toBeInTheDocument();
    });
  });
});
