import { PublicodesSimulator } from "@socialgouv/modeles-social";

export enum EventType {
  SEND_INELIGIBLE_RESULT = "sendIneligibleResult",
  CC_BLOCK_USER = "ccBlockUser",
  SEND_AGREEMENT_SEARCH = "sendAgreementSearch",
  SEND_ENTERPRISE_SEARCH = "sendEnterpriseSearch",
}

export type CallbackEventType = {
  [EventType.SEND_INELIGIBLE_RESULT]: () => void;
  [EventType.CC_BLOCK_USER]: () => void;
  [EventType.SEND_AGREEMENT_SEARCH]: (
    simulator: PublicodesSimulator,
    query: string
  ) => void;
  [EventType.SEND_ENTERPRISE_SEARCH]: (
    simulator: PublicodesSimulator,
    query: string
  ) => void;
};
