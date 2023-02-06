import {
  indemniteLicenciementModeles,
  preavisRetraiteModeles,
  IndemniteLicenciementPublicodes,
  PreavisRetraitePublicodes,
} from "@socialgouv/modeles-social";

export const loadPublicodesRules = (simulator: string): any => {
  switch (simulator) {
    case "preavis-retraite":
      return preavisRetraiteModeles;
    case "indemnite-licenciement":
      return indemniteLicenciementModeles;
    default:
      return;
  }
};

export const loadPublicodes = (simulator: string, idcc?: string): any => {
  const rules = loadPublicodesRules(simulator);
  switch (simulator) {
    case "preavis-retraite":
      return new PreavisRetraitePublicodes(rules);
    case "indemnite-licenciement":
      return new IndemniteLicenciementPublicodes(rules, idcc);
    default:
      return null;
  }
};
