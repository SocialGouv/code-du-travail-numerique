import {
  indemniteLicenciementModeles,
  preavisRetraiteModeles,
} from "@socialgouv/modeles-social";

export const loadPublicodesRules = (simulator: string): any => {
  switch (simulator) {
    case "preavis-retraite":
      return preavisRetraiteModeles;
    case "indemnite-licenciement":
      return indemniteLicenciementModeles;
    default:
      return null;
  }
};
