import type {
  ContextualMessageKey,
  ContractType,
  Period,
  SalaryField,
} from "./types";

/**
 * Marge de proximité au SMIC — point de réglage unique pour le métier.
 * Un salaire net inférieur ou égal à `SMIC net × (1 + marge)` déclenche le
 * message « salaire minimum » plutôt que le message « primes conventionnelles ».
 */
export const SMIC_PROXIMITY_MARGIN = 0.1;

/**
 * Suggestions portées par la règle `salarié . contrat . salaire brut` elle-même
 * (`suggestions: { "salaire médian": "2700 €/mois" }`).
 */
export const MEDIAN_SALARY_MONTHLY = 2700;

/** Noms de règles publicodes. Ce sont des chaînes non versionnées : cf. B-contrat. */
export const RULES = {
  coutTotalEmployeur: "salarié . coût total employeur",
  salaireBrut: "salarié . contrat . salaire brut",
  salaireNet: "salarié . rémunération . net . à payer avant impôt",
  salaireNetApresImpot: "salarié . rémunération . net . payé après impôt",
  tauxImposition: "impôt . taux d'imposition",
  smic: "salarié . temps de travail . SMIC",
  contrat: "salarié . contrat",
  dirigeant: "dirigeant",
  methodeImpot: "impôt . méthode de calcul",
} as const;

/** Ordre d'affichage des champs — c'est aussi l'ordre de la maquette. */
export const SALARY_FIELDS: readonly SalaryField[] = [
  "coutTotalEmployeur",
  "salaireBrut",
  "salaireNet",
  "salaireNetApresImpot",
];

type FieldDescriptor = {
  /** Nom de la règle publicodes à poser dans la situation pour inverser sur ce champ. */
  rule: string;
  label: string;
  hint: string;
  /** Nom d'event Matomo (snake_case). */
  eventName: string;
};

export const FIELD_DESCRIPTORS: Record<SalaryField, FieldDescriptor> = {
  coutTotalEmployeur: {
    rule: RULES.coutTotalEmployeur,
    label: "Coût total employeur",
    hint: "Dépensé par l'entreprise",
    eventName: "cout_total_employeur",
  },
  salaireBrut: {
    rule: RULES.salaireBrut,
    label: "Salaire brut",
    hint: "Brut de référence (sans les primes, indemnités ni majoration)",
    eventName: "salaire_brut",
  },
  salaireNet: {
    rule: RULES.salaireNet,
    label: "Salaire net",
    hint: "Salaire net avant impôt",
    eventName: "salaire_net",
  },
  salaireNetApresImpot: {
    rule: RULES.salaireNetApresImpot,
    label: "Salaire net après impôt",
    hint: "Le salaire net payé",
    eventName: "salaire_net_apres_impot",
  },
};

export const CONTRACT_OPTIONS: { value: ContractType; label: string }[] = [
  { value: "CDI", label: "CDI" },
  { value: "CDD", label: "CDD" },
  { value: "apprentissage", label: "Apprentissage" },
  { value: "professionnalisation", label: "Professionnalisation" },
  { value: "stage", label: "Stage" },
];

export const PERIOD_OPTIONS: { value: Period; label: string }[] = [
  { value: "mois", label: "Montant mensuel" },
  { value: "annee", label: "Montant annuel" },
];

/** Unité publicodes demandée en sortie pour une période d'affichage donnée. */
export const PERIOD_UNIT: Record<Period, "€/mois" | "€/an"> = {
  mois: "€/mois",
  annee: "€/an",
};

/** Suffixe visuel du champ. Purement décoratif : il est `aria-hidden`. */
export const PERIOD_SUFFIX: Record<Period, string> = {
  mois: "€ par mois",
  annee: "€ par an",
};

/** Version lisible de l'unité, intégrée au `hintText` donc au nom accessible. */
export const PERIOD_ACCESSIBLE_UNIT: Record<Period, string> = {
  mois: "en euros par mois",
  annee: "en euros par an",
};

type ContextualMessage = {
  label: string;
  linkText: string;
  href: string;
  /** Nom d'event Matomo (snake_case). */
  eventName: string;
};

/**
 * Wordings, `href` et noms Matomo des deux messages contextuels. Un seul endroit
 * à modifier quand le métier tranche les wordings.
 */
export const CONTEXTUAL_MESSAGES: Record<
  ContextualMessageKey,
  ContextualMessage
> = {
  "salaire-minimum": {
    label: "Vérifiez votre salaire minimum",
    linkText: "Vérifiez votre salaire minimum",
    href: "/contribution/quel-est-le-salaire-minimum",
    eventName: "salaire_minimum",
  },
  "primes-conventionnelles": {
    label: "Vérifiez vos primes",
    linkText: "Vérifiez les primes prévues par votre convention collective",
    href: "/contribution/quelles-sont-les-primes-prevues-par-la-convention-collective",
    eventName: "primes_conventionnelles",
  },
};

export type DeepDiveCard = {
  /** Slug utilisé comme nom d'event Matomo. */
  slug: string;
  title: string;
  description: string;
  linkText: string;
  href: string;
};

/**
 * La maquette place un visuel sur la première carte. L'illustration de
 * l'infographie est un fichier piloté par le CMS (`toUrl(svgFilename)`), sans
 * chemin déductible statiquement : on préfère trois cartes homogènes sans média
 * à une image cassée sur la page la plus consultée du site.
 */
export const DEEP_DIVE_CARDS: DeepDiveCard[] = [
  {
    slug: "infographie/quel-est-le-salaire-minimum",
    title: "Quel est le salaire minimum ?",
    description:
      "Salaire de base, avantages en nature, primes, pourboires : ce qui compte, et ce qui ne compte pas, dans le calcul du SMIC.",
    linkText: "Voir l'infographie",
    href: "/infographie/quel-est-le-salaire-minimum",
  },
  {
    slug: "contribution/quel-est-le-salaire-minimum",
    title: "Salaire minimum : quel montant ?",
    description:
      "Si l'employeur et le salarié s'accordent librement sur le montant du salaire, ce montant doit absolument respecter les montants minimums légaux et conventionnels.",
    linkText: "Voir la réponse personnalisée",
    href: "/contribution/quel-est-le-salaire-minimum",
  },
  {
    slug: "convention-collective",
    title: "Votre convention collective",
    description:
      "La convention collective et les accords d'entreprise viennent compléter le Code du travail et peuvent prévoir des montants plus favorables.",
    linkText: "Trouver sa convention collective et ses accords d'entreprise",
    href: "/convention-collective",
  },
];
