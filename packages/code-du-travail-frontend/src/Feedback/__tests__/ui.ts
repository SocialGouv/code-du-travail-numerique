import { byTestId, byText } from "testing-library-selector";

export const ui = {
  closeButton: byTestId("feedbackCloseButton"),
  introduction: {
    title: byText("Votre avis sur ce simulateur nous intéresse"),
    button: byText("Donner mon avis"),
  },
  questionnaire: {
    title: byText(/Comment s'est passée cette simulation pour vous/),
    notGood: byText("Pas bien"),
    average: byText("Moyen"),
    good: byText("Très bien"),
  },
};
