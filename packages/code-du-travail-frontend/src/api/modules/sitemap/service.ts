import {
  Agreement,
  ElasticSearchItem,
  Tool,
  EditorialContent,
} from "@socialgouv/cdtn-utils";
import { getAllAgreements } from "../agreements";
import { getAllContributionsGroupByQuestion } from "../contributions";
import { getAllModeles } from "../modeles";
import { getAllThemesAndSubThemes } from "../themes";
import { getAllTools } from "../tools";
import { getAllInformations } from "../informations";

type Information = Pick<EditorialContent, "slug" | "title">;

export type GetSitemapPage = {
  themes: any;
  tools: Tool[];
  modeles: ElasticSearchItem[];
  contributions: {
    generic: ElasticSearchItem;
    agreements: ElasticSearchItem[];
  }[];
  agreements: Agreement[];
  informations: Information[];
};

export const getSitemapData = async () => {
  const themes = await getAllThemesAndSubThemes();
  const tools = await getAllTools();
  const modeles = await getAllModeles();
  const agreements = await getAllAgreements();
  const informations = await getAllInformations();
  const contributions = await getAllContributionsGroupByQuestion(agreements);
  const response: GetSitemapPage = {
    themes,
    tools,
    modeles,
    contributions,
    agreements,
    informations,
  };

  return response;
};
