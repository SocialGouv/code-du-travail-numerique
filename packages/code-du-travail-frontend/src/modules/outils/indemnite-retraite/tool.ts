import { ElasticTool } from "@socialgouv/cdtn-types";
import { DocumentElasticResult } from "src/modules/documents";
import { fetchTool } from "src/modules/outils";

export const INDEMNITE_RETRAITE_SLUG = "indemnite-retraite";

/**
 * TODO(#7131) — Repli temporaire, à supprimer.
 *
 * Le contenu des simulateurs vient d'Elasticsearch (documents de source
 * `outils`, alimentés par cdtn-admin). Le document de slug `indemnite-retraite`
 * n'a pas encore été créé côté métier : sans ce repli, `fetchTool` lève et la
 * page renvoie une 404, y compris en préprod où tournent les tests e2e.
 *
 * Les valeurs ci-dessous sont celles figées par la RG0 de la spécification.
 * Dès que le document existera en base, supprimer ce fichier et rebrancher les
 * routes directement sur `fetchTool`, comme les autres simulateurs.
 */
const FALLBACK_TOOL: DocumentElasticResult<ElasticTool> = {
  _id: "",
  description:
    "Vous souhaitez calculer le montant de l’indemnité de départ ou mise à la retraite ? Notre simulateur vous apporte une réponse personnalisée.",
  displayTitle: "Calculer l'indemnité de départ à la retraite",
  metaDescription:
    "Vous souhaitez calculer le montant de l’indemnité de départ ou mise à la retraite ? Notre simulateur vous apporte une réponse personnalisée.",
  metaTitle: "Calculer l'indemnité de départ à la retraite",
  title: "Calculer l'indemnité de départ à la retraite",
} as DocumentElasticResult<ElasticTool>;

/**
 * Renvoie le document `outils` du simulateur, ou son repli tant qu'il n'existe
 * pas en base. `isPublished` distingue les deux cas : les appels dépendant d'un
 * `_id` réel (contenus liés) doivent être ignorés quand il vaut `false`.
 */
export const getIndemniteRetraiteTool = async (): Promise<{
  tool: DocumentElasticResult<ElasticTool>;
  isPublished: boolean;
}> => {
  try {
    const tool = await fetchTool(INDEMNITE_RETRAITE_SLUG);
    return { isPublished: true, tool };
  } catch {
    return { isPublished: false, tool: FALLBACK_TOOL };
  }
};
