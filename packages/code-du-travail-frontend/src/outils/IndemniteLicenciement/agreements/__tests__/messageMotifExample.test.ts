import { CatPro3239 } from "@socialgouv/modeles-social";
import { getMessageMotifExample } from "../messageMotifExample";

describe("getMessageMotifExample", () => {
  test.each`
    categoryPro3239                                  | expected
    ${`'${CatPro3239.assistantMaternel}'`}           | ${"L'absence de l'enfant gardé, les congés payés, le congé de maternité, de paternité ou d'adoption, le congé de présence parentale, l'arrêt de travail lié à un accident du travail, ou une maladie professionnelle ou un accident de trajet, le congé lié à la formation professionnelle (CIF, projet de transition professionnelle), le congé de solidarité internationale, et le congé de solidarité familiale sont déjà pris en compte dans l'ancienneté et ne sont pas des périodes à renseigner ci-après :"}
    ${`'${CatPro3239.salarieParticulierEmployeur}'`} | ${"L'absence du particulier employeur, les congés payés, le congé de maternité, de paternité ou d'adoption, le congé de présence parentale, l'arrêt de travail lié à un accident du travail, ou une maladie professionnelle ou un accident de trajet, le congé lié à la formation professionnelle (CIF, projet de transition professionnelle), le congé de solidarité internationale, et le congé de solidarité familiale sont déjà pris en compte dans l'ancienneté et ne sont pas des périodes à renseigner ci-après :"}
    ${undefined}                                     | ${"Les congés payés, le congé de maternité ou d'adoption, le congé de présence parentale, l'arrêt de travail lié à un accident du travail ou une maladie professionnelle, le congé lié à la formation professionnelle (CIF, projet de transition professionnelle), le congé de solidarité internationale, le congé de solidarité familiale et le stage de fin d'étude de plus de 2 mois sont déjà pris en compte dans l'ancienneté et ne sont pas des périodes à renseigner ci-après :"}
  `(
    "getMessageMotifExample returns $expected when categoryPro3239 is $categoryPro3239",
    ({ categoryPro3239, expected }) => {
      expect(
        getMessageMotifExample({
          "contrat salarié . convention collective . particuliers employeurs et emploi à domicile . indemnité de licenciement . catégorie professionnelle": categoryPro3239,
        })
      ).toBe(expected);
    }
  );

  test("getMessageMotifExample returns 'c' when informations is undefined", () => {
    expect(getMessageMotifExample()).toBe(
      "Les congés payés, le congé de maternité ou d'adoption, le congé de présence parentale, l'arrêt de travail lié à un accident du travail ou une maladie professionnelle, le congé lié à la formation professionnelle (CIF, projet de transition professionnelle), le congé de solidarité internationale, le congé de solidarité familiale et le stage de fin d'étude de plus de 2 mois sont déjà pris en compte dans l'ancienneté et ne sont pas des périodes à renseigner ci-après :"
    );
  });
});
