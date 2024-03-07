import { QuestionOuiNon } from "../../../../common";
import { CatPro573 } from "../../salary";
import { RuptureConventionnellePublicodes } from "../../../../../publicodes";

const engine = new RuptureConventionnellePublicodes(
  modelsRuptureConventionnel,
  "573"
);

describe("Gestion des multiples types de licenciement pour la CC 573", () => {
  describe("Catégorie pro : Agents", () => {
    test("Missing variables", () => {
      const input = {
        "contrat salarié . convention collective": "'IDCC0573'",
        "contrat salarié . convention collective . commerces de gros . catégorie professionnelle": `'${CatPro573.agents}'`,
        "contrat salarié . indemnité de licenciement . inaptitude suite à un accident ou maladie professionnelle":
          "non",
      };

      const result = engine.setSituation(
        input,
        "contrat salarié . indemnité de licenciement . résultat conventionnel"
      );
      const missingArgs = result.missingArgs.filter(
        (item) => item.rawNode.cdtn
      );
      expect(missingArgs).toHaveLength(1);
      expect(missingArgs[0].name).toBe(
        "contrat salarié - convention collective - commerces de gros - catégorie professionnelle - agents - licenciement économique - age"
      );
    });
  });
  describe("Agents", () => {
    test.each`
      age   | typeLicenciement      | seniorityRight | seniority | salary  | expectedCompensation
      ${32} | ${QuestionOuiNon.non} | ${0.5}         | ${0.5}    | ${2700} | ${0}
      ${32} | ${QuestionOuiNon.non} | ${0.99}        | ${0.99}   | ${2700} | ${0}
      ${32} | ${QuestionOuiNon.non} | ${0.99}        | ${1}      | ${2700} | ${0}
      ${32} | ${QuestionOuiNon.non} | ${1}           | ${1}      | ${2700} | ${540}
      ${32} | ${QuestionOuiNon.non} | ${1}           | ${15}     | ${2700} | ${9900}
      ${40} | ${QuestionOuiNon.oui} | ${1}           | ${1}      | ${2700} | ${540}
      ${40} | ${QuestionOuiNon.oui} | ${1}           | ${14}     | ${2700} | ${9000}
      ${57} | ${QuestionOuiNon.oui} | ${1}           | ${14}     | ${2700} | ${9000}
      ${55} | ${QuestionOuiNon.oui} | ${1}           | ${15}     | ${2700} | ${11664}
      ${56} | ${QuestionOuiNon.oui} | ${2}           | ${25}     | ${2700} | ${16200}
    `(
      "ancienneté: $seniority an, salaire de référence: $salary, catégorie Agents, age $age, typeLicenciement $typeLicenciement => $expectedCompensation €",
      ({
        seniority,
        seniorityRight,
        salary,
        typeLicenciement,
        expectedCompensation,
        age,
      }) => {
        const { result, missingArgs } = engine.setSituation(
          {
            "contrat salarié . convention collective": "'IDCC0573'",
            "contrat salarié . convention collective . commerces de gros . catégorie professionnelle": `'${CatPro573.agents}'`,
            "contrat salarié . convention collective . commerces de gros . catégorie professionnelle . agents . licenciement économique . age":
              age,
            "contrat salarié . convention collective . commerces de gros . catégorie professionnelle . agents . licenciement économique question": `'${typeLicenciement}'`,
            "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année":
              seniority,
            "contrat salarié . indemnité de licenciement . ancienneté conventionnelle requise en année":
              seniorityRight,
            "contrat salarié . indemnité de licenciement . inaptitude suite à un accident ou maladie professionnelle":
              "non",
            "contrat salarié . indemnité de licenciement . salaire de référence conventionnel":
              salary,
          },
          "contrat salarié . indemnité de licenciement . résultat conventionnel"
        );

        expect(result.value).toEqual(expectedCompensation);
        expect(missingArgs).toEqual([]);
        expect(result.unit?.numerators).toEqual(["€"]);
      }
    );
    test("Si l'inaptitude suite à un accident ou maladie professionnelle' alors pas de question pour motif eco", () => {
      const { result, missingArgs } = engine.setSituation(
        {
          "contrat salarié . convention collective": "'IDCC0573'",
          "contrat salarié . convention collective . commerces de gros . catégorie professionnelle": `'${CatPro573.agents}'`,
          "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année":
            "14",
          "contrat salarié . indemnité de licenciement . ancienneté conventionnelle requise en année":
            "14",
          "contrat salarié . indemnité de licenciement . inaptitude suite à un accident ou maladie professionnelle":
            "oui",
          "contrat salarié . indemnité de licenciement . salaire de référence conventionnel":
            "2700",
        },
        "contrat salarié . indemnité de licenciement . résultat conventionnel"
      );

      expect(result.value).toEqual(9000);
      expect(missingArgs).toEqual([]);
      expect(result.unit?.numerators).toEqual(["€"]);
    });
  });
});
