import { byTestId, byText } from "testing-library-selector";

export const ui = {
  closeButton: byTestId("feedbackCloseButton"),
  sendButton: byText("Envoyer"),
  introduction: {
    title: byText("Votre avis sur ce simulateur nous intéresse"),
    button: byText("Donner mon avis"),
  },
  questionnaire1: {
    title: byText(/Comment s'est passée cette simulation pour vous \?/),
    bad: byText("Pas bien"),
    average: byText("Moyen"),
    good: byText("Très bien"),
    requiredError: byText("Vous devez choisir une des réponses"),
  },
  questionnaire2: {
    title: byText(/Merci pour votre aide ! Pouvez-vous nous en dire plus \?/),
    simulator: {
      title: byText(/Que pensez-vous de l'utilisation du simulateur \?/),
      one: byTestId("simulator-one"),
      two: byTestId("simulator-two"),
      three: byTestId("simulator-three"),
      four: byTestId("simulator-four"),
      five: byTestId("simulator-five"),
    },
    questionClarity: {
      title: byText(
        /Qu'avez-vous pensé des informations et des instructions fournies \?/
      ),
      one: byTestId("questionClarity-one"),
      two: byTestId("questionClarity-two"),
      three: byTestId("questionClarity-three"),
      four: byTestId("questionClarity-four"),
      five: byTestId("questionClarity-five"),
    },
    resultClarity: {
      title: byText(/Que pensez-vous des explications du résultat obtenu \?/),
      one: byTestId("resultClarity-one"),
      two: byTestId("resultClarity-two"),
      three: byTestId("resultClarity-three"),
      four: byTestId("resultClarity-four"),
      five: byTestId("resultClarity-five"),
    },
    more: {
      title: byText(/Vous souhaitez nous en dire davantage \?/),
      input: byTestId("more-input"),
    },
    requiredError: byText("Vous devez choisir une des réponses"),
  },
  questionnaireEnd: {
    title: byText(/Merci pour votre aide !/),
    description: byText(
      /Votre évaluation sera étudiée au plus vite par nos équipes/
    ),
  },
};
