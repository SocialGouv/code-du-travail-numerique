import * as Sentry from "@sentry/nextjs";
import { URSSAF_API_URL } from "../../../../config";
import { roundToCents } from "../domain/amount";
import { RULES } from "../domain/constants";
import {
  buildSmicBrutPayload,
  buildUrssafPayload,
  readUnit,
} from "../domain/situation";
import type { SmicReference, UrssafResponse } from "../domain/types";
import { EVALUATE_ENDPOINT } from "./evaluate";

/** Une journée : le SMIC ne bouge qu'à la revalorisation. */
const REVALIDATE_SECONDS = 86_400;

const post = async (payload: unknown): Promise<UrssafResponse> => {
  const response = await fetch(`${URSSAF_API_URL}${EVALUATE_ENDPOINT}`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(payload),
    next: { revalidate: REVALIDATE_SECONDS },
  });

  if (!response.ok) {
    throw new Error(`L'API URSSAF a répondu ${response.status}`);
  }
  return (await response.json()) as UrssafResponse;
};

/**
 * Lit un montant en €/mois dans la première entrée d'une réponse.
 *
 * `GET /api/v1/rules/{règle}` ne peut pas servir ici : il renvoie la règle
 * brute — pour le SMIC, la formule `"temps de travail * SMIC . horaire"` — et
 * non sa valeur. Seul `POST /evaluate` produit un montant.
 */
const readFirstMonthlyAmount = (
  response: UrssafResponse,
  label: string
): number => {
  const entry = response.evaluate?.[0];

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
 * Deux requêtes — le brut, puis le net qu'on en déduit — mais mises en cache
 * 24 h par Next : la pression sur le quota de l'URSSAF est nulle, contrairement
 * à ce que ferait un appel par visiteur sur la page la plus consultée du site.
 *
 * Ne lève jamais : le SMIC est un confort, pas une dépendance. En cas d'échec la
 * page se rend sans le bouton « SMIC », et le message contextuel reste correct
 * car chaque évaluation client renvoie elle aussi le SMIC net.
 */
export const fetchSmicReference = async (): Promise<SmicReference | null> => {
  try {
    const brutMensuel = readFirstMonthlyAmount(
      await post(buildSmicBrutPayload()),
      "SMIC brut"
    );

    const netResponse = await post(
      buildUrssafPayload({
        field: "salaireBrut",
        amountMonthly: brutMensuel,
        period: "mois",
        contract: "CDI",
      })
    );
    // Le net avant impôt est la 3ᵉ expression du payload du simulateur.
    const netEntry = netResponse.evaluate?.[2];
    if (
      !netEntry ||
      netEntry.error ||
      typeof netEntry.nodeValue !== "number" ||
      !Number.isFinite(netEntry.nodeValue) ||
      readUnit(netEntry.unit) !== "€/mois"
    ) {
      throw new Error("SMIC net : réponse inexploitable");
    }

    return { brutMensuel, netMensuel: roundToCents(netEntry.nodeValue) };
  } catch (error) {
    Sentry.captureException(error, {
      extra: { rule: RULES.smic, context: "préchargement SMIC serveur" },
    });
    return null;
  }
};
