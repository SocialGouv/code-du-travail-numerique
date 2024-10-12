import { getLabelBySource, getRouteBySource } from "@socialgouv/cdtn-utils";
import { getByIdsAgreements } from "../agreements";
import { getByIdsContributions } from "../contributions";
import { getBySlugHighlights } from "../highlights";
import { getByIdsModeles } from "../modeles";
import { getAllThemes } from "../themes";
import { getToolsByIds } from "../tools";

export type HomeCardItem = {
  description: string;
  link: string;
  theme: string;
  title: string;
};

export type HomeTileItem = {
  iconName: string;
  link: string;
  title: string;
  description?: string;
};

export type GetHomePage = {
  highlights: HomeCardItem[];
  tools: HomeTileItem[];
  modeles: HomeCardItem[];
  contributions: HomeCardItem[];
  agreements: HomeCardItem[];
  themes: HomeTileItem[];
};

export const getHomeData = async (): Promise<GetHomePage> => {
  const themes = await getAllThemes();
  const parsedThemes = themes.children.map((theme: any) => ({
    iconName: theme.icon,
    link: `/${getRouteBySource(theme.source)}/${theme.slug}`,
    title: theme.title,
  }));

  const highlights = await getBySlugHighlights("homepage");
  const parsedHighlights = highlights.map((highlight: any) => ({
    description: highlight.description,
    link: `/${getRouteBySource(highlight.source)}/${highlight.slug}`,
    theme: getLabelBySource(highlight.source),
    title: highlight.title,
  }));

  const tools = await getToolsByIds([
    "d7ad36850a", // simulateur-embauche
    "d8a3605790", // indemnité-licenciement
    "1eea193273", // preavis-demission
    "db8ffe3574", // convention-collective
  ]);
  const parsedTools = tools.map((tool: any) => ({
    iconName: tool._source.icon,
    link: `/${getRouteBySource(tool._source.source)}/${tool._source.slug}`,
    title: tool._source.title,
    description: tool._source.description,
  }));

  const modeles = await getByIdsModeles([
    "72bd2d0080", // rupture-du-contrat-en-periode-dessai-par-le-salarie
    "772cb955ce", // rupture-de-periode-dessai-par-lemployeur
    "8122c6c3eb", // convocation-a-un-entretien-prealable-au-licenciement-pour-motif-personnel
    "9a6cf1b40c", // lettre-de-demission
  ]);
  const parsedModeles = modeles.map((modele: any) => ({
    description: modele.description,
    link: `/${getRouteBySource(modele.source)}/${modele.slug}`,
    theme: getLabelBySource(modele.source),
    title: modele.title,
  }));

  const contributions = await getByIdsContributions([
    "90c0113ee8", // en-cas-darret-maladie-du-salarie-lemployeur-doit-il-assurer-le-maintien-de-salaire
    "db4f1fe3fb", // quelle-est-la-duree-du-preavis-en-cas-de-demission
    "eba7a4592f", // les-conges-pour-evenements-familiaux
    "f6247840b2", // est-il-obligatoire-davoir-un-contrat-de-travail-ecrit-et-signe
  ]);
  const parsedContributions = contributions.map((contribution: any) => ({
    description: contribution.description,
    link: `/${getRouteBySource(contribution.source)}/${contribution.slug}`,
    theme: getLabelBySource(contribution.source),
    title: contribution.title,
  }));

  const agreements = await getByIdsAgreements([
    "39ac98db5d", // 573-commerces-de-gros
    "81c96604dc", // 2609-batiment-etam
    "2f57b6af7c", // 3248-metallurgie
    "d825ef1df2", // 3239-particuliers-employeurs-et-emploi-a-domicile
  ]);
  const parsedAgreements = agreements.map((agreement: any) => ({
    description: agreement.description,
    link: `/${getRouteBySource(agreement.source)}/${agreement.slug}`,
    theme: getLabelBySource(agreement.source),
    title: agreement.shortTitle,
  }));

  const response = {
    themes: parsedThemes,
    highlights: parsedHighlights,
    tools: parsedTools,
    modeles: parsedModeles,
    contributions: parsedContributions,
    agreements: parsedAgreements,
  };

  return response;
};
