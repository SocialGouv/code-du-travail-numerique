import { ElasticTool } from "@socialgouv/cdtn-types";
import { SOURCES } from "@socialgouv/cdtn-utils";
import { DocumentElasticResult, fetchDocument } from "src/modules/documents";
import { fetchTool } from "src/modules/outils";
import { IndemniteDepartType } from "../indemnite-depart/types";
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

/**
 * Titre de page (h1, metas), servi par le `displayTitle` du document.
 */
const TITRE_AFFICHE = "Calculer l'indemnité de départ à la retraite";

/**
 * Nom court du simulateur, servi par le `title` du document. Il n'est pas
 * cosmétique : `useSimulatorLayoutTracking` en dérive l'action Matomo
 * `view_step_<title>`, que `MatomoActionEvent.INDEMNITE_RETRAITE` déclare à
 * partir de `IndemniteDepartType.RETRAITE`. Les deux doivent coïncider, sans
 * quoi le tunnel se scinde en deux séries inexploitables — le document créé
 * dans cdtn-admin devra donc porter exactement ce `title`.
 */
const TITRE_COURT = IndemniteDepartType.RETRAITE;

const DESCRIPTION =
  "Vous souhaitez calculer le montant de l’indemnité de départ ou mise à la retraite ? Notre simulateur vous apporte une réponse personnalisée.";

const FALLBACK_TOOL: DocumentElasticResult<ElasticTool> = {
  _id: "",
  description: DESCRIPTION,
  displayTitle: TITRE_AFFICHE,
  metaDescription: DESCRIPTION,
  metaTitle: TITRE_AFFICHE,
  title: TITRE_COURT,
} as DocumentElasticResult<ElasticTool>;

/**
 * Le document `outils` de ce slug existe-t-il en base, quel que soit son état
 * de publication ?
 *
 * `fetchTool` filtre sur `isPublished` et `fetchTools` y ajoute `displayTool` :
 * un brouillon, ou un simulateur volontairement dépublié, leur est aussi
 * invisible qu'un document absent. Sans cette distinction, les deux replis
 * continueraient de servir un contenu figé dans le code, que la rédaction ne
 * pourrait plus ni corriger ni retirer. Ils ne valent donc que pour un document
 * qui n'existe pas du tout ; dès qu'il existe, la page se comporte comme les
 * autres simulateurs, 404 comprise.
 *
 * Une panne Elasticsearch fait lever cette sonde, et l'incident reste visible
 * au lieu d'être masqué par le repli.
 */
const hasIndemniteRetraiteDocument = async (): Promise<boolean> =>
  (await fetchDocument<ElasticTool, "slug">(["slug"], {
    query: {
      bool: {
        filter: [
          { term: { source: SOURCES.TOOLS } },
          { term: { slug: INDEMNITE_RETRAITE_SLUG } },
        ],
      },
    },
  })) !== undefined;

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
  } catch (error) {
    if (await hasIndemniteRetraiteDocument()) {
      throw error;
    }
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
 * simulateurs. La tuile affiche le `title` du document, comme ses voisines
 * (« Indemnité de licenciement », « Préavis de démission »), et non le titre
 * de page.
 *
 * `order`, `icon` et `action` définitifs seront ceux du document créé dans
 * cdtn-admin ; dès qu'il existera, la liste contiendra déjà l'entrée et ce
 * repli deviendra inerte avant sa suppression.
 */
export const withIndemniteRetraiteTile = async (
  tools: ToolItem[]
): Promise<ToolItem[]> => {
  if (tools.some(({ url }) => url === INDEMNITE_RETRAITE_URL)) return tools;
  // Document présent mais en brouillon ou masqué (`displayTool: false`) : c'est
  // une décision de la rédaction, la tuile ne doit pas la contourner.
  if (await hasIndemniteRetraiteDocument()) return tools;
  return [
    ...tools,
    {
      id: INDEMNITE_RETRAITE_SLUG,
      description: DESCRIPTION,
      metaDescription: DESCRIPTION,
      icon: "Indemnity",
      title: TITRE_COURT,
      url: INDEMNITE_RETRAITE_URL,
    },
  ];
};
