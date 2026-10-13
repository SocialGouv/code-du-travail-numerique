import { SOURCES } from "@socialgouv/cdtn-utils";

import { DocumentElasticResult, fetchDocument } from "../documents";
import {
  DocumentElasticWithSource,
  FicheServicePublicDoc,
} from "@socialgouv/cdtn-types";
import { FicheSPData } from "./builder/type";

// TODO: importer `ElasticFicheServicePublic` et `RecommendedLink` depuis
// `@socialgouv/cdtn-types` dès qu'une version publiée les exporte (> 2.74.0).
export type RecommendedLink =
  | {
      type: "document";
      cdtnId: string;
      slug: string;
      source: string;
      title: string;
      confidence: string;
      score: number;
      rank: number;
    }
  | {
      type: "l2";
      l2: string;
      l1: string;
      title: string;
      confidence: string;
      score: number;
      rank: number;
    };

export type ElasticFicheServicePublic = DocumentElasticWithSource<
  FicheServicePublicDoc,
  typeof SOURCES.SHEET_SP
> & { links: RecommendedLink[] };

export type ElasticFicheServicePublicWithData = Omit<
  ElasticFicheServicePublic,
  "raw"
> & { raw: { children: FicheSPData[] } };

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
        "links",
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
