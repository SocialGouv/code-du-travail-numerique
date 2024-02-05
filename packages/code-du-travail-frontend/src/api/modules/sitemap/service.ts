import { Agreement, ElasticSearchItem, Tool } from "@socialgouv/cdtn-utils";
import { getAllAgreements } from "../agreements";
import {
  getBySlugsContributions,
  getGenericsContributions,
} from "../contributions";
import { getAllModeles } from "../modeles";
import { getAllThemesAndSubThemes } from "../themes";
import { getAllTools } from "../tools";
import { getCCByIdcc } from "../idcc";

export type GetSitemapPage = {
  themes: any;
  tools: Tool[];
  modeles: ElasticSearchItem[];
  contributions: ElasticSearchItem[];
  agreements: Agreement[];
};

export const getSitemapData = async () => {
  const themes = await getAllThemesAndSubThemes();
  const tools = await getAllTools();
  const modeles = await getAllModeles();
  const contributions = await getGenericsContributions();
  const agreements = await getAllAgreements();
  const response: GetSitemapPage = {
    themes,
    tools,
    modeles,
    contributions,
    agreements,
  };

  return response;
};

export const getContributionSitemapData = async (slug: string) => {
  const result = await getBySlugsContributions([slug]);
  if (!result.length) return [];
  const genericContrib = result[0];

  if (!genericContrib.ccSupported || !genericContrib.ccSupported.length)
    return [];
  const all = await getBySlugsContributions(
    genericContrib.ccSupported.map((cc) => `${cc}-${slug}`)
  );

  const contribsWithTitle = await Promise.all(
    all.map(async (contrib) => {
      const cc = await getCCByIdcc(contrib.idcc);
      contrib.title = cc.shortTitle + ": " + contrib.title;
      return contrib;
    })
  );

  return [genericContrib, ...contribsWithTitle].map((c) => {
    return {
      slug: c.slug,
      title: c.title,
    };
  });
};
