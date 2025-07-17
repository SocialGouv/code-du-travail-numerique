import { ExplanationMainResult } from "@socialgouv/modeles-social";

export const getDecryptedValue = (value: ExplanationMainResult): string => {
  switch (value) {
    case "SAME_AMOUNT":
      return "La durée prévue par le code du travail est le même que celle prévue par la convention collective.";
    default:
      return "Il s’agit de la durée la plus longue entre la durée légale prévue par le Code du travail et la durée conventionnelle prévue par la convention collective.";
  }
};
