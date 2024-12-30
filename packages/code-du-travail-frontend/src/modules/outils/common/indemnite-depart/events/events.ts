export enum EventType {
  SEND_RESULT_EVENT = "sendResultEvent",
  TRACK_QUESTION = "trackQuestion",
  TRACK_RESULT = "trackResult",
}

export type CallbackEventType = {
  [EventType.SEND_RESULT_EVENT]: (isEligible: boolean) => void;
  [EventType.TRACK_QUESTION]: (title: string) => void;
  [EventType.TRACK_RESULT]: () => void;
};
