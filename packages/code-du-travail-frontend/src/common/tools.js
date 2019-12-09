import { getRouteBySource, SOURCES } from "@cdt/sources";

// /!\ Beware, the order of the tools here is important, don’t mess with it
// unless you know what you are doing !
export const tools = [
  {
    title: "Modèles de documents",
    action: "Découvrir",
    description:
      "Téléchargez et utilisez des modèles de lettres et de documents personnalisables",
    href: "/modeles-de-courriers",
    icon: "Document"
  },
  {
    title: "Indemnité de licenciement",
    action: "Estimer",
    description: "Estimez le montant de l’indemnité de licenciement",
    href: `/${getRouteBySource(SOURCES.TOOLS)}/[slug]`,
    as: `/${getRouteBySource(SOURCES.TOOLS)}/indemnite-licenciement`,
    icon: "Indemnity"
  },
  {
    title: "Préavis de démission",
    action: "Calculer",
    description: "Calculez la durée de préavis de démission",
    href: `/${getRouteBySource(SOURCES.TOOLS)}/[slug]`,
    as: `/${getRouteBySource(SOURCES.TOOLS)}/preavis-demission`,
    icon: "Rules"
  },
  {
    title: "Salaire brut/net",
    action: "Estimer",
    description:
      "Estimez le salaire : brut, net, heures supplémentaires, coût total employeur",
    href: `/${getRouteBySource(SOURCES.TOOLS)}/[slug]`,
    as: `/${getRouteBySource(SOURCES.TOOLS)}/simulateur-embauche`,
    icon: "Salary"
  },
  {
    title: "Indemnité de précarité",
    action: "Estimer",
    description: "Estimez le montant de l’indemnité de fin de CDD ou intérim",
    href: `/${getRouteBySource(SOURCES.TOOLS)}/[slug]`,
    as: `/${getRouteBySource(SOURCES.TOOLS)}/indemnite-precarite`,
    icon: "Precarity"
  },
  {
    title: "Préavis de licenciement",
    action: "Calculer",
    description: "Calculez la durée de préavis de licenciement",
    href: `/${getRouteBySource(SOURCES.TOOLS)}/[slug]`,
    as: `/${getRouteBySource(SOURCES.TOOLS)}/preavis-licenciement`,
    icon: "Termination"
  }
];
