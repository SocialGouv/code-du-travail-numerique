export enum EventType {
  SEND_INELIGIBLE_RESULT = "sendIneligibleResult",
  CC_BLOCK_USER = "ccBlockUser",
}

export type CallbackEventType = {
  [EventType.SEND_INELIGIBLE_RESULT]: () => void;
  [EventType.CC_BLOCK_USER]: () => void;
};
