import { CallbackEventType, EventType } from "./events";

export const eventEmitter: {
  readonly events: Record<string, CallbackEventType[EventType][]>;
  dispatch<T extends EventType>(
    eventType: T,
    ...values: Parameters<CallbackEventType[T]>
  ): void;
  subscribe<T extends EventType>(
    eventType: T,
    callback: CallbackEventType[T]
  ): void;
  unsubscribe<T extends EventType>(eventType: T): void;
  unsubscribeAll(): void;
} = {
  events: {},

  dispatch<T extends EventType>(
    event: T,
    ...values: Parameters<CallbackEventType[T]>
  ) {
    if (!this.events[event]) return;
    this.events[event].forEach((callback: any) =>
      callback(...(values as Parameters<CallbackEventType[T]>))
    );
  },

  subscribe(event, callback) {
    if (!this.events[event]) this.events[event] = [];
    if (!this.events[event]?.includes(callback))
      this.events[event]?.push(callback);
  },

  unsubscribe(event) {
    if (!this.events[event]) return;
    delete this.events[event];
  },

  unsubscribeAll() {
    this.events = {};
  },
};
