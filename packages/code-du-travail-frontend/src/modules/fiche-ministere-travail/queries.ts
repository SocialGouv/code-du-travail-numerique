import { SOURCES } from "@socialgouv/cdtn-utils";

import { DocumentElasticResult, fetchDocument } from "../documents";
import {
  ElasticFicheTravailEmploi,
  ElasticFicheTravailEmploiSection,
} from "@socialgouv/cdtn-types";
import { elasticDocumentsIndex, elasticsearchClient } from "../../api/utils";

export type FicheMT = DocumentElasticResult<ElasticFicheTravailEmploi> & {
  highlight?: ElasticFicheTravailEmploiSection;
  sections: ElasticFicheTravailEmploiSection[];
};

export interface FicheMTSlug {
  slug: string;
}

const formatFiche = (
  fiche: DocumentElasticResult<ElasticFicheTravailEmploi> | undefined
): FicheMT | undefined => {
  if (!fiche) {
    return undefined;
  }
  return {
    ...fiche,
    highlight: fiche.sections.find(
      (section) => !section.anchor || section.anchor === ""
    ),
    sections: fiche.sections.filter(
      (section) => section.anchor && section.anchor !== ""
    ),
  };
};

export const fetchFicheMT = async (
  slug: string
): Promise<FicheMT | undefined> => {
  return formatFiche(
    await fetchDocument<
      ElasticFicheTravailEmploi,
      keyof DocumentElasticResult<ElasticFicheTravailEmploi>
    >(
      [
        "breadcrumbs",
        "date",
        "description",
        "intro",
        "sections",
        "slug",
        "title",
        "url",
        "cdtnId",
      ],
      {
        query: {
          bool: {
            filter: [
              { term: { source: SOURCES.SHEET_MT_PAGE } },
              { term: { slug } },
              { term: { isPublished: true } },
            ],
          },
        },
        size: 1,
      }
    )
  );
};

export const fetchAllFichesMT = async (): Promise<FicheMTSlug[]> => {
  try {
    const response = await elasticsearchClient.search<
      Pick<ElasticFicheTravailEmploi, "slug">
    >({
      index: elasticDocumentsIndex,
      query: {
        bool: {
          filter: [
            { term: { source: SOURCES.SHEET_MT_PAGE } },
            { term: { isPublished: true } },
          ],
        },
      },
      _source: ["slug"],
      size: 10000,
      sort: [{ slug: { order: "asc" } }],
    });

    const slugs: FicheMTSlug[] = response.hits.hits
      .map((hit) => hit._source?.slug)
      .filter((slug): slug is string => Boolean(slug))
      .map((slug) => ({ slug }));

    console.log(
      `Fetched ${slugs.length} Ministère du Travail fiches for static generation`
    );

    return slugs;
  } catch (error) {
    console.error("Error fetching all Ministère du Travail fiches:", error);
    return [];
  }
};

export const fetchAllFichesMTWithData = async (): Promise<FicheMT[]> => {
  try {
    const response =
      await elasticsearchClient.search<ElasticFicheTravailEmploi>({
        index: elasticDocumentsIndex,
        query: {
          bool: {
            filter: [
              { term: { source: SOURCES.SHEET_MT_PAGE } },
              { term: { isPublished: true } },
            ],
          },
        },
        _source: [
          "breadcrumbs",
          "date",
          "description",
          "intro",
          "sections",
          "slug",
          "title",
          "url",
          "cdtnId",
        ],
        size: 10000,
        sort: [{ slug: { order: "asc" } }],
      });

    const fiches = response.hits.hits
      .map(
        (hit) =>
          ({
            ...hit._source,
            _id: hit._id,
          }) as DocumentElasticResult<ElasticFicheTravailEmploi>
      )
      .map(formatFiche)
      .filter((fiche): fiche is FicheMT => Boolean(fiche));

    console.log(
      `Fetched ${fiches.length} complete Ministère du Travail fiches with data`
    );

    return fiches;
  } catch (error) {
    console.error(
      "Error fetching all Ministère du Travail fiches with data:",
      error
    );
    return [];
  }
};
