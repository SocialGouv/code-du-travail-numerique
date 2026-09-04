"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { DEBOUNCE_TIME_MS } from "../../../config";
import { evaluateSalary, UrssafEvaluationError } from "./api/evaluate";
import {
  formatAmount,
  parseFrenchAmount,
  toMonthlyAmount,
} from "./domain/amount";
import type {
  ContractType,
  Period,
  SalaryField,
  SalaryResults,
  SalarySeed,
} from "./domain/types";

type Status = "idle" | "loading" | "success" | "error";

type Draft = { field: SalaryField; raw: string };

type Args = {
  onApiError?: (reason: string) => void;
};

const isAbortError = (error: unknown): boolean =>
  error instanceof Error && error.name === "AbortError";

/**
 * Machine à états du simulateur.
 *
 * La règle qui structure tout le reste : **le champ en cours d'édition affiche
 * toujours son texte brut**, jamais une valeur reformatée depuis les résultats.
 *
 *     valeur affichée = draft.field === champ ? draft.raw : formatAmount(results[champ])
 *
 * Il n'existe qu'un `draft` à la fois, donc une réponse de l'API ne peut
 * structurellement pas réécrire le champ où se trouve le curseur : il n'y a pas
 * de source de vérité mouvante à arbitrer, c'est `draft` pour un champ et
 * `results` pour les trois autres. C'est ce qui empêche la boucle de rétroaction
 * où le serveur reformate ce que l'usager est en train de taper.
 */
export const useSalarySimulation = ({ onApiError }: Args = {}) => {
  const [period, setPeriodState] = useState<Period>("mois");
  const [contract, setContractState] = useState<ContractType>("CDI");
  const [seed, setSeed] = useState<SalarySeed | null>(null);
  const [draft, setDraft] = useState<Draft | null>(null);
  const [results, setResults] = useState<SalaryResults | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  /** Incrémenté par « Réessayer » pour rejouer un `seed` inchangé. */
  const [retryToken, setRetryToken] = useState(0);

  // Deux garde-fous complémentaires : `requestId` garantit la correction (une
  // réponse en retard ne peut pas écraser une plus récente), `AbortController`
  // économise la bande passante et le quota de l'URSSAF.
  const requestIdRef = useRef(0);
  const abortRef = useRef<AbortController | null>(null);

  const seedField = seed?.field;
  const seedAmount = seed?.amountMonthly;

  useEffect(() => {
    if (seedField === undefined || seedAmount === undefined) {
      return;
    }

    const timeout = setTimeout(() => {
      const controller = new AbortController();
      abortRef.current = controller;
      const requestId = ++requestIdRef.current;

      setStatus("loading");

      evaluateSalary(
        { field: seedField, amountMonthly: seedAmount, period, contract },
        controller.signal
      )
        .then((next) => {
          if (requestId !== requestIdRef.current) {
            return;
          }
          setResults(next);
          setStatus("success");
        })
        .catch((error: unknown) => {
          // Une requête annulée l'a été parce qu'une frappe plus récente l'a
          // rendue caduque : ni état d'erreur, ni event.
          if (isAbortError(error) || requestId !== requestIdRef.current) {
            return;
          }
          setStatus("error");
          onApiError?.(
            error instanceof UrssafEvaluationError ? error.reason : "reseau"
          );
        });
    }, DEBOUNCE_TIME_MS);

    return () => {
      clearTimeout(timeout);
      abortRef.current?.abort();
      abortRef.current = null;
    };
  }, [seedField, seedAmount, period, contract, retryToken, onApiError]);

  /** Coupe tout calcul en cours et repart d'une page vierge. */
  const clear = useCallback(() => {
    requestIdRef.current++;
    abortRef.current?.abort();
    abortRef.current = null;
    setSeed(null);
    setResults(null);
    setStatus("idle");
  }, []);

  const editField = useCallback(
    (field: SalaryField, raw: string) => {
      setDraft({ field, raw });

      const parsed = parseFrenchAmount(raw);
      if (parsed === null || parsed <= 0) {
        // Saisie vide ou inexploitable : on ne garde pas des résultats qui ne
        // correspondent plus à rien à l'écran, et surtout aucun message
        // contextuel tant qu'aucun net n'est calculé.
        clear();
        return;
      }

      setSeed({ field, amountMonthly: toMonthlyAmount(parsed, period) });
    },
    [clear, period]
  );

  /** Le champ quitté reprend sa valeur formatée. */
  const commitField = useCallback(() => setDraft(null), []);

  /**
   * « Remplir automatiquement ». Le brouillon est abandonné pour que la valeur
   * injectée s'affiche formatée, y compris si l'usager était en train de taper.
   */
  const fillWith = useCallback((amountMonthly: number) => {
    setDraft(null);
    setSeed({ field: "salaireBrut", amountMonthly });
  }, []);

  const setPeriod = useCallback((next: Period) => {
    // Le texte en cours de frappe est exprimé dans l'ancienne unité : le garder
    // afficherait un montant mensuel sous un suffixe annuel.
    setDraft(null);
    setPeriodState(next);
  }, []);

  const setContract = useCallback((next: ContractType) => {
    setContractState(next);
  }, []);

  const retry = useCallback(() => setRetryToken((token) => token + 1), []);

  /**
   * Valeur à afficher dans un champ. Un seul endroit décide, pour que la règle
   * anti-boucle ne puisse pas être contournée champ par champ.
   */
  const displayValue = useCallback(
    (field: SalaryField): string =>
      draft?.field === field ? draft.raw : formatAmount(results?.[field]),
    [draft, results]
  );

  return {
    period,
    contract,
    results,
    status,
    seed,
    displayValue,
    editField,
    commitField,
    fillWith,
    setPeriod,
    setContract,
    retry,
  };
};
