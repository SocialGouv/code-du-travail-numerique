import {
  Tool,
  EditorialContent,
  ElasticAgreement,
  MailTemplate,
  DocumentElasticWithSource,
} from "@socialgouv/cdtn-types";
import { getAllAgreements } from "../agreements";
import { getAllContributionsGroupByQuestion } from "../contributions";
import { getAllModeles } from "../modeles";
import { getAllThemesAndSubThemes } from "../themes";
import { getAllTools } from "../tools";
import { getAllInformations } from "../informations";
import { ElasticSearchItem } from "../../types";

type Information = Pick<EditorialContent, "slug" | "title">;

export type GetSitemapPage = {
  themes: any;
  tools: Tool[];
  modeles: (DocumentElasticWithSource<MailTemplate> | undefined)[];
  contributions: {
    generic: ElasticSearchItem;
    agreements: ElasticSearchItem[];
  }[];
  agreements: ElasticAgreement[];
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
