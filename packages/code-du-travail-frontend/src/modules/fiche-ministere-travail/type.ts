import {
  DocumentElasticWithSource,
  FicheTravailEmploiDoc,
  Section,
} from "@socialgouv/cdtn-types";

export type ElasticFicheTravailEmploi = DocumentElasticWithSource<
  Omit<FicheTravailEmploiDoc, "sections">
> & {
  sections: ElasticFicheTravailEmploiSection[];
};

export type ElasticFicheTravailEmploiSection = Omit<
  Section,
  "htmlWithGlossary" | "text" | "description"
>;
