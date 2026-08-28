// Émetteur NON-HOOK, pour les call sites qui ne sont pas des composants React :
// les stores zustand des simulateurs (`pushAgreementEvents`, les steps) émettent
// depuis des actions de store, hors de tout rendu.
//
// Même contrat que `useTracking` — l'appelant ne passe ni `category` ni `path` —
// mais la route est lue sur `window.location` au lieu de `usePathname()`. Les
// composants React doivent préférer `useTracking` : pendant une transition de
// route, `usePathname()` est à jour avant `window.location`.

import { sendEvent } from "@socialgouv/matomo-next";
import { toEventName } from "../eventName";
import { buildPageEvent } from "./buildPageEvent";
import { pageCategoryFromPathname } from "./categories";
import type { EventAction } from "./actions";
import type { EventPayload } from "./payload";

/**
 * Émet un event Matomo depuis un contexte non-React.
 *
 * No-op côté serveur : ces émetteurs sont appelés depuis des stores qui peuvent
 * être instanciés en SSR, et un event de tracking ne doit jamais casser un
 * rendu.
 */
export const sendPageEvent = (
  action: EventAction,
  payload?: EventPayload,
  value?: number
): void => {
  if (typeof window === "undefined") return;

  const pathname = window.location.pathname;
  const path = toEventName(pathname);

  const event = buildPageEvent({
    category: pageCategoryFromPathname(pathname),
    action,
    payload: { ...(path ? { path } : {}), ...payload },
    value,
  });

  // `sendEvent` type `value` en union discriminée (interdite sans `name`) : on
  // éclate l'appel plutôt que de forcer un cast.
  if (event.value !== undefined) {
    sendEvent({
      category: event.category,
      action: event.action,
      name: event.name,
      value: event.value,
    });
    return;
  }

  sendEvent({
    category: event.category,
    action: event.action,
    name: event.name,
  });
};
