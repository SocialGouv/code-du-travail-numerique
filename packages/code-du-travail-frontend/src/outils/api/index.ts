import { modeles } from "@socialgouv/modeles-social";

export const loadPublicodesRules = (simulator: string): any => {
  switch (simulator) {
    case "preavis-retraite":
    case "indemnite-licenciement":
      return modeles;
    default:
      return null;
  }
};
