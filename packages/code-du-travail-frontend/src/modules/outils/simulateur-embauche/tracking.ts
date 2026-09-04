"use client";

import { sendEvent } from "@socialgouv/matomo-next";
import { useCallback, useRef } from "react";
import { MatomoBaseEvent, MatomoBrutNetEvent } from "../../analytics/types";
import { CONTEXTUAL_MESSAGES, FIELD_DESCRIPTORS } from "./domain/constants";
import type { ContextualMessageKey, Period, SalaryField } from "./domain/types";

/** Nom de repli quand l'échec n'a pas de statut HTTP (panne réseau, DNS…). */
export const NETWORK_ERROR_EVENT_NAME = "reseau";

export const useHiringSimulatorTracking = () => {
  // Un usager corrige son salaire plusieurs fois de suite : compter chaque
  // frappe donnerait un volume ininterprétable. L'indicateur voulu est « quelle
  // part des usagers saisit une valeur », donc un event par champ et par
  // montage de la page.
  const trackedFields = useRef<Set<SalaryField>>(new Set());
  const trackedMessages = useRef<Set<ContextualMessageKey>>(new Set());

  const emitFieldEdited = useCallback((field: SalaryField) => {
    if (trackedFields.current.has(field)) {
      return;
    }
    trackedFields.current.add(field);
    sendEvent({
      category: MatomoBaseEvent.OUTIL,
      action: MatomoBrutNetEvent.SAISIE_CHAMP,
      name: FIELD_DESCRIPTORS[field].eventName,
    });
  }, []);

  const emitAutofill = useCallback((name: "salaire_median" | "smic") => {
    sendEvent({
      category: MatomoBaseEvent.OUTIL,
      action: MatomoBrutNetEvent.REMPLIR_AUTOMATIQUEMENT,
      name,
    });
  }, []);

  /** Dénominateur du taux d'engagement : une fois par type de message. */
  const emitContextualMessageShown = useCallback(
    (key: ContextualMessageKey) => {
      if (trackedMessages.current.has(key)) {
        return;
      }
      trackedMessages.current.add(key);
      sendEvent({
        category: MatomoBaseEvent.OUTIL,
        action: MatomoBrutNetEvent.AFFICHAGE_MESSAGE_CONTEXTUEL,
        name: CONTEXTUAL_MESSAGES[key].eventName,
      });
    },
    []
  );

  /** Numérateur du taux d'engagement. */
  const emitContextualMessageClicked = useCallback(
    (key: ContextualMessageKey) => {
      sendEvent({
        category: MatomoBaseEvent.OUTIL,
        action: MatomoBrutNetEvent.CLIC_MESSAGE_CONTEXTUEL,
        name: CONTEXTUAL_MESSAGES[key].eventName,
      });
    },
    []
  );

  const emitDeepDiveClicked = useCallback((slug: string) => {
    sendEvent({
      category: MatomoBaseEvent.OUTIL,
      action: MatomoBrutNetEvent.CLIC_POUR_APPROFONDIR,
      name: slug,
    });
  }, []);

  const emitUrssafSimulatorClicked = useCallback((period: Period) => {
    sendEvent({
      category: MatomoBaseEvent.OUTIL,
      action: MatomoBrutNetEvent.CLIC_SIMULATEUR_URSSAF,
      name: period,
    });
  }, []);

  /**
   * `reason` vaut le statut HTTP, ou `"reseau"` faute de statut. Le repli est
   * explicite parce qu'un `name` vide serait purement et simplement jeté par
   * Matomo : l'event serait compté dans le total de l'action mais n'apparaîtrait
   * dans aucune ligne du rapport « Noms d'événements ».
   */
  const emitApiError = useCallback((reason?: string) => {
    sendEvent({
      category: MatomoBaseEvent.OUTIL,
      action: MatomoBrutNetEvent.ERREUR_API,
      name: reason || NETWORK_ERROR_EVENT_NAME,
    });
  }, []);

  return {
    emitFieldEdited,
    emitAutofill,
    emitContextualMessageShown,
    emitContextualMessageClicked,
    emitDeepDiveClicked,
    emitUrssafSimulatorClicked,
    emitApiError,
  };
};
