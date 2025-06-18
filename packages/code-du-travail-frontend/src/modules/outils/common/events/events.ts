export enum EventType {
  SEND_INELIGIBLE_RESULT = "sendIneligibleResult",
  TRACK_QUESTION = "trackQuestion",
  CC_BLOCK_USER = "ccBlockUser",
}

export type CallbackEventType = {
  [EventType.SEND_INELIGIBLE_RESULT]: () => void;
  [EventType.TRACK_QUESTION]: (title: string) => void;
  [EventType.CC_BLOCK_USER]: () => void;
};
