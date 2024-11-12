import {
  ContributionElasticDocument,
  ElasticAgreement,
} from "@socialgouv/cdtn-types";
import { fetchAgreements } from "../convention-collective/queries";
import { orderByAlpha } from "../utils";
import { fetchRootThemes } from "../themes";
import { fetchTools } from "../outils";
import { fetchModels } from "../modeles-de-courriers";
import { fetchAllInformations } from "../informations";
import { fetchContributions } from "../contributions";

export type Document = {
  root: DocumentInfo;
  children?: DocumentInfo[];
};
export type DocumentInfo = {
  slug: string;
  title: string;
};

export type GetSitemapPage = {
  themes: Document[];
  tools: Document[];
  modeles: Document[];
  contributions: Document[];
  agreements: Document[];
  informations: Document[];
};

export const fetchSitemapData = async () => {
  const themes = await getAllThemesAndSubThemes();
  const tools = await fetchTools(["slug", "title"]);
  const modeles = await fetchModels(["slug", "title"]);
  const agreements = await fetchAgreements(
    ["slug", "shortTitle", "num"],
    "shortTitle"
  );
  const informations = await fetchAllInformations(["slug", "title"], "title");
  const contributions = await getAllContributionsGroupByQuestion(agreements);
  const response: GetSitemapPage = {
    themes,
    tools: tools.map((root) => ({
      root,
    })),
    modeles: modeles.map((root) => ({
      root,
    })),
    contributions,
    agreements: agreements.map((agg) => ({
      root: { title: agg.shortTitle, slug: agg.slug },
    })),
    informations: informations.map((root) => ({
      root,
    })),
  };

  return response;
};

const getAllContributionsGroupByQuestion = async (
  agreements: Pick<ElasticAgreement, "shortTitle" | "num">[]
) => {
  const all = await fetchContributions(["idcc", "title", "slug"]);
  const allGenerics = all
    .filter(isGeneric)
    .sort((a, b) => orderByAlpha(a, b, "title"));

  return allGenerics.map((generic) => {
    return {
      root: {
        title: generic.title,
        slug: generic.slug,
      },
      children: all
        .filter(
          (contrib) =>
            !isGeneric(contrib) && contrib.slug.includes(generic.slug)
        )
        .map((contrib) => ({
          slug: contrib.slug,
          title: getTitle(agreements, contrib),
        }))
        .sort((a, b) => orderByAlpha(a, b, "title")),
    };
  });
};

const isGeneric = (contrib: { idcc: string }) => contrib.idcc === "0000";

const getTitle = (
  agreements: Pick<ElasticAgreement, "num" | "shortTitle">[],
  contrib: Pick<ContributionElasticDocument, "idcc" | "title" | "slug">
): string => {
  const agreement = agreements.find((a) => a.num === parseInt(contrib.idcc));
  return agreement
    ? `${contrib.title} - ${agreement.shortTitle}`
    : contrib.title;
};

export const getAllThemesAndSubThemes = async (): Promise<Document[]> => {
  const themes = await fetchRootThemes(["title", "children", "slug"]);

  return themes.map(({ slug, title, children }) => {
    return {
      root: {
        slug,
        title,
      },
      children: children.map((child) => ({
        title: child.label,
        slug: child.slug,
      })),
    };
  });
};
