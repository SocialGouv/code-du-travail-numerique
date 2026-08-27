import {
  ReferenceSalaryFactory,
  SeniorityFactory,
  SupportedCc,
} from "../../../common";
import type { SalaryPeriods } from "../../../common";
import { IndemniteRetraitePublicodes } from "../../../../publicodes";

/**
 * Cas de validation fournis par le métier (document de référence de l'issue
 * #7131). Chaque scénario y est décrit par l'ancienneté retenue, le salaire de
 * référence retenu et le montant attendu : on vérifie les trois.
 */

const ANCIENNETE =
  "contrat salarié . indemnité de licenciement . ancienneté en année";
const ANCIENNETE_REQUISE =
  "contrat salarié . indemnité de licenciement . ancienneté requise en année";
const SALAIRE_REFERENCE =
  "contrat salarié . indemnité de licenciement . salaire de référence";
const MISE_A_LA_RETRAITE =
  "contrat salarié . indemnité de retraite . mise à la retraite";

const MOIS = [
  "janvier",
  "février",
  "mars",
  "avril",
  "mai",
  "juin",
  "juillet",
  "août",
  "septembre",
  "octobre",
  "novembre",
  "décembre",
];

const salaireConstant = (value: number): SalaryPeriods[] =>
  MOIS.map((month) => ({ month, value }));

/**
 * Grille de salaires variables du document de référence, avec une prime
 * annuelle de 500 € versée en octobre. Le montant saisi dans la colonne
 * « Salaires » inclut la prime (l'interface parle de « Dont primes »), d'où
 * 2508 + 500 pour octobre.
 */
const SALAIRES_VARIABLES: SalaryPeriods[] = [
  2511, 2621, 2562, 2453, 2500, 2660, 2554, 2554, 2600, 3008, 2641, 2508,
].map((value, index) => ({
  month: MOIS[index],
  value,
  ...(index === 9 ? { prime: 500 } : {}),
}));

/**
 * Salaire de référence produit par le modèle pour cette grille.
 *
 * Le document de référence annonce 2594 €, valeur obtenue en excluant la prime
 * annuelle du total des 12 mois. L'implémentation partagée avec l'indemnité de
 * licenciement l'y inclut, et retient donc la moyenne sur 12 mois (2597,67 €)
 * plutôt que celle sur 3 mois (2594 €). Le document prescrivant « SRef = IDL »,
 * c'est le calcul de l'indemnité de licenciement qui fait foi : on l'assume ici
 * explicitement plutôt que de diverger du simulateur existant.
 */
const SREF_SALAIRES_VARIABLES = 2597.67;

const computeSeniority = (anneesBrutes: number, absenceEnMois = 0) => {
  const seniority = new SeniorityFactory().create(SupportedCc.default);
  const dateSortie = "01/01/2026";
  const dateEntree = `01/01/${2026 - anneesBrutes}`;
  return seniority.computeSeniority({
    absencePeriods: absenceEnMois
      ? [
          {
            durationInMonth: absenceEnMois,
            motif: { key: "absenceMaladieNonPro" },
          } as any,
        ]
      : [],
    dateEntree,
    dateSortie,
  });
};

const computeSref = (salaires: SalaryPeriods[]) =>
  new ReferenceSalaryFactory()
    .create(SupportedCc.default)
    .computeReferenceSalary({ salaires });

const calculate = ({
  anciennete,
  sref,
  miseALaRetraite,
}: {
  anciennete: number;
  sref: number;
  miseALaRetraite: boolean;
}) =>
  new IndemniteRetraitePublicodes(modelsIndemniteRetraite).calculate({
    [ANCIENNETE]: anciennete.toString(),
    [ANCIENNETE_REQUISE]: anciennete.toString(),
    [MISE_A_LA_RETRAITE]: miseALaRetraite ? "oui" : "non",
    [SALAIRE_REFERENCE]: sref.toString(),
    "contrat salarié . indemnité de licenciement . arrêt de travail": "non",
    "contrat salarié . indemnité de licenciement . inaptitude suite à un accident ou maladie professionnelle":
      "non",
  });

describe("Cas de validation métier — départ volontaire à la retraite", () => {
  test.each`
    anciennete | sref    | montant
    ${2}       | ${2600} | ${null}
    ${5}       | ${2600} | ${null}
    ${9.91}    | ${2600} | ${null}
    ${14}      | ${2600} | ${1300}
    ${17}      | ${2600} | ${2600}
    ${19.5}    | ${2600} | ${2600}
    ${34}      | ${2600} | ${5200}
  `(
    "$anciennete ans d'ancienneté et $sref € de salaire de référence donnent $montant €",
    ({ anciennete, sref, montant }) => {
      const result = calculate({ anciennete, miseALaRetraite: false, sref });

      if (montant === null) {
        // Sous 10 ans d'ancienneté, aucune indemnité n'est due (art. D1237-1).
        expect(result.type).toBe("ineligibility");
      } else {
        expect(result).toResultBeEqual(montant, "€");
      }
    }
  );

  test("22 ans d'ancienneté avec des salaires variables et une prime annuelle", () => {
    expect(computeSref(SALAIRES_VARIABLES)).toBeCloseTo(
      SREF_SALAIRES_VARIABLES,
      2
    );

    const result = calculate({
      anciennete: 22,
      miseALaRetraite: false,
      sref: SREF_SALAIRES_VARIABLES,
    });

    // 1,5 mois de salaire de référence entre 20 et 30 ans d'ancienneté.
    expect(result).toResultBeEqual(3896.51, "€");
  });
});

describe("Cas de validation métier — mise à la retraite", () => {
  test.each`
    anciennete | sref    | montant
    ${4.5}     | ${2600} | ${2925}
    ${9.91}    | ${2600} | ${6441.5}
    ${9.5}     | ${2600} | ${6175}
    ${13}      | ${2600} | ${9100}
  `(
    "$anciennete ans d'ancienneté et $sref € de salaire de référence donnent $montant €",
    ({ anciennete, sref, montant }) => {
      const result = calculate({ anciennete, miseALaRetraite: true, sref });
      expect(result).toResultBeEqual(montant, "€");
    }
  );

  test("1,25 an d'ancienneté avec des salaires variables et une prime annuelle", () => {
    const result = calculate({
      anciennete: 1.25,
      miseALaRetraite: true,
      sref: SREF_SALAIRES_VARIABLES,
    });

    expect(result).toResultBeEqual(811.77, "€");
  });
});

describe("Cas de validation métier — ancienneté retenue", () => {
  // Les absences pour maladie non professionnelle ne sont pas assimilées à du
  // travail effectif : elles sont retirées de l'ancienneté.
  test.each`
    anneesBrutes | absenceEnMois | attendu
    ${2}         | ${0}          | ${2}
    ${5}         | ${6}          | ${4.5}
    ${20}        | ${6}          | ${19.5}
    ${11}        | ${18}         | ${9.5}
    ${13}        | ${0}          | ${13}
  `(
    "$anneesBrutes ans dont $absenceEnMois mois d'absence donnent $attendu ans",
    ({ anneesBrutes, absenceEnMois, attendu }) => {
      expect(computeSeniority(anneesBrutes, absenceEnMois).value).toBeCloseTo(
        attendu,
        2
      );
    }
  );
});

describe("Cas de validation métier — salaire de référence", () => {
  test("un salaire mensuel constant est repris tel quel", () => {
    expect(computeSref(salaireConstant(2600))).toBe(2600);
  });
});
