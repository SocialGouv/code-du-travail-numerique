import * as Sentry from "@sentry/nextjs";
import { URSSAF_API_URL } from "../../../../config";
import { buildUrssafPayload, readUrssafPayload } from "../domain/situation";
import type {
  EvaluateInput,
  ReadIssue,
  SalaryResults,
  UrssafResponse,
} from "../domain/types";

export const EVALUATE_ENDPOINT = "/api/v1/evaluate";

/**
 * Délai de repli quand l'API répond 429 sans `retry-after` exploitable — cas qui
 * ne s'est pas produit à la mesure : chaque 429 portait un `retry-after`
 * fractionnaire, entre 0,7 et 0,8 s, avec `x-ratelimit-limit: 5` et une fenêtre
 * d'une seconde. C'est cette valeur annoncée qui est attendue, pas celle-ci.
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

/**
 * Échecs qu'on ne remonte pas à Sentry.
 *
 * Ce sont les deux seuls dont la fréquence dépend de l'usager et non de nous :
 * une coupure réseau de son côté, et le 429 du quota de l'URSSAF, qui est de
 * 5 requêtes par seconde et par IP. Sur une page à 8 000 visites par jour, les
 * remonter noierait Sentry sous des milliers d'entrées sans action possible, et
 * surtout enterrerait celles qui demandent une action. Leur volume est déjà
 * suivi, au bon endroit : l'event Matomo `brut_net_erreur_api`.
 */
const NOT_WORTH_REPORTING = new Set(["reseau", "429"]);

/**
 * Remonte un échec d'appel, en le rangeant sous une entrée stable.
 *
 * `fingerprint` sur le seul motif : sans lui, chaque message — qui contient le
 * statut — crée une entrée distincte, et une panne de l'URSSAF se présente comme
 * mille problèmes différents au lieu d'un seul, très fréquent.
 */
const reportFailure = (error: UrssafEvaluationError, input: EvaluateInput) => {
  if (NOT_WORTH_REPORTING.has(error.reason)) {
    return;
  }
  Sentry.captureException(error, {
    level: "error",
    tags: {
      simulateur: "brut-net",
      anomalie: "appel-urssaf",
      motif: error.reason,
    },
    fingerprint: ["simulateur-brut-net", "appel-urssaf", error.reason],
    extra: { input },
  });
};

/**
 * Remonte une rupture du contrat publicodes — règle renommée, unité changée,
 * expression disparue.
 *
 * C'est l'alerte qui compte vraiment : elle signifie que l'URSSAF a modifié son
 * modèle et que nos montants sont faux ou vides, pour tout le monde, jusqu'à ce
 * qu'on réagisse. D'où le niveau `fatal` et une empreinte bâtie sur la seule
 * nature des anomalies : les valeurs reçues partent dans `extra`, pas dans le
 * regroupement, sinon chaque requête ouvrirait sa propre entrée.
 */
const reportBrokenContract = (issues: ReadIssue[], input: EvaluateInput) => {
  // Tri par comparaison brute, et non par `localeCompare` : ce qu'on trie est
  // une empreinte, pas du texte affiché. Elle doit sortir identique quels que
  // soient la locale et le navigateur de l'usager, sinon la même anomalie se
  // rangerait sous deux entrées Sentry différentes.
  const signature = [
    ...new Set(issues.map((i) => `${i.expression}:${i.kind}`)),
  ].sort((a, b) => (a < b ? -1 : a > b ? 1 : 0));

  Sentry.captureMessage(
    `Simulateur brut/net : contrat URSSAF rompu (${signature.join(", ")})`,
    {
      level: "fatal",
      tags: { simulateur: "brut-net", anomalie: "contrat-urssaf" },
      fingerprint: ["simulateur-brut-net", "contrat-urssaf", ...signature],
      extra: { input, issues },
    }
  );
};

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
      reportBrokenContract(issues, input);
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

    reportFailure(wrapped, input);
    throw wrapped;
  }
};
