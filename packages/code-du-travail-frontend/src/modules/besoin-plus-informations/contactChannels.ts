// Moyens de contact proposés à l'écran « Choisir votre moyen de contact »
// (issue #7480). Le canal « Formulaire et courriel » de la maquette n'est pas
// livré dans cette itération : l'ajouter reviendra à ajouter une entrée ici et
// sa branche dans le parcours.
export type ChannelKey = "telephone" | "rdv";

export type ContactChannel = {
  key: ChannelKey;
  label: string;
};

export const CONTACT_CHANNELS: ContactChannel[] = [
  { key: "telephone", label: "Téléphone" },
  { key: "rdv", label: "Rendez-vous sur place" },
];

// Erreur affichée quand l'usager valide sans avoir choisi de moyen de contact.
// Même parti pris qu'à l'écran thème : « Suivant » reste actionnable.
export const MISSING_CHANNEL_ERROR =
  "Sélectionnez un moyen de contact pour continuer.";

// Aide au choix du canal, reprise de la maquette sans la ligne sur le
// formulaire (canal non livré).
export const CHANNEL_HELP_TITLE = "Comment choisir le moyen de contact ?";
export const CHANNEL_HELP_ITEMS = [
  "Le téléphone permet de répondre aux situations courantes ne nécessitant pas d'analyser dans le détail votre situation.",
  "Les rendez-vous sur place sont à privilégier pour les dossiers complexes nécessitant des échanges.",
];
export const CHANNEL_HELP_FOOTER =
  "Dans tous les cas, munissez-vous de vos documents (contrat de travail, bulletin de salaire, etc.).";

export type Departement = {
  code: string;
  name: string;
};

export type RdvRegion = {
  key: string;
  label: string;
  // Page de prise de rendez-vous de la région sur RDV Service Public. Une
  // région sans URL est fermée : elle n'apparaît ni dans le message de
  // l'étape 2 ni dans la liste des départements de l'étape 3. Renseigner l'URL
  // suffit à l'ouvrir.
  url?: string;
  departements: Departement[];
};

// URL provisoire, le temps que le PO fournisse les liens définitifs des
// quatre régions (ils arriveront ensemble). Les anciens liens SmartAgenda /
// ClicRDV ne doivent pas être repris. À remplacer avant mise en production.
const PLACEHOLDER_RDV_URL = "https://www.rdv-service-public.fr/";

// Régions dont les services de renseignement en droit du travail proposent la
// prise de rendez-vous sur place. Piloté par la donnée : ouvrir une région =
// ajouter une entrée avec son URL.
export const RDV_REGIONS: RdvRegion[] = [
  {
    key: "auvergne-rhone-alpes",
    label: "Auvergne-Rhône-Alpes",
    url: PLACEHOLDER_RDV_URL,
    departements: [
      { code: "01", name: "Ain" },
      { code: "03", name: "Allier" },
      { code: "07", name: "Ardèche" },
      { code: "15", name: "Cantal" },
      { code: "26", name: "Drôme" },
      { code: "38", name: "Isère" },
      { code: "42", name: "Loire" },
      { code: "43", name: "Haute-Loire" },
      { code: "63", name: "Puy-de-Dôme" },
      { code: "69", name: "Rhône" },
      { code: "73", name: "Savoie" },
      { code: "74", name: "Haute-Savoie" },
    ],
  },
  {
    key: "bourgogne-franche-comte",
    label: "Bourgogne-Franche-Comté",
    url: PLACEHOLDER_RDV_URL,
    departements: [
      { code: "21", name: "Côte-d'Or" },
      { code: "25", name: "Doubs" },
      { code: "39", name: "Jura" },
      { code: "58", name: "Nièvre" },
      { code: "70", name: "Haute-Saône" },
      { code: "71", name: "Saône-et-Loire" },
      { code: "89", name: "Yonne" },
      { code: "90", name: "Territoire de Belfort" },
    ],
  },
  {
    key: "corse",
    label: "Corse",
    url: PLACEHOLDER_RDV_URL,
    departements: [
      { code: "2A", name: "Corse-du-Sud" },
      { code: "2B", name: "Haute-Corse" },
    ],
  },
  {
    key: "normandie",
    label: "Normandie",
    url: PLACEHOLDER_RDV_URL,
    departements: [
      { code: "14", name: "Calvados" },
      { code: "27", name: "Eure" },
      { code: "50", name: "Manche" },
      { code: "61", name: "Orne" },
      { code: "76", name: "Seine-Maritime" },
    ],
  },
];

export type OpenRdvRegion = RdvRegion & { url: string };

const isOpenRegion = (region: RdvRegion): region is OpenRdvRegion =>
  region.url !== undefined;

export const getOpenRdvRegions = (
  regions: RdvRegion[] = RDV_REGIONS
): OpenRdvRegion[] => regions.filter(isOpenRegion);

// Départements proposés à l'étape « Prendre rendez-vous » : uniquement ceux
// des régions ouvertes, triés par code (« 2A » et « 2B » se rangent après
// « 27 » et avant « 38 » avec un tri alphabétique, ce qui est l'ordre attendu).
export const getOpenDepartements = (
  regions: RdvRegion[] = RDV_REGIONS
): Departement[] =>
  getOpenRdvRegions(regions)
    .flatMap((region) => region.departements)
    .sort((a, b) => a.code.localeCompare(b.code));

export const getOpenRdvRegionByDepartement = (
  code: string,
  regions: RdvRegion[] = RDV_REGIONS
): OpenRdvRegion | undefined =>
  getOpenRdvRegions(regions).find((region) =>
    region.departements.some((departement) => departement.code === code)
  );

// Libellé « 01 - Ain » des options de la liste des départements.
export const formatDepartement = ({ code, name }: Departement) =>
  `${code} - ${name}`;

// Liste « A, B, C et D » pour le message des régions ouvertes.
export const formatRegionList = (regions: RdvRegion[]) => {
  const labels = regions.map((region) => region.label);
  if (labels.length <= 1) return labels.join("");
  return `${labels.slice(0, -1).join(", ")} et ${labels[labels.length - 1]}`;
};

export const MISSING_DEPARTEMENT_ERROR =
  "Sélectionnez un département pour continuer.";

export const RDV_REDIRECT_MESSAGE =
  "Vous allez être dirigé vers le site de prise de rendez-vous de votre région.";
