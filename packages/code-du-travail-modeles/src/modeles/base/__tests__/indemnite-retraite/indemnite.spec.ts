import {
  IndemniteLicenciementPublicodes,
  IndemniteRetraitePublicodes,
} from "../../../../publicodes";
import type { SalaryPeriods } from "../../../common";

const MISE_A_LA_RETRAITE =
  "contrat salarié . indemnité de retraite . mise à la retraite";

const salaryPeriods = (value: number): SalaryPeriods[] =>
  Array.from({ length: 12 }, (_, index) => ({
    month: `${index}`,
    value,
  }));

const situation = ({
  dateEntree,
  dateSortie = "01/01/2024",
  dateNotification = "01/12/2023",
  miseALaRetraite,
  salaire = 2000,
}: {
  dateEntree: string;
  dateSortie?: string;
  dateNotification?: string;
  miseALaRetraite: "non" | "oui";
  salaire?: number;
}) => ({
  absencePeriods: "[]",
  [MISE_A_LA_RETRAITE]: miseALaRetraite,
  "contrat salarié . indemnité de licenciement . arrêt de travail": "non",
  "contrat salarié . indemnité de licenciement . date d'entrée": dateEntree,
  "contrat salarié . indemnité de licenciement . date de notification":
    dateNotification,
  "contrat salarié . indemnité de licenciement . date de sortie": dateSortie,
  "contrat salarié . indemnité de licenciement . inaptitude suite à un accident ou maladie professionnelle":
    "non",
  salaryPeriods: JSON.stringify(salaryPeriods(salaire)),
});

describe("Indemnité de départ volontaire à la retraite (article D1237-1)", () => {
  test.each`
    dateEntree      | anciennete  | expected
    ${"01/01/2014"} | ${"10 ans"} | ${1000}
    ${"01/01/2010"} | ${"14 ans"} | ${1000}
    ${"01/01/2009"} | ${"15 ans"} | ${2000}
    ${"01/01/2005"} | ${"19 ans"} | ${2000}
    ${"01/01/2004"} | ${"20 ans"} | ${3000}
    ${"01/01/1995"} | ${"29 ans"} | ${3000}
    ${"01/01/1994"} | ${"30 ans"} | ${4000}
    ${"01/01/1984"} | ${"40 ans"} | ${4000}
  `(
    "$anciennete d'ancienneté et un salaire de référence de 2000 € donnent $expected €",
    ({ dateEntree, expected }) => {
      const engine = new IndemniteRetraitePublicodes(modelsIndemniteRetraite);
      const result = engine.calculate(
        situation({ dateEntree, miseALaRetraite: "non" })
      );
      expect(result).toResultBeEqual(expected, "€");
    }
  );

  test.each`
    dateEntree      | anciennete
    ${"01/01/2023"} | ${"1 an"}
    ${"01/01/2019"} | ${"5 ans"}
    ${"01/01/2015"} | ${"9 ans"}
  `(
    "aucune indemnité n'est due avec $anciennete d'ancienneté",
    ({ dateEntree }) => {
      const engine = new IndemniteRetraitePublicodes(modelsIndemniteRetraite);
      const result = engine.calculate(
        situation({ dateEntree, miseALaRetraite: "non" })
      );
      expect(result.type).toBe("ineligibility");
      expect(result).toIneligibilityContain("inférieure à 10 ans");
    }
  );
});

describe("Indemnité de mise à la retraite (article L1237-7)", () => {
  test.each`
    dateEntree      | anciennete  | expected
    ${"01/04/2023"} | ${"9 mois"} | ${375}
    ${"01/01/2019"} | ${"5 ans"}  | ${2500}
    ${"01/01/2014"} | ${"10 ans"} | ${5000}
    ${"01/01/2012"} | ${"12 ans"} | ${6333.33}
  `(
    "$anciennete d'ancienneté et un salaire de référence de 2000 € donnent $expected €",
    ({ dateEntree, expected }) => {
      const engine = new IndemniteRetraitePublicodes(modelsIndemniteRetraite);
      const result = engine.calculate(
        situation({ dateEntree, miseALaRetraite: "oui" })
      );
      expect(result).toResultBeEqual(expected, "€");
    }
  );

  test.each`
    dateEntree      | anciennete
    ${"01/10/2023"} | ${"3 mois"}
    ${"01/05/2023"} | ${"7 mois"}
  `(
    "aucune indemnité n'est due avec $anciennete d'ancienneté",
    ({ dateEntree }) => {
      const engine = new IndemniteRetraitePublicodes(modelsIndemniteRetraite);
      const result = engine.calculate(
        situation({ dateEntree, miseALaRetraite: "oui" })
      );
      expect(result.type).toBe("ineligibility");
      expect(result).toIneligibilityContain("inférieure à 8 mois");
    }
  );

  // RG12 : la mise à la retraite doit donner strictement le même montant que
  // l'indemnité légale de licenciement pour une situation identique.
  test.each`
    dateEntree      | anciennete
    ${"01/04/2023"} | ${"9 mois"}
    ${"01/01/2019"} | ${"5 ans"}
    ${"01/01/2012"} | ${"12 ans"}
    ${"01/01/1994"} | ${"30 ans"}
  `(
    "donne le même montant que l'indemnité de licenciement avec $anciennete d'ancienneté",
    ({ dateEntree }) => {
      const retraite = new IndemniteRetraitePublicodes(modelsIndemniteRetraite);
      const licenciement = new IndemniteLicenciementPublicodes(
        modelsIndemniteLicenciement
      );
      const base = situation({ dateEntree, miseALaRetraite: "oui" });
      const baseLicenciement = { ...base };
      delete baseLicenciement[MISE_A_LA_RETRAITE];

      const resultRetraite = retraite.calculate(base);
      const resultLicenciement = licenciement.calculate({
        ...baseLicenciement,
        licenciementFauteGrave: "non",
        typeContratTravail: "cdi",
      });

      expect(resultRetraite.type).toBe("result");
      expect(resultLicenciement.type).toBe("result");
      expect((resultRetraite as any).result.value).toEqual(
        (resultLicenciement as any).result.value
      );
    }
  );
});

describe("Prise en compte des absences dans l'ancienneté", () => {
  // 10 ans et 1 mois d'ancienneté brute, moins 2 mois d'absence maladie non
  // professionnelle : on repasse sous le seuil des 10 ans du barème D1237-1.
  test("une absence non assimilée à du travail effectif fait basculer sous le seuil de 10 ans", () => {
    const engine = new IndemniteRetraitePublicodes(modelsIndemniteRetraite);
    const result = engine.calculate({
      ...situation({ dateEntree: "01/12/2013", miseALaRetraite: "non" }),
      absencePeriods: JSON.stringify([
        { durationInMonth: 2, motif: { key: "absenceMaladieNonPro" } },
      ]),
    });
    expect(result.type).toBe("ineligibility");
  });

  test("sans absence, la même situation ouvre droit à l'indemnité", () => {
    const engine = new IndemniteRetraitePublicodes(modelsIndemniteRetraite);
    const result = engine.calculate(
      situation({ dateEntree: "01/12/2013", miseALaRetraite: "non" })
    );
    expect(result).toResultBeEqual(1000, "€");
  });
});
