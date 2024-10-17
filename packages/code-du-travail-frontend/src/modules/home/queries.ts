import { getLabelBySource, getRouteBySource } from "@socialgouv/cdtn-utils";
import { fetchRootThemes } from "../themes";
import { fetchHighLights } from "../highlights";
import { fetchTools } from "../outils";
import { fetchModels } from "../modeles-de-courriers";
import { fetchContributions } from "../contributions";
import { fetchAgreements } from "../convention-collective";

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

export type HomePageProps = {
  highlights: HomeCardItem[];
  tools: HomeTileItem[];
  modeles: HomeCardItem[];
  contributions: HomeCardItem[];
  agreements: HomeCardItem[];
  themes: HomeTileItem[];
};

export const fetchHomeData = async (): Promise<HomePageProps> => {
  const highlights = await fetchHighLights();
  const parsedHighlights = highlights.map((highlight) => ({
    description: highlight.description,
    link: `/${getRouteBySource(highlight.source)}/${highlight.slug}`,
    theme: getLabelBySource(highlight.source),
    title: highlight.title,
  }));

  const tools = await fetchTools(
    ["icon", "source", "slug", "title", "description"],
    {
      cdtnIds: [
        "d7ad36850a", // simulateur-embauche
        "d8a3605790", // indemnité-licenciement
        "1eea193273", // preavis-demission
        "db8ffe3574", // convention-collective
      ],
    }
  );
  const parsedTools = tools.map((tool) => ({
    iconName: tool.icon,
    link: `/${getRouteBySource(tool.source)}/${tool.slug}`,
    title: tool.title,
    description: tool.description,
  }));

  const modeles = await fetchModels(
    ["source", "slug", "title", "description"],
    {
      cdtnIds: [
        "72bd2d0080", // rupture-du-contrat-en-periode-dessai-par-le-salarie
        "772cb955ce", // rupture-de-periode-dessai-par-lemployeur
        "8122c6c3eb", // convocation-a-un-entretien-prealable-au-licenciement-pour-motif-personnel
        "9a6cf1b40c", // lettre-de-demission
      ],
    }
  );
  const parsedModeles = modeles.map((modele) => ({
    description: modele.description,
    link: `/${getRouteBySource(modele.source)}/${modele.slug}`,
    theme: getLabelBySource(modele.source),
    title: modele.title,
  }));

  const contributions = await fetchContributions(
    ["source", "slug", "title", "description"],
    {
      cdtnIds: [
        "90c0113ee8", // en-cas-darret-maladie-du-salarie-lemployeur-doit-il-assurer-le-maintien-de-salaire
        "db4f1fe3fb", // quelle-est-la-duree-du-preavis-en-cas-de-demission
        "eba7a4592f", // les-conges-pour-evenements-familiaux
        "f6247840b2", // est-il-obligatoire-davoir-un-contrat-de-travail-ecrit-et-signe
      ],
    }
  );
  const parsedContributions = contributions.map((contribution) => ({
    description: contribution.description,
    link: `/${getRouteBySource(contribution.source)}/${contribution.slug}`,
    theme: getLabelBySource(contribution.source),
    title: contribution.title,
  }));

  const agreements = await fetchAgreements(
    ["source", "slug", "shortTitle", "description"],
    undefined,
    {
      cdtnIds: [
        "39ac98db5d", // 573-commerces-de-gros
        "81c96604dc", // 2609-batiment-etam
        "2f57b6af7c", // 3248-metallurgie
        "d825ef1df2", // 3239-particuliers-employeurs-et-emploi-a-domicile
      ],
    }
  );
  const parsedAgreements = agreements.map((agreement) => ({
    description: agreement.description,
    link: `/${getRouteBySource(agreement.source)}/${agreement.slug}`,
    theme: getLabelBySource(agreement.source),
    title: agreement.shortTitle,
  }));

  const themes = await fetchRootThemes(["title", "icon", "slug", "source"]);
  const parsedThemes = themes.map((theme) => ({
    iconName: theme.icon!,
    link: `/${getRouteBySource(theme.source)}/${theme.slug}`,
    title: theme.title,
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
