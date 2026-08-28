// Barrel LOCAL du socle de tracking.
//
// Volontairement séparé de `../index.ts` : celui-ci ré-exporte `../types.ts`,
// qui tire `@socialgouv/modeles-social` et `zustand`. Le socle doit rester
// importable par les routes API serveur et par les bundles qui n'ont besoin que
// d'émettre un event — on l'importe donc par `modules/analytics/events`, jamais
// par `modules/analytics`. Même contrainte que `../eventName.ts`, documentée en
// tête de ce fichier.
//
// `useTracking` n'est PAS ré-exporté ici : il porte "use client" et importe
// `next/navigation`, ce qui le rend inutilisable côté serveur. Les composants
// client l'importent par son chemin (`modules/analytics/events/useTracking`).

export { PageCategory, pageCategoryFromPathname } from "./categories";
export {
  EVENT_ACTIONS,
  RATE_CONTENT_ACTIONS,
  SUBMIT_NPS_ACTIONS,
  rateContentAction,
  submitNpsAction,
} from "./actions";
export type {
  EventAction,
  RateContentAction,
  SubmitNpsAction,
} from "./actions";
export { serializeEventPayload } from "./payload";
export type { EventPayload, EventPayloadValue } from "./payload";
export { buildPageEvent } from "./buildPageEvent";
export type { PageEvent, PageEventInput } from "./buildPageEvent";
