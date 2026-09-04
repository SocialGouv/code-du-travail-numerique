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
 * Les deux branches de calcul du salaire de référence, pour cette grille.
 *
 * L'art. D1237-2 renvoie au salaire de référence de l'indemnité de licenciement
 * et retient, des deux moyennes, « celle qui est la plus avantageuse pour le
 * salarié ». Ici la moyenne sur 12 mois l'emporte sur celle des 3 derniers mois,
 * parce que l'implémentation partagée avec l'indemnité de licenciement inclut la
 * prime annuelle dans le total des 12 mois.
 *
 * Le document de référence métier annonce 2594 €, c'est-à-dire la branche des
 * 3 mois — la moins avantageuse. L'écart est assumé plutôt que corrigé : le
 * document prescrit lui-même « SRef = IDL », et toucher au
 * `ReferenceSalaryLegal` partagé changerait les montants du simulateur
 * d'indemnité de licenciement pour tous les usagers.
 *
 * Reste à faire trancher par le métier — cf. issue #7131.
 */
const SREF_DOCUMENT_METIER = 2594;
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
    // La règle du « plus avantageux » (art. D1237-2) est ce qui écarte le
    // modèle de la valeur du document métier : on l'énonce ici, pour qu'une
    // bascule sur la branche des 3 mois fasse échouer le test.
    expect(computeSref(SALAIRES_VARIABLES)).toBeGreaterThan(
      SREF_DOCUMENT_METIER
    );

    const result = calculate({
      anciennete: 22,
      miseALaRetraite: false,
      sref: SREF_SALAIRES_VARIABLES,
    });

    // 1,5 mois de salaire de référence entre 20 et 30 ans d'ancienneté.
    // Le document métier annonce 3891 €, soit 1,5 × 2594 €.
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

    // Le document métier annonce 811,25 €, soit 0,25 × 1,25 × 2594 €.
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
