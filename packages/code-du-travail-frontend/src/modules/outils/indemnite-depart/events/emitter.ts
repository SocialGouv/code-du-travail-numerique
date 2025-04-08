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
  unsubscribe<T extends EventType>(
    eventType: T,
    callback?: CallbackEventType[T]
  ): void;
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
    if (!this.events[event].includes(callback)) {
      this.events[event].push(callback);
    }
  },

  unsubscribe(event, callback) {
    if (!this.events[event]) return;

    if (callback) {
      // Si un callback est fourni, ne supprimer que cet abonnement spécifique
      const index = this.events[event].indexOf(callback);
      if (index !== -1) {
        this.events[event].splice(index, 1);
      }
      // Si la liste est vide après suppression, supprimer l'entrée
      if (this.events[event].length === 0) {
        delete this.events[event];
      }
    } else {
      // Si aucun callback n'est fourni, supprimer tous les abonnements pour cet événement
      delete this.events[event];
    }
  },

  unsubscribeAll() {
    this.events = {};
  },
};
