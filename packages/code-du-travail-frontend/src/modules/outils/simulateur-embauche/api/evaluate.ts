import * as Sentry from "@sentry/nextjs";
import { URSSAF_API_URL } from "../../../../config";
import { buildUrssafPayload, readUrssafPayload } from "../domain/situation";
import type {
  EvaluateInput,
  SalaryResults,
  UrssafResponse,
} from "../domain/types";

export const EVALUATE_ENDPOINT = "/api/v1/evaluate";

/**
 * Délai de repli quand l'API répond 429 sans `retry-after` exploitable. Mesuré :
 * elle renvoie un `retry-after` fractionnaire (~0,003 s) et récupère aussitôt.
 */
const DEFAULT_RETRY_AFTER_MS = 200;
/** Plafond de sécurité : on ne fait pas attendre l'usager plus que ça. */
const MAX_RETRY_AFTER_MS = 2_000;

/**
 * Ce que la couche appelante doit savoir d'un échec, pour l'event Matomo
 * `brut_net_erreur_api`. `"reseau"` couvre tout ce qui n'a pas de statut HTTP.
 */
export class UrssafEvaluationError extends Error {
  readonly reason: string;

  constructor(message: string, reason: string) {
    super(message);
    this.name = "UrssafEvaluationError";
    this.reason = reason;
  }
}

const isAbortError = (error: unknown): boolean =>
  error instanceof Error &&
  (error.name === "AbortError" || error.name === "TimeoutError");

/**
 * Lit l'en-tête `retry-after`, exprimé en secondes (fractionnaires ici).
 * Une valeur absurde ou absente retombe sur le délai par défaut.
 */
const readRetryAfterMs = (response: Response): number => {
  const raw = response.headers.get("retry-after");
  const seconds = raw === null ? Number.NaN : Number(raw);

  if (!Number.isFinite(seconds) || seconds < 0) {
    return DEFAULT_RETRY_AFTER_MS;
  }
  return Math.min(seconds * 1000, MAX_RETRY_AFTER_MS);
};

const wait = (ms: number, signal?: AbortSignal): Promise<void> =>
  new Promise((resolve, reject) => {
    if (signal?.aborted) {
      reject(new DOMException("Aborted", "AbortError"));
      return;
    }
    const timeout = setTimeout(() => {
      signal?.removeEventListener("abort", onAbort);
      resolve();
    }, ms);
    const onAbort = () => {
      clearTimeout(timeout);
      reject(new DOMException("Aborted", "AbortError"));
    };
    signal?.addEventListener("abort", onAbort, { once: true });
  });

const postEvaluate = (
  payload: unknown,
  signal?: AbortSignal
): Promise<Response> =>
  fetch(`${URSSAF_API_URL}${EVALUATE_ENDPOINT}`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(payload),
    signal,
  });

/**
 * Interroge l'API publicodes de l'URSSAF et renvoie les sept montants du
 * simulateur.
 *
 * Sur 429, une **seule** nouvelle tentative après le `retry-after` annoncé : le
 * quota est de 5 requêtes par seconde et par IP, et le debounce en amont place
 * déjà un usager normal très en dessous. Insister davantage transformerait un
 * pianotage rapide en rafale.
 *
 * Un `AbortError` n'est jamais une erreur : c'est nous qui avons annulé la
 * requête parce qu'une frappe plus récente l'a rendue caduque. Il ne doit
 * produire ni état d'erreur, ni entrée Sentry, ni event Matomo — d'où sa
 * re-propagation telle quelle, que l'appelant reconnaît et ignore.
 */
export const evaluateSalary = async (
  input: EvaluateInput,
  signal?: AbortSignal
): Promise<SalaryResults> => {
  const payload = buildUrssafPayload(input);

  try {
    let response = await postEvaluate(payload, signal);

    if (response.status === 429) {
      await wait(readRetryAfterMs(response), signal);
      response = await postEvaluate(payload, signal);
    }

    if (!response.ok) {
      throw new UrssafEvaluationError(
        `L'API URSSAF a répondu ${response.status}`,
        String(response.status)
      );
    }

    const body = (await response.json()) as UrssafResponse;
    const { results, issues } = readUrssafPayload(body, input.period);

    if (issues.length > 0) {
      // Un contrat publicodes rompu (règle renommée, unité changée) doit être
      // visible : c'est un changement chez l'URSSAF, pas une panne passagère.
      Sentry.captureMessage(
        `Simulateur brut/net : réponse URSSAF inattendue — ${issues.join(" | ")}`,
        { level: "warning", extra: { input, issues } }
      );
    }

    return results;
  } catch (error) {
    if (isAbortError(error)) {
      throw error;
    }

    const wrapped =
      error instanceof UrssafEvaluationError
        ? error
        : new UrssafEvaluationError(
            error instanceof Error ? error.message : "Erreur réseau inconnue",
            "reseau"
          );

    Sentry.captureException(wrapped, { extra: { input } });
    throw wrapped;
  }
};
