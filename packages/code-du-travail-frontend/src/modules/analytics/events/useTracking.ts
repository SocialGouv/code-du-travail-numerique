"use client";

// Point d'entrée UNIQUE du tracking côté client.
//
// L'appelant ne passe jamais `category` ni `path` : le hook les dérive de la
// route courante. C'est ce qui rend la normalisation mécanique — impossible à
// contourner par oubli — au lieu d'être une convention à retenir. Les émetteurs
// n'ont donc plus besoin de recevoir un `path`, une `url` ou un `baseUrl` de
// leurs composants appelants.

import { useCallback } from "react";
import { usePathname } from "next/navigation";
import { sendEvent } from "@socialgouv/matomo-next";
import { toEventName } from "../eventName";
import { buildPageEvent } from "./buildPageEvent";
import { pageCategoryFromPathname } from "./categories";
import type { EventAction } from "./actions";
import type { EventPayload } from "./payload";

export const useTracking = () => {
  const pathname = usePathname();

  const track = useCallback(
    (action: EventAction, payload?: EventPayload, value?: number) => {
      // `toEventName` produit la forme canonique du site — chemin sans domaine
      // ni slash initial (`contribution/mon-slug`). C'est déjà celle qu'émettent
      // les deux relais serveur ; on s'aligne dessus plutôt que d'en inventer
      // une autre. Sur la page d'accueil le chemin est vide : on omet la clé,
      // la catégorie `home` porte déjà l'information.
      const path = toEventName(pathname ?? "");

      const event = buildPageEvent({
        category: pageCategoryFromPathname(pathname),
        action,
        // Le payload de l'appelant peut surcharger `path` : les events qui
        // désignent une AUTRE page que la page courante (déclinaison de
        // convention, résultat de recherche) passent leur cible en `target`,
        // mais certains parcours en widget doivent corriger le chemin.
        payload: { ...(path ? { path } : {}), ...payload },
        value,
      });

      // `sendEvent` type `value` en union discriminée (`value` n'est permis
      // qu'avec un `name`) : on éclate l'appel plutôt que de forcer un cast.
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
    },
    [pathname]
  );

  return { track };
};

export type TrackFn = ReturnType<typeof useTracking>["track"];
