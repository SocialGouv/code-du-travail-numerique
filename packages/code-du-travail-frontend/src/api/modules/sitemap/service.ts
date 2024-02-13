import { Agreement, ElasticSearchItem, Tool } from "@socialgouv/cdtn-utils";
import { getAllAgreements } from "../agreements";
import { getAllContributionsGroupByQuestion } from "../contributions";
import { getAllModeles } from "../modeles";
import { getAllThemesAndSubThemes } from "../themes";
import { getAllTools } from "../tools";

export type GetSitemapPage = {
  themes: any;
  tools: Tool[];
  modeles: ElasticSearchItem[];
  contributions: { generic: ElasticSearchItem; CCs: ElasticSearchItem[] }[];
  agreements: Agreement[];
};

export const getSitemapData = async () => {
  const themes = await getAllThemesAndSubThemes();
  const tools = await getAllTools();
  const modeles = await getAllModeles();
  const contributions = await getAllContributionsGroupByQuestion();
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
