import { generateSituation } from "../../__test__/common/transform-to-situation";
import { mergeIndemniteLicenciementModels } from "../../internal/merger";
import IndemniteLicenciementPublicodes from "../IndemniteLicenciementPublicodes";

const situationAvecDate = [
  {
    name: "contrat salarié . indemnité de licenciement . date d'entrée",
    rawNode: {
      nom: "contrat salarié . indemnité de licenciement . date d'entrée",
      valeur: "01/01/2024",
    },
    value: "01/10/12",
  },
  {
    name: "contrat salarié . indemnité de licenciement . date de notification",
    rawNode: {
      nom: "contrat salarié . indemnité de licenciement . date de notification",
      valeur: "01/01/2024",
    },
    value: "21/02/24",
  },
  {
    name: "contrat salarié . indemnité de licenciement . date de sortie",
    rawNode: {
      nom: "contrat salarié . indemnité de licenciement . date de sortie",
      valeur: "non",
    },
    value: "13/03/24",
  },
  {
    name: "contrat salarié . indemnité de licenciement . inaptitude suite à un accident ou maladie professionnelle",
    rawNode: {
      nom: "contrat salarié . indemnité de licenciement . inaptitude suite à un accident ou maladie professionnelle",
      valeur: "non",
    },
    value: "non",
  },
  {
    name: "contrat salarié . indemnité de licenciement . arrêt de travail",
    rawNode: {
      nom: "contrat salarié . indemnité de licenciement . arrêt de travail",
      valeur: "non",
    },
    value: "oui",
  },
  {
    name: "contrat salarié . indemnité de licenciement . ancienneté en année",
    rawNode: {
      nom: "contrat salarié . indemnité de licenciement . ancienneté en année",
      titre:
        "Ancienneté calculée pour le calcul de l'indemnité de licenciement",
      unité: "an",
    },
    value: "2011.4166666666667",
  },
  {
    name: "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année",
    rawNode: {
      nom: "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année",
      titre:
        "Ancienneté calculée pour le calcul de l'indemnité de licenciement conventionnelle",
      unité: "an",
    },
    value: "2011.4166666666667",
  },
  {
    name: "contrat salarié . indemnité de licenciement . ancienneté requise en année",
    rawNode: {
      nom: "contrat salarié . indemnité de licenciement . ancienneté requise en année",
      titre: "Ancienneté calculée pour le droit à l'indemnité de licenciement",
      unité: "an",
    },
    value: "2011.3333333333333",
  },
  {
    name: "contrat salarié . indemnité de licenciement . ancienneté conventionnelle requise en année",
    rawNode: {
      nom: "contrat salarié . indemnité de licenciement . ancienneté conventionnelle requise en année",
      titre:
        "Ancienneté calculée pour le droit à l'indemnité de licenciement conventionnelle",
      unité: "an",
    },
    value: "2011.3333333333333",
  },
]; // Ça doit failed car la date n'a que deux digits

describe("Classe qui permet de débugguer les console.error issues de Sentry", () => {
  const publicodes = new IndemniteLicenciementPublicodes(
    mergeIndemniteLicenciementModels()
  );

  it.each([[situationAvecDate]])("doit failed", (situation) => {
    expect(() => {
      publicodes.setSituation(generateSituation(situation));
    }).toThrow();
  });
});
