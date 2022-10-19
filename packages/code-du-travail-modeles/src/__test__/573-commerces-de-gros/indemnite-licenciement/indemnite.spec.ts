import Engine from "publicodes";

import { mergeIndemniteLicenciementModels } from "../../../internal/merger";
import { LicenciementEconomique } from "../../../plugins";
import { CatPro573 } from "../../../plugins/formule/573_commerces_de_gros";

const engine = new Engine(mergeIndemniteLicenciementModels());

describe("Indemnité conventionnel de licenciement pour la CC 573", () => {
  describe("Cas standard", () => {
    test.each`
      age   | category            | typeLicenciement              | seniority | salary  | expectedCompensation
      ${32} | ${CatPro573.autres} | ${LicenciementEconomique.non} | ${0.91}   | ${2500} | ${0}
      ${32} | ${CatPro573.autres} | ${LicenciementEconomique.non} | ${1}      | ${2500} | ${500}
      ${32} | ${CatPro573.autres} | ${LicenciementEconomique.non} | ${15}     | ${2500} | ${9166.67}
      ${32} | ${CatPro573.agents} | ${LicenciementEconomique.non} | ${0.5}    | ${2700} | ${0}
      ${32} | ${CatPro573.agents} | ${LicenciementEconomique.non} | ${1}      | ${2700} | ${540}
      ${32} | ${CatPro573.agents} | ${LicenciementEconomique.non} | ${15}     | ${2700} | ${9900}
      ${40} | ${CatPro573.agents} | ${LicenciementEconomique.oui} | ${1}      | ${2700} | ${540}
      ${40} | ${CatPro573.agents} | ${LicenciementEconomique.oui} | ${14}     | ${2700} | ${9000}
      ${57} | ${CatPro573.agents} | ${LicenciementEconomique.oui} | ${14}     | ${2700} | ${9000}
      ${55} | ${CatPro573.agents} | ${LicenciementEconomique.oui} | ${15}     | ${2700} | ${11664}
      ${56} | ${CatPro573.agents} | ${LicenciementEconomique.oui} | ${25}     | ${2700} | ${16200}
      ${32} | ${CatPro573.cadres} | ${LicenciementEconomique.non} | ${4}      | ${3200} | ${2560}
      ${32} | ${CatPro573.cadres} | ${LicenciementEconomique.non} | ${5}      | ${3200} | ${3200}
      ${40} | ${CatPro573.cadres} | ${LicenciementEconomique.non} | ${6}      | ${3200} | ${5760}
      ${40} | ${CatPro573.cadres} | ${LicenciementEconomique.non} | ${10}     | ${3200} | ${9920}
      ${40} | ${CatPro573.cadres} | ${LicenciementEconomique.non} | ${23}     | ${3200} | ${27840}
      ${52} | ${CatPro573.cadres} | ${LicenciementEconomique.non} | ${6}      | ${3200} | ${5760}
      ${52} | ${CatPro573.cadres} | ${LicenciementEconomique.non} | ${10}     | ${3200} | ${9920}
      ${52} | ${CatPro573.cadres} | ${LicenciementEconomique.non} | ${23}     | ${3200} | ${32016}
      ${57} | ${CatPro573.cadres} | ${LicenciementEconomique.non} | ${6}      | ${3200} | ${5760}
      ${57} | ${CatPro573.cadres} | ${LicenciementEconomique.non} | ${10}     | ${3200} | ${9920}
      ${57} | ${CatPro573.cadres} | ${LicenciementEconomique.non} | ${23}     | ${3200} | ${33408}
    `(
      "ancienneté: $seniority an, salaire de référence: $salary, age $age, type de licenciement $typeLicenciement, catégorie $category => $expectedCompensation €",
      ({
        seniority,
        salary,
        expectedCompensation,
        category,
        typeLicenciement,
        age,
      }) => {
        const result = engine
          .setSituation({
            "contrat salarié . convention collective": "'IDCC0573'",
            "contrat salarié . convention collective . commerces de gros . age":
              age,
            "contrat salarié . convention collective . commerces de gros . catégorie professionnelle": `'${category}'`,
            "contrat salarié . convention collective . commerces de gros . licenciement économique": `'${typeLicenciement}'`,
            "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année":
              seniority,
            "contrat salarié . indemnité de licenciement . salaire de référence conventionnel":
              salary,
          })
          .evaluate(
            "contrat salarié . indemnité de licenciement . résultat conventionnel"
          );

        expect(result.nodeValue).toEqual(expectedCompensation);
        expect(result.missingVariables).toEqual({});
        expect(result.unit?.numerators).toEqual(["€"]);
      }
    );
  });
});
