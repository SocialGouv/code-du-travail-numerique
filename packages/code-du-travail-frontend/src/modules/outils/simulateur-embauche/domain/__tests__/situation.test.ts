import { SALARY_FIELDS } from "../constants";
import {
  buildSmicBrutPayload,
  buildUrssafPayload,
  readUnit,
  readUrssafPayload,
} from "../situation";
import type { SalaryField, UrssafEvaluation } from "../types";

const euros = (denominator: "mois" | "an") => ({
  numerators: ["€"],
  denominators: [denominator],
});
const percent = { numerators: ["%"], denominators: [] };

/** Réponse nominale mesurée sur l'API pour 2 875 €/mois brut. */
const nominalResponse = (
  denominator: "mois" | "an" = "mois",
  overrides: Record<number, UrssafEvaluation> = {}
) => ({
  evaluate: [
    {
      nodeValue: denominator === "an" ? 45609.57 : 3800.7975,
      unit: euros(denominator),
    },
    {
      nodeValue: denominator === "an" ? 34500 : 2875,
      unit: euros(denominator),
    },
    {
      nodeValue: denominator === "an" ? 27046.8337 : 2253.9028125,
      unit: euros(denominator),
    },
    {
      nodeValue: denominator === "an" ? 25547.8338 : 2128.9861458,
      unit: euros(denominator),
    },
    { nodeValue: 5.3, unit: percent },
    { nodeValue: 1867.0166666, unit: euros("mois") },
    { nodeValue: 2253.9028125, unit: euros("mois") },
  ].map((entry, index) => overrides[index] ?? entry),
});

describe("buildUrssafPayload", () => {
  const base = {
    field: "salaireBrut" as SalaryField,
    amountMonthly: 2875,
    period: "mois" as const,
    contract: "CDI" as const,
  };

  it("pose toujours `dirigeant` et la méthode de calcul de l'impôt", () => {
    // Sans ces deux clés, l'API répond 200 sans erreur mais avec un impôt à 0 :
    // le « net après impôt » devient égal au « net avant impôt » et le taux
    // affiché vaut 0 %. Rien ne le signale — d'où ce test.
    for (const field of SALARY_FIELDS) {
      const { situation } = buildUrssafPayload({ ...base, field });
      expect(situation["dirigeant"]).toBe("non");
      expect(situation["impôt . méthode de calcul"]).toBe("'taux neutre'");
    }
  });

  it("quote les énums publicodes et laisse les nombres en { valeur, unité }", () => {
    const { situation } = buildUrssafPayload({
      ...base,
      contract: "apprentissage",
    });
    expect(situation["salarié . contrat"]).toBe("'apprentissage'");
    expect(situation["salarié . contrat . salaire brut"]).toEqual({
      valeur: 2875,
      unité: "€/mois",
    });
  });

  it.each([
    ["coutTotalEmployeur", "salarié . coût total employeur"],
    ["salaireBrut", "salarié . contrat . salaire brut"],
    ["salaireNet", "salarié . rémunération . net . à payer avant impôt"],
    ["salaireNetApresImpot", "salarié . rémunération . net . payé après impôt"],
  ] as [SalaryField, string][])(
    "sème la situation sur la règle de « %s »",
    (field, rule) => {
      const { situation } = buildUrssafPayload({ ...base, field });
      expect(situation[rule]).toEqual({ valeur: 2875, unité: "€/mois" });
    }
  );

  it("sème toujours en €/mois, même en période annuelle", () => {
    // Le seed est canoniquement mensuel : c'est l'unité *de sortie* qui change.
    const { situation } = buildUrssafPayload({ ...base, period: "annee" });
    expect(situation["salarié . contrat . salaire brut"]).toEqual({
      valeur: 2875,
      unité: "€/mois",
    });
  });

  it("fige l'ordre et les unités des expressions (lecture par index)", () => {
    expect(buildUrssafPayload(base).expressions).toMatchInlineSnapshot(`
[
  {
    "unité": "€/mois",
    "valeur": "salarié . coût total employeur",
  },
  {
    "unité": "€/mois",
    "valeur": "salarié . contrat . salaire brut",
  },
  {
    "unité": "€/mois",
    "valeur": "salarié . rémunération . net . à payer avant impôt",
  },
  {
    "unité": "€/mois",
    "valeur": "salarié . rémunération . net . payé après impôt",
  },
  "impôt . taux d'imposition",
  {
    "unité": "€/mois",
    "valeur": "salarié . temps de travail . SMIC",
  },
  {
    "unité": "€/mois",
    "valeur": "salarié . rémunération . net . à payer avant impôt",
  },
]
`);
  });

  it("demande les montants en €/an en période annuelle, SMIC et net canonique exceptés", () => {
    const { expressions } = buildUrssafPayload({ ...base, period: "annee" });
    expect(expressions.slice(0, 4)).toEqual([
      { valeur: "salarié . coût total employeur", unité: "€/an" },
      { valeur: "salarié . contrat . salaire brut", unité: "€/an" },
      {
        valeur: "salarié . rémunération . net . à payer avant impôt",
        unité: "€/an",
      },
      {
        valeur: "salarié . rémunération . net . payé après impôt",
        unité: "€/an",
      },
    ]);
    // Le seuil de proximité au SMIC ne doit pas dépendre de la période.
    expect(expressions[5]).toEqual({
      valeur: "salarié . temps de travail . SMIC",
      unité: "€/mois",
    });
    expect(expressions[6]).toEqual({
      valeur: "salarié . rémunération . net . à payer avant impôt",
      unité: "€/mois",
    });
  });
});

describe("buildSmicBrutPayload", () => {
  it("ne demande que le SMIC, avec la même situation verrouillée", () => {
    const { situation, expressions } = buildSmicBrutPayload();
    expect(situation["dirigeant"]).toBe("non");
    expect(situation["impôt . méthode de calcul"]).toBe("'taux neutre'");
    expect(expressions).toEqual([
      { valeur: "salarié . temps de travail . SMIC", unité: "€/mois" },
    ]);
  });
});

describe("readUnit", () => {
  it.each([
    [euros("mois"), "€/mois"],
    [euros("an"), "€/an"],
    [percent, "%"],
  ])("reconnaît %p", (unit, expected) => {
    expect(readUnit(unit)).toBe(expected);
  });

  it.each([
    [undefined],
    [null],
    [{ numerators: ["€"], denominators: ["heure"] }],
    [{ numerators: ["€", "$"], denominators: ["mois"] }],
    [{ numerators: [], denominators: [] }],
  ])("renvoie null sur %p", (unit) => {
    expect(readUnit(unit)).toBeNull();
  });
});

describe("readUrssafPayload", () => {
  it("lit la réponse nominale, arrondie au centime", () => {
    const { results, issues } = readUrssafPayload(nominalResponse(), "mois");
    expect(issues).toEqual([]);
    expect(results).toEqual({
      coutTotalEmployeur: 3800.8,
      salaireBrut: 2875,
      salaireNet: 2253.9,
      salaireNetApresImpot: 2128.99,
      tauxImposition: 5.3,
      smicNetMensuel: 1867.02,
      salaireNetMensuel: 2253.9,
    });
  });

  it("lit la réponse annuelle sans toucher au SMIC ni au net canonique", () => {
    const { results, issues } = readUrssafPayload(
      nominalResponse("an"),
      "annee"
    );
    expect(issues).toEqual([]);
    expect(results.coutTotalEmployeur).toBe(45609.57);
    expect(results.smicNetMensuel).toBe(1867.02);
    expect(results.salaireNetMensuel).toBe(2253.9);
  });

  it("neutralise l'entrée porteuse d'une erreur, et elle seule", () => {
    // L'API répond HTTP 200 même quand l'évaluation échoue : l'erreur est ici.
    const { results, issues } = readUrssafPayload(
      nominalResponse("mois", {
        0: {
          error: { message: 'La référence "salarié . nawak" est introuvable.' },
        },
      }),
      "mois"
    );
    expect(results.coutTotalEmployeur).toBeNull();
    expect(results.salaireBrut).toBe(2875);
    expect(issues).toHaveLength(1);
    expect(issues[0]).toContain("coutTotalEmployeur");
  });

  it("ne se laisse pas troubler par missingVariables", () => {
    // `missingVariables` est peuplé sur toute évaluation normale (variables
    // laissées à leur valeur par défaut). Le traiter comme un échec
    // invaliderait la totalité des résultats.
    const withMissing = {
      evaluate: nominalResponse().evaluate.map((entry) => ({
        ...entry,
        missingVariables: {
          "salarié . convention collective": 1,
          "salarié . rémunération . avantages en nature": 1,
        },
      })),
    };
    const { results, issues } = readUrssafPayload(withMissing, "mois");
    expect(issues).toEqual([]);
    expect(results.salaireNet).toBe(2253.9);
  });

  it("neutralise une entrée dont l'unité est inconnue et le signale", () => {
    const { results, issues } = readUrssafPayload(
      nominalResponse("mois", {
        2: {
          nodeValue: 2253.9,
          unit: { numerators: ["€"], denominators: ["semaine"] },
        },
      }),
      "mois"
    );
    expect(results.salaireNet).toBeNull();
    expect(issues[0]).toContain("unité inconnue");
  });

  it("neutralise une entrée dont l'unité n'est pas celle demandée", () => {
    // Un montant annuel lu comme mensuel afficherait un salaire douze fois trop
    // élevé sans le moindre signe d'erreur.
    const { results, issues } = readUrssafPayload(
      nominalResponse("mois", { 1: { nodeValue: 34500, unit: euros("an") } }),
      "mois"
    );
    expect(results.salaireBrut).toBeNull();
    expect(issues[0]).toContain("unité inattendue");
  });

  it.each([
    [{ nodeValue: null, unit: euros("mois") }, "valeur non numérique"],
    [{ nodeValue: "2875", unit: euros("mois") }, "valeur non numérique"],
  ])("neutralise une valeur non numérique (%p)", (entry, expectedIssue) => {
    const { results, issues } = readUrssafPayload(
      nominalResponse("mois", { 1: entry as UrssafEvaluation }),
      "mois"
    );
    expect(results.salaireBrut).toBeNull();
    expect(issues[0]).toContain(expectedIssue);
  });

  it("signale une expression absente sans planter", () => {
    const { results, issues } = readUrssafPayload({ evaluate: [] }, "mois");
    expect(results.salaireBrut).toBeNull();
    expect(issues).toHaveLength(7);
  });

  it.each([[null], [undefined], [{}], [{ evaluate: "nope" } as never]])(
    "renvoie des résultats vides sur une réponse malformée (%p)",
    (response) => {
      const { results, issues } = readUrssafPayload(response, "mois");
      expect(results.salaireBrut).toBeNull();
      expect(issues).toEqual(["URSSAF : réponse sans tableau `evaluate`"]);
    }
  );
});
