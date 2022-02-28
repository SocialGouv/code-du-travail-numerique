import { modeles } from "@socialgouv/modeles-social";

export const loadPublicodes = (simulator: string): any => {
  switch (simulator) {
    case "preavis-retraite":
      return modeles;
    case "indemnite-licenciement":
      return modeles;
    default:
      return null;
  }
};
