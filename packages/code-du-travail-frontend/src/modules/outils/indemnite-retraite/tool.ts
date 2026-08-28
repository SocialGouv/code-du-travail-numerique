import { ElasticTool } from "@socialgouv/cdtn-types";
import { DocumentElasticResult } from "src/modules/documents";
import { fetchTool } from "src/modules/outils";
import type { ToolItem } from "../../../../app/outils/page";

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
const TITRE = "Calculer l'indemnité de départ à la retraite";

const DESCRIPTION =
  "Vous souhaitez calculer le montant de l’indemnité de départ ou mise à la retraite ? Notre simulateur vous apporte une réponse personnalisée.";

const FALLBACK_TOOL: DocumentElasticResult<ElasticTool> = {
  _id: "",
  description: DESCRIPTION,
  displayTitle: TITRE,
  metaDescription: DESCRIPTION,
  metaTitle: TITRE,
  title: TITRE,
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

const INDEMNITE_RETRAITE_URL = `/outils/${INDEMNITE_RETRAITE_SLUG}`;

/**
 * TODO(#7131) — Repli temporaire, à supprimer avec le reste du fichier.
 *
 * La liste `/outils` est construite uniquement à partir d'Elasticsearch
 * (`fetchTools`) : tant que le document n'existe pas, la carte du simulateur
 * manque et celui-ci n'est atteignable que par URL directe. On l'ajoute donc
 * ici, en fin de liste, pour pouvoir dérouler le parcours depuis la liste des
 * simulateurs. Le titre court est celui des tuiles voisines (« Indemnité de
 * licenciement », « Préavis de démission »), et non le titre de page.
 *
 * `order`, `icon` et `action` définitifs seront ceux du document créé dans
 * cdtn-admin ; dès qu'il existera, la liste contiendra déjà l'entrée et ce
 * repli deviendra inerte avant sa suppression.
 */
export const withIndemniteRetraiteTile = (tools: ToolItem[]): ToolItem[] =>
  tools.some(({ url }) => url === INDEMNITE_RETRAITE_URL)
    ? tools
    : [
        ...tools,
        {
          id: INDEMNITE_RETRAITE_SLUG,
          description: DESCRIPTION,
          metaDescription: DESCRIPTION,
          icon: "Indemnity",
          title: "Indemnité de départ à la retraite",
          url: INDEMNITE_RETRAITE_URL,
        },
      ];
