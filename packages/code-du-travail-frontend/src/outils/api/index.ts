import {
  indemniteLicenciementModeles,
  preavisRetraiteModeles,
  IndemniteLicenciementPublicodes,
  PreavisRetraitePublicodes,
} from "@socialgouv/modeles-social";

export const loadPublicodesRules = (simulator: string, idcc?: string): any => {
  switch (simulator) {
    case "preavis-retraite":
      return {
        ...preavisRetraiteModeles.base,
        ...(idcc ? preavisRetraiteModeles[idcc] : {}),
      };
    case "indemnite-licenciement":
      return {
        ...indemniteLicenciementModeles.base,
        ...(idcc ? indemniteLicenciementModeles[idcc] : {}),
      };
    default:
      return indemniteLicenciementModeles.base;
  }
};

export const loadPublicodes = (simulator: string, idcc?: string): any => {
  const rules = loadPublicodesRules(simulator, idcc);
  switch (simulator) {
    case "preavis-retraite":
      return new PreavisRetraitePublicodes(rules);
    case "indemnite-licenciement":
      console.log("toto");
      return new IndemniteLicenciementPublicodes(rules);
    default:
      return null;
  }
};
