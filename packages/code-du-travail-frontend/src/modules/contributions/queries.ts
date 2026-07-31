import { elasticDocumentsIndex, elasticsearchClient } from "../../api/utils";
import { SOURCES } from "@socialgouv/cdtn-utils";
import {
  DocumentElasticResult,
  fetchDocument,
  formatRelatedItems,
  LinkedContent,
} from "../documents";
import {
  AgreementDeclination,
  Contribution,
  ContributionElasticDocument,
} from "./type";
import { fetchAllAgreements } from "../convention-collective/queries";
import { buildContributionAgreementPath } from "./contributionUtils";

export const fetchContributions = async <
  K extends keyof ContributionElasticDocument,
>(
  fields: K[],
  filters?: {
    cdtnIds?: string[];
    generic?: boolean;
  }
): Promise<Pick<ContributionElasticDocument, K>[]> => {
  const baseFilters: Array<any> = [
    { term: { source: SOURCES.CONTRIBUTIONS } },
    { term: { isPublished: true } },
  ];

  if (filters?.cdtnIds) {
    baseFilters.push({ terms: { cdtnId: filters.cdtnIds } });
  }

  if (filters?.generic) {
    baseFilters.push({ term: { idcc: "0000" } });
  }

  const result = await elasticsearchClient.search<
    Pick<ContributionElasticDocument, K>
  >({
    query: {
      bool: {
        filter: baseFilters,
      },
    },
    size: 3000,
    _source: fields,
    index: elasticDocumentsIndex,
  });

  return result.hits.hits
    .map(({ _source }) => _source)
    .filter((source) => source !== undefined);
};

const formatContribution = (
  contribution: ContributionElasticDocument | undefined
): Contribution | undefined => {
  if (!contribution) {
    return undefined;
  }
  return {
    ...contribution,
    isGeneric: contribution.idcc === "0000",
    isNoCDT: contribution?.type === "generic-no-cdt",
    isFicheSP: "raw" in contribution,
    relatedItems: contribution.linkedContent
      ? formatRelatedItems(contribution.linkedContent as LinkedContent[])
      : [],
  };
};

// Champs du document générique nécessaires au bloc de sélection de CC : les
// documents conventionnels ne portent pas ccSupported/ccUnextended/type, seul
// le document générique frère permet de classifier une CC choisie par l'usager.
export type GenericContributionInfos = Pick<
  ContributionElasticDocument,
  "ccSupported" | "ccUnextended" | "type" | "messageBlockGenericNoCDT"
>;

export const fetchGenericContributionInfos = async (
  genericSlug: string
): Promise<GenericContributionInfos | undefined> =>
  fetchDocument<
    GenericContributionInfos,
    keyof DocumentElasticResult<GenericContributionInfos>
  >(["ccSupported", "ccUnextended", "type", "messageBlockGenericNoCDT"], {
    index: elasticDocumentsIndex,
    query: {
      bool: {
        filter: [
          { term: { source: SOURCES.CONTRIBUTIONS } },
          { term: { slug: genericSlug } },
          { term: { isPublished: true } },
        ],
      },
    },
    size: 1,
  });

// Nombre maximal de conventions collectives résolues pour construire la liste
// des déclinaisons. `fetchAllAgreements` plafonne à 100 par défaut, ce qui
// tronquerait la liste sans le signaler ; le filtre `contributions: true` de la
// requête garde le volume très en deçà de cette borne.
const MAX_AGREEMENTS = 1000;

/**
 * Déclinaisons par convention collective d'une contribution générique.
 *
 * `ccSupported` liste les CC traitées pour cette question, `ccUnextended` celles
 * dont les dispositions ne sont pas étendues : le parcours de sélection ne
 * renvoie jamais l'usager vers leur page (cf. `isAgreementValid`), on ne les
 * référence donc pas non plus ici. Les deux portent l'IDCC sur 4 chiffres
 * (zéros de tête), qui est aussi la valeur du champ `id` d'un document
 * « convention collective » — d'où la comparaison avec `agreement.id`, comme le
 * fait déjà `isAgreementSupported`. Le générique se liste lui-même (« 0000 ») :
 * aucun accord ne porte cet identifiant, il disparaît naturellement du filtre.
 *
 * Le rapprochement se fait en mémoire : le champ `id` n'est pas déclaré dans le
 * mapping Elasticsearch, une requête `terms` dessus dépendrait du mapping
 * dynamique. Le volume d'accords reste faible (filtre `contributions: true`).
 */
export const fetchAgreementDeclinations = async (
  contribution: Pick<Contribution, "slug" | "ccSupported" | "ccUnextended">
): Promise<AgreementDeclination[]> => {
  const { slug, ccSupported = [], ccUnextended = [] } = contribution;
  if (ccSupported.length === 0) {
    return [];
  }
  const unextended = new Set(ccUnextended);
  const agreements = await fetchAllAgreements({
    fields: ["id", "num", "slug", "shortTitle"],
    sortBy: "shortTitle",
    size: MAX_AGREEMENTS,
  });
  return agreements
    .filter(({ id }) => ccSupported.includes(id) && !unextended.has(id))
    .map(({ num, slug: agreementSlug, shortTitle }) => ({
      shortTitle,
      href: buildContributionAgreementPath(slug, {
        num,
        slug: agreementSlug,
      }),
    }));
};

export const fetchContributionBySlug = async (
  slug: string
): Promise<Contribution | undefined> => {
  const response = await fetchDocument<
    ContributionElasticDocument,
    keyof DocumentElasticResult<ContributionElasticDocument>
  >(
    [
      "metas",
      "idcc",
      "date",
      "title",
      "slug",
      "type",
      "linkedContent",
      "breadcrumbs",
      "ccSupported",
      "ccUnextended",
      "messageBlock",
      "references",
      "ccnShortTitle",
      "ccnSlug",
      "raw",
      "ficheSpDescription",
      "content",
      "url",
      "messageBlockGenericNoCDT",
      "infographics",
      "smicValue",
    ],
    {
      index: elasticDocumentsIndex,
      query: {
        bool: {
          filter: [
            { term: { source: SOURCES.CONTRIBUTIONS } },
            { term: { slug } },
            { term: { isPublished: true } },
          ],
        },
      },
      size: 1,
    }
  );
  return formatContribution(response);
};
