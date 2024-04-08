import { IndemniteLicenciementPublicodes } from "../../../../../publicodes";
import { CatPro3239 } from "../../salary";

const engine = new IndemniteLicenciementPublicodes(
  modelsIndemniteLicenciement,
  "3239"
);

describe("Test de la fonctionnalité 'calculate'", () => {
  test.each`
    category                                  | expectedCompensation | formula
    ${CatPro3239.salarieParticulierEmployeur} | ${1166.32}           | ${"1/4 * Sref * A"}
    ${CatPro3239.assistantMaternel}           | ${25}                | ${"1/80 * S"}
  `(
    `pas de missing var pour le conventionnel même si on ne fourni pas le salaire de ref et l'ancienneté requise pour $category`,
    ({ category, expectedCompensation, formula }) => {
      const result = engine.calculate({
        "contrat salarié . convention collective": "'IDCC3239'",
        "contrat salarié . convention collective . particuliers employeurs et emploi à domicile . indemnité de licenciement . catégorie professionnelle":
          category,
        "contrat salarié . convention collective . particuliers employeurs et emploi à domicile . indemnité de licenciement . catégorie professionnelle . assistante maternelle . type de licenciement": `'Non'`,
        "contrat salarié . convention collective . particuliers employeurs et emploi à domicile . indemnité de licenciement . catégorie professionnelle . assistante maternelle . type de licenciement . autres . total salaires":
          "2000",
        "contrat salarié . indemnité de licenciement . date d'entrée":
          "01/01/2022",
        "contrat salarié . indemnité de licenciement . date de notification":
          "01/05/2024",
        "contrat salarié . indemnité de licenciement . date de sortie":
          "01/05/2024",
        "contrat salarié . indemnité de licenciement . inaptitude suite à un accident ou maladie professionnelle":
          "non",
        "contrat salarié . indemnité de licenciement . salaire de référence conventionnel":
          "2000",
        licenciementFauteGrave: "non",
        typeContratTravail: "cdi",
      });
      expect(result.missingArgs).toEqual([]);
      expect(result.result?.value).toEqual(expectedCompensation);
      expect(result.formula?.formula).toEqual(formula);
      expect(result.detail?.chosenResult).toEqual("HAS_NO_LEGAL");
    }
  );
});
