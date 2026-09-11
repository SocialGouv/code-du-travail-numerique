import * as Sentry from "@sentry/nextjs";
import { URSSAF_API_URL } from "../../../../config";
import { roundToCents } from "../domain/amount";
import { RULES } from "../domain/constants";
import { buildSmicPayload, readUnit } from "../domain/situation";
import type {
  SmicReference,
  UrssafEvaluation,
  UrssafResponse,
} from "../domain/types";
import { EVALUATE_ENDPOINT } from "./evaluate";

/** Une journée : le SMIC ne bouge qu'à la revalorisation. */
const REVALIDATE_SECONDS = 86_400;

/** Nombre total de tentatives sur 429, `retry-after` honoré entre deux. */
const MAX_ATTEMPTS = 3;
/** Repli si l'API ne dit pas quand revenir. Mesuré : elle annonce 0,7 à 0,8 s. */
const DEFAULT_RETRY_AFTER_MS = 800;
const MAX_RETRY_AFTER_MS = 3_000;

const wait = (ms: number) =>
  new Promise<void>((resolve) => setTimeout(resolve, ms));

const readRetryAfterMs = (response: Response): number => {
  const seconds = Number(response.headers.get("retry-after"));
  return Number.isFinite(seconds) && seconds >= 0
    ? Math.min(seconds * 1000, MAX_RETRY_AFTER_MS)
    : DEFAULT_RETRY_AFTER_MS;
};

/**
 * Interroge l'API, en réessayant sur 429.
 *
 * Le quota est de 5 requêtes par seconde et par **IP** : côté serveur, toutes
 * les requêtes de préchargement partagent la même, et un cache froid sur la page
 * la plus consultée du site les fait démarrer ensemble. Abandonner au premier
 * 429 revient à perdre le SMIC pour toute la durée du pic — donc le bouton
 * « SMIC » et les messages contextuels. Attendre ici ne coûte à l'usager qu'un
 * rendu serveur un peu plus long, et le résultat est mis en cache 24 h pour
 * tout le monde.
 */
const post = async (payload: unknown): Promise<UrssafResponse> => {
  let lastStatus = 0;

  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    const response = await fetch(`${URSSAF_API_URL}${EVALUATE_ENDPOINT}`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
      next: { revalidate: REVALIDATE_SECONDS },
    });

    if (response.ok) {
      return (await response.json()) as UrssafResponse;
    }
    lastStatus = response.status;

    if (response.status !== 429 || attempt === MAX_ATTEMPTS) {
      break;
    }
    await wait(readRetryAfterMs(response));
  }

  throw new Error(`L'API URSSAF a répondu ${lastStatus}`);
};

/** Lit un montant en €/mois, en refusant tout ce qui n'en est pas un. */
const readMonthlyAmount = (
  entry: UrssafEvaluation | undefined,
  label: string
): number => {
  if (!entry || entry.error) {
    throw new Error(
      `${label} : ${entry?.error?.message ?? "expression absente de la réponse"}`
    );
  }
  if (
    typeof entry.nodeValue !== "number" ||
    !Number.isFinite(entry.nodeValue)
  ) {
    throw new Error(`${label} : valeur non numérique`);
  }
  if (readUnit(entry.unit) !== "€/mois") {
    throw new Error(`${label} : unité inattendue`);
  }

  return roundToCents(entry.nodeValue);
};

/**
 * Précharge le SMIC côté serveur, pour alimenter le bouton « SMIC » dès le
 * premier rendu sans qu'un appel parte au chargement de la page.
 *
 * `GET /api/v1/rules/{règle}` ne peut pas servir ici : il renvoie la règle brute
 * — pour le SMIC, la formule `"temps de travail * SMIC . horaire"` — et non sa
 * valeur. Seul `POST /evaluate` produit un montant.
 *
 * Ne lève jamais : le simulateur fonctionne sans. En cas d'échec la page se rend
 * sans le bouton « SMIC » et sans message contextuel — c'est ici l'**unique**
 * source du SMIC *net*, l'évaluation du simulateur ne pouvant pas la produire :
 * sa situation porte déjà le salaire de l'usager, et l'API n'expose que le SMIC
 * *brut*. Comparer le net de l'usager à ce brut déclencherait « salaire
 * minimum » jusqu'à ~2 054 € net au lieu de ~1 602 €.
 */
export const fetchSmicReference = async (): Promise<SmicReference | null> => {
  try {
    const { evaluate } = await post(buildSmicPayload());

    return {
      brutMensuel: readMonthlyAmount(evaluate?.[0], "SMIC brut"),
      netMensuel: readMonthlyAmount(evaluate?.[1], "SMIC net"),
    };
  } catch (error) {
    Sentry.captureException(error, {
      extra: { rule: RULES.smic, context: "préchargement SMIC serveur" },
    });
    return null;
  }
};
