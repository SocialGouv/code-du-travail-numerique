import { roundToCents } from "./amount";
import { FIELD_DESCRIPTORS, PERIOD_UNIT, RULES } from "./constants";
import type {
  EvaluateInput,
  KnownUnit,
  ReadResult,
  SalaryResults,
  UrssafEvaluation,
  UrssafResponse,
  UrssafUnit,
} from "./types";

/**
 * Ordre des expressions demandées à l'API. La réponse arrive **dans cet ordre**
 * et ne porte aucun identifiant : la lecture se fait par index, cet ordre est
 * donc un contrat interne verrouillé par snapshot dans les tests.
 *
 * Les deux dernières expressions sont toujours demandées en €/mois, quelle que
 * soit la période affichée : ce sont elles qui servent au seuil de proximité au
 * SMIC, qui ne doit pas dépendre de la période.
 */
const EXPRESSION_ORDER = [
  "coutTotalEmployeur",
  "salaireBrut",
  "salaireNet",
  "salaireNetApresImpot",
  "tauxImposition",
  "smicNetMensuel",
  "salaireNetMensuel",
] as const;

type ExpressionKey = (typeof EXPRESSION_ORDER)[number];

const EMPTY_RESULTS: SalaryResults = {
  coutTotalEmployeur: null,
  salaireBrut: null,
  salaireNet: null,
  salaireNetApresImpot: null,
  tauxImposition: null,
  salaireNetMensuel: null,
  smicNetMensuel: null,
};

/**
 * Les énums publicodes se transmettent avec leurs quotes internes (`"'CDI'"`),
 * là où les nombres prennent la forme `{ valeur, unité }` et les booléens celle
 * d'un `"non"` nu. Ces trois syntaxes cohabitent : elles sont centralisées ici
 * pour qu'aucun appelant n'ait à s'en souvenir.
 */
const quoteEnum = (value: string): string => `'${value}'`;

export type UrssafPayload = {
  situation: Record<string, unknown>;
  expressions: unknown[];
};

/**
 * Construit le corps de `POST /api/v1/evaluate`.
 *
 * `dirigeant: "non"` et `impôt . méthode de calcul: "'taux neutre'"` sont
 * **toujours** présents : sans eux l'API répond 200, sans erreur, avec un impôt
 * à 0 — le « net après impôt » devient alors égal au « net avant impôt » et le
 * taux affiché vaut 0 %. C'est un piège silencieux, verrouillé par test.
 */
export const buildUrssafPayload = ({
  field,
  amountMonthly,
  period,
  contract,
}: EvaluateInput): UrssafPayload => {
  const displayUnit = PERIOD_UNIT[period];

  return {
    situation: {
      [FIELD_DESCRIPTORS[field].rule]: {
        valeur: amountMonthly,
        unité: "€/mois",
      },
      [RULES.contrat]: quoteEnum(contract),
      [RULES.dirigeant]: "non",
      [RULES.methodeImpot]: quoteEnum("taux neutre"),
    },
    expressions: [
      { valeur: RULES.coutTotalEmployeur, unité: displayUnit },
      { valeur: RULES.salaireBrut, unité: displayUnit },
      { valeur: RULES.salaireNet, unité: displayUnit },
      { valeur: RULES.salaireNetApresImpot, unité: displayUnit },
      RULES.tauxImposition,
      { valeur: RULES.smic, unité: "€/mois" },
      { valeur: RULES.salaireNet, unité: "€/mois" },
    ],
  };
};

/**
 * Normalise l'unité renvoyée par l'API.
 *
 * L'API sérialise les unités en `{ numerators, denominators }` — jamais en
 * chaîne. On lit ce qu'elle renvoie réellement plutôt que de supposer qu'elle a
 * honoré l'unité demandée : c'est le seul moyen de détecter un changement de
 * modèle côté URSSAF au lieu de convertir des montants faux en silence.
 */
export const readUnit = (
  unit: UrssafUnit | null | undefined
): KnownUnit | null => {
  const numerators = unit?.numerators ?? [];
  const denominators = unit?.denominators ?? [];

  if (
    numerators.length === 1 &&
    numerators[0] === "%" &&
    denominators.length === 0
  ) {
    return "%";
  }
  if (
    numerators.length === 1 &&
    numerators[0] === "€" &&
    denominators.length === 1
  ) {
    if (denominators[0] === "mois") return "€/mois";
    if (denominators[0] === "an") return "€/an";
  }
  return null;
};

const describeUnit = (unit: UrssafUnit | null | undefined): string => {
  const numerators = unit?.numerators ?? [];
  const denominators = unit?.denominators ?? [];
  return denominators.length
    ? `${numerators.join("·") || "?"}/${denominators.join("·")}`
    : numerators.join("·") || "(sans unité)";
};

/**
 * Extrait une entrée de la réponse.
 *
 * L'API répond **HTTP 200 même quand l'évaluation échoue** : l'erreur est dans
 * `evaluate[i].error.message`, pas dans le statut. `response.ok` ne suffit donc
 * pas, chaque entrée doit être validée séparément.
 *
 * On ne teste en revanche pas `missingVariables` : contrairement à ce que son
 * nom suggère, il est peuplé sur toute évaluation normale (avantages en nature,
 * convention collective… — les variables laissées à leur valeur par défaut). Le
 * traiter comme un signal d'échec invaliderait la totalité des résultats.
 */
const readEntry = (
  entry: UrssafEvaluation | undefined,
  key: ExpressionKey,
  expected: KnownUnit,
  issues: string[]
): number | null => {
  if (!entry) {
    issues.push(`URSSAF : expression « ${key} » absente de la réponse`);
    return null;
  }
  if (entry.error) {
    issues.push(
      `URSSAF : erreur d'évaluation sur « ${key} » — ${entry.error.message ?? "sans message"}`
    );
    return null;
  }
  if (
    typeof entry.nodeValue !== "number" ||
    !Number.isFinite(entry.nodeValue)
  ) {
    issues.push(
      `URSSAF : valeur non numérique sur « ${key} » (${JSON.stringify(entry.nodeValue)})`
    );
    return null;
  }

  const unit = readUnit(entry.unit);
  if (unit === null) {
    issues.push(
      `URSSAF : unité inconnue sur « ${key} » — ${describeUnit(entry.unit)}`
    );
    return null;
  }
  if (unit !== expected) {
    issues.push(
      `URSSAF : unité inattendue sur « ${key} » — ${unit} au lieu de ${expected}`
    );
    return null;
  }

  return roundToCents(entry.nodeValue);
};

/**
 * Lit une réponse de `POST /evaluate` en s'appuyant sur l'ordre des expressions.
 *
 * Reste pure : les anomalies de contrat sont accumulées dans `issues` et c'est
 * la couche API qui décide de les remonter à Sentry.
 */
export const readUrssafPayload = (
  response: UrssafResponse | null | undefined,
  period: EvaluateInput["period"]
): ReadResult => {
  const issues: string[] = [];
  const entries = response?.evaluate;

  if (!Array.isArray(entries)) {
    return {
      results: EMPTY_RESULTS,
      issues: ["URSSAF : réponse sans tableau `evaluate`"],
    };
  }

  const displayUnit = PERIOD_UNIT[period];
  const expectedUnits: Record<ExpressionKey, KnownUnit> = {
    coutTotalEmployeur: displayUnit,
    salaireBrut: displayUnit,
    salaireNet: displayUnit,
    salaireNetApresImpot: displayUnit,
    tauxImposition: "%",
    smicNetMensuel: "€/mois",
    salaireNetMensuel: "€/mois",
  };

  const read = (key: ExpressionKey) =>
    readEntry(
      entries[EXPRESSION_ORDER.indexOf(key)],
      key,
      expectedUnits[key],
      issues
    );

  return {
    results: {
      coutTotalEmployeur: read("coutTotalEmployeur"),
      salaireBrut: read("salaireBrut"),
      salaireNet: read("salaireNet"),
      salaireNetApresImpot: read("salaireNetApresImpot"),
      tauxImposition: read("tauxImposition"),
      smicNetMensuel: read("smicNetMensuel"),
      salaireNetMensuel: read("salaireNetMensuel"),
    },
    issues,
  };
};

/**
 * Le SMIC renvoyé par l'API est un brut mensuel. Cette expression sert au
 * préchargement serveur, qui n'a pas besoin des sept expressions du simulateur.
 */
export const buildSmicBrutPayload = (): UrssafPayload => ({
  situation: {
    [RULES.contrat]: quoteEnum("CDI"),
    [RULES.dirigeant]: "non",
    [RULES.methodeImpot]: quoteEnum("taux neutre"),
  },
  expressions: [{ valeur: RULES.smic, unité: "€/mois" }],
});

export { EXPRESSION_ORDER };
