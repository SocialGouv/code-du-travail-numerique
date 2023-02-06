import { supportedCcn } from "@socialgouv/modeles-social";

const hasNoLegalIndemnity = (ccn: number): boolean =>
  supportedCcn.find((item) => item.idcc === ccn)
    ?.indemniteLicenciementSansLegal === true;

export default hasNoLegalIndemnity;
