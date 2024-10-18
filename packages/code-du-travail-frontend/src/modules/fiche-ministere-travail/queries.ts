import { SOURCES } from "@socialgouv/cdtn-utils";

import { DocumentElasticResult, fetchDocument } from "../documents";
import {
  ElasticFicheTravailEmploi,
  ElasticFicheTravailEmploiSection,
} from "@socialgouv/cdtn-types";

export type FicheMT = DocumentElasticResult<ElasticFicheTravailEmploi> & {
  highlight?: ElasticFicheTravailEmploiSection;
  sections: ElasticFicheTravailEmploiSection[];
};

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
