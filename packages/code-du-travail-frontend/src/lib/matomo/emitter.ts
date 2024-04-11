export enum GlobalEvent {
  RUPTURE_CONVENTIONNELLE = "ruptureConventionnelle",
  INDEMNITE_LICENCIEMENT = "indemniteLicenciement",
}

export enum EventType {
  SEND_RESULT_EVENT = "sendResultEvent",
  TRACK_QUESTION = "trackQuestion",
}

type CallbackEventType = {
  [EventType.SEND_RESULT_EVENT]: (isEligible: boolean) => void;
  [EventType.TRACK_QUESTION]: (title: string) => void;
};

type DispatchFunction = <T extends EventType>(
  globalEvent: GlobalEvent,
  eventType: EventType,
  ...values: Parameters<CallbackEventType[T]>
) => void;

type SubscribeFunction = (
  globalEvent: GlobalEvent,
  callback: (data: { name: EventType; properties: any }) => void
) => void;

export const eventEmitter: {
  readonly events: Record<string, CallbackEventType[EventType][]>;
  dispatch: DispatchFunction;
  unsubscribe(globalEvent: GlobalEvent): void;
  subscribe: SubscribeFunction;
} = {
  events: {},

  dispatch(globalEvent, eventType, ...values) {
    if (!this.events[globalEvent]) return;
    const eventObjects = this.events[globalEvent].filter(
      (evt) => evt.name === eventType
    );
    eventObjects.forEach((eventObject) => {
      eventObject.properties(...values);
    });
  },

  unsubscribe(globalEvent: GlobalEvent) {
    if (!this.events[globalEvent]) return;
    delete this.events[globalEvent];
  },

  subscribe(globalEvent, callback) {
    if (!this.events[globalEvent]) {
      this.events[globalEvent] = [];
    }
    this.events[globalEvent].push({
      name: undefined,
      properties: callback,
    });
  },
};
