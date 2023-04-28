import { AgreementInformation } from "../types";

const hasNoLegalIndemnity = (
  ccn: number,
  agreementInformations?: AgreementInformation[]
): boolean =>
  ccn === 3239 ||
  (ccn === 1404 &&
    !!agreementInformations?.some(
      ({ label, value }) =>
        label === "question cdi opération" && value === "'Oui'"
    ));

export default hasNoLegalIndemnity;
