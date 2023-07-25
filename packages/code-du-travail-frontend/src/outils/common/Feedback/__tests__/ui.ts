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
      title: byText(/Le simulateur était-il facile à utiliser \?/),
      bad: byTestId("simulator-bad"),
      average: byTestId("simulator-average"),
      good: byTestId("simulator-good"),
    },
    questionClarity: {
      title: byText(/Les questions étaient-elles claires et compréhensible \?/),
      bad: byTestId("questionClarity-bad"),
      average: byTestId("questionClarity-average"),
      good: byTestId("questionClarity-good"),
    },
    resultClarity: {
      title: byText(
        /Les explications du résultat obtenu étaient-elles claires et compréhensible \?/
      ),
      bad: byTestId("resultClarity-bad"),
      average: byTestId("resultClarity-average"),
      good: byTestId("resultClarity-good"),
    },
    more: {
      title: byText(
        /Les explications du résultat obtenu étaient-elles claires et compréhensible \?/
      ),
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
