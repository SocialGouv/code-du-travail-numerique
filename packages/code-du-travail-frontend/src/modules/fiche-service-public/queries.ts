import { SOURCES } from "@socialgouv/cdtn-utils";

import { DocumentElasticResult, fetchDocument } from "../documents";
import {
  DocumentElasticWithSource,
  FicheServicePublicDoc,
} from "@socialgouv/cdtn-types";
import { FicheSPData } from "./builder/type";

export type ElasticFicheServicePublic = DocumentElasticWithSource<
  FicheServicePublicDoc,
  typeof SOURCES.SHEET_SP
>;

export type ElasticFicheServicePublicWithData = DocumentElasticWithSource<
  Omit<FicheServicePublicDoc, "raw">,
  typeof SOURCES.SHEET_SP
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
