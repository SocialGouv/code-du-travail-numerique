import { SOURCES } from "@socialgouv/cdtn-utils";

import { DocumentElasticResult, fetchDocument } from "../documents";
import {
  DocumentElasticWithSource,
  FicheServicePublicDoc,
} from "@socialgouv/cdtn-types";
import { FicheSPData } from "./builder/type";
import { elasticDocumentsIndex, elasticsearchClient } from "../../api/utils";

export type ElasticFicheServicePublic = DocumentElasticWithSource<
  FicheServicePublicDoc,
  typeof SOURCES.SHEET_SP
>;

export type ElasticFicheServicePublicWithData = DocumentElasticWithSource<
  Omit<FicheServicePublicDoc, "raw">,
  typeof SOURCES.SHEET_SP
> & { raw: { children: FicheSPData[] } };

export interface FicheSPSlug {
  slug: string;
}

const formatFiche = (
  fiche: DocumentElasticResult<ElasticFicheServicePublic> | undefined
): DocumentElasticResult<ElasticFicheServicePublicWithData> | undefined => {
  if (!fiche) {
    return undefined;
  }
  const raw: { children: FicheSPData[] } = JSON.parse(fiche.raw);
  return { ...fiche, raw };
};

export const fetchFicheSP = async (
  slug: string
): Promise<
  DocumentElasticResult<ElasticFicheServicePublicWithData> | undefined
> => {
  return formatFiche(
    await fetchDocument<
      ElasticFicheServicePublic,
      keyof DocumentElasticResult<ElasticFicheServicePublic>
    >(
      [
        "breadcrumbs",
        "date",
        "description",
        "slug",
        "title",
        "url",
        "cdtnId",
        "raw",
        "referencedTexts",
      ],
      {
        query: {
          bool: {
            filter: [
              { term: { source: SOURCES.SHEET_SP } },
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

export const fetchAllFichesSP = async (): Promise<FicheSPSlug[]> => {
  try {
    const response = await elasticsearchClient.search<
      Pick<ElasticFicheServicePublic, "slug">
    >({
      index: elasticDocumentsIndex,
      query: {
        bool: {
          filter: [
            { term: { source: SOURCES.SHEET_SP } },
            { term: { isPublished: true } },
          ],
        },
      },
      _source: ["slug"],
      size: 10000,
      sort: [{ slug: { order: "asc" } }],
    });

    const slugs: FicheSPSlug[] = response.hits.hits
      .map((hit) => hit._source?.slug)
      .filter((slug): slug is string => Boolean(slug))
      .map((slug) => ({ slug }));

    console.log(
      `Fetched ${slugs.length} Service Public fiches for static generation`
    );

    return slugs;
  } catch (error) {
    console.error("Error fetching all Service Public fiches:", error);
    return [];
  }
};

export const fetchAllFichesSPWithData = async (): Promise<
  DocumentElasticResult<ElasticFicheServicePublicWithData>[]
> => {
  try {
    const response =
      await elasticsearchClient.search<ElasticFicheServicePublic>({
        index: elasticDocumentsIndex,
        query: {
          bool: {
            filter: [
              { term: { source: SOURCES.SHEET_SP } },
              { term: { isPublished: true } },
            ],
          },
        },
        _source: [
          "breadcrumbs",
          "date",
          "description",
          "slug",
          "title",
          "url",
          "cdtnId",
          "raw",
          "referencedTexts",
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
          }) as DocumentElasticResult<ElasticFicheServicePublic>
      )
      .map(formatFiche)
      .filter(
        (
          fiche
        ): fiche is DocumentElasticResult<ElasticFicheServicePublicWithData> =>
          Boolean(fiche)
      );

    console.log(
      `Fetched ${fiches.length} complete Service Public fiches with data`
    );

    return fiches;
  } catch (error) {
    console.error("Error fetching all Service Public fiches with data:", error);
    return [];
  }
};
