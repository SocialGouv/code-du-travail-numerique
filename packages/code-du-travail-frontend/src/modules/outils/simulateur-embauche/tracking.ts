"use client";

import { sendEvent } from "@socialgouv/matomo-next";
import { useCallback, useRef } from "react";
import { MatomoBaseEvent, MatomoBrutNetEvent } from "../../analytics/types";
import { CONTEXTUAL_MESSAGES, FIELD_DESCRIPTORS } from "./domain/constants";
import type {
  ContextualMessageKey,
  ContractType,
  Period,
  SalaryField,
} from "./domain/types";

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

  const emitPeriodChanged = useCallback((period: Period) => {
    sendEvent({
      category: MatomoBaseEvent.OUTIL,
      action: MatomoBrutNetEvent.CHANGEMENT_PERIODE,
      name: period,
    });
  }, []);

  const emitContractChanged = useCallback((contract: ContractType) => {
    sendEvent({
      category: MatomoBaseEvent.OUTIL,
      action: MatomoBrutNetEvent.CHANGEMENT_CONTRAT,
      name: contract,
    });
  }, []);

  /**
   * Dénominateur du parcours, une fois par visite : c'est lui qui transforme le
   * volume de saisies en taux d'aboutissement. Le `name` porte le champ d'où est
   * parti le calcul, pour savoir lequel des quatre sert réellement d'entrée.
   */
  const calculationTracked = useRef(false);
  const emitCalculationSucceeded = useCallback((field: SalaryField) => {
    if (calculationTracked.current) {
      return;
    }
    calculationTracked.current = true;
    sendEvent({
      category: MatomoBaseEvent.OUTIL,
      action: MatomoBrutNetEvent.CALCUL_REUSSI,
      name: FIELD_DESCRIPTORS[field].eventName,
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
    emitPeriodChanged,
    emitContractChanged,
    emitCalculationSucceeded,
    emitContextualMessageShown,
    emitContextualMessageClicked,
    emitDeepDiveClicked,
    emitUrssafSimulatorClicked,
    emitApiError,
  };
};
