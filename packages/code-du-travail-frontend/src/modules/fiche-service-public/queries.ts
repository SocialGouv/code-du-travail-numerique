import { SOURCES } from "@socialgouv/cdtn-utils";

import { DocumentElasticResult, fetchDocument } from "../documents";
import {
  DocumentElasticWithSource,
  FicheServicePublicDoc,
} from "@socialgouv/cdtn-types";

export type ElasticFicheServicePublic = DocumentElasticWithSource<
  FicheServicePublicDoc,
  typeof SOURCES.SHEET_SP
>;

const formatFiche = (
  fiche: DocumentElasticResult<ElasticFicheServicePublic> | undefined
): DocumentElasticResult<ElasticFicheServicePublic> | undefined => {
  if (!fiche) {
    return undefined;
  }
  fiche.raw = JSON.parse(fiche.raw);
  return fiche;
};

export const fetchFicheSP = async (
  slug: string
): Promise<DocumentElasticResult<ElasticFicheServicePublic> | undefined> => {
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
