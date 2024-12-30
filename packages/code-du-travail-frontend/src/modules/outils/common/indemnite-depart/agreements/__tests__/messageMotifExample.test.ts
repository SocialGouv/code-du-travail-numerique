import { CatPro3239 } from "@socialgouv/modeles-social";
import { getMotifExampleMessage } from "../messages";

describe("getMessageMotifExample", () => {
  test.each`
    categoryPro3239                           | expected
    ${CatPro3239.assistantMaternel}           | ${"Les jours fériés à l’exception des jours fériés tombant sur une semaine non travaillée prévue au contrat de travail, les congés payés, le congé maternité, paternité, d’accueil de l’enfant et d’adoption, les congés pour évènements familiaux, le congé de présence parentale, l'arrêt de travail lié à un accident du travail ou une maladie professionnelle ou un accident de trajet, le congé lié à la formation professionnelle (CIF, projet de transition professionnelle), le congé pour la journée de la défense et de la citoyenneté, le congé pour assister à la cérémonie d’accueil dans la citoyenneté française, les absences pour la participation aux commissions paritaires de la branche, les absences pour la participation à la vie statutaire d’un syndicat ou à une formation syndicale sont déjà pris en compte dans l'ancienneté et ne sont pas des périodes à renseigner ci-après :"}
    ${CatPro3239.salarieParticulierEmployeur} | ${"Les jours fériés à l’exception des jours fériés tombant sur une semaine non travaillée prévue au contrat de travail, les congés payés, le congé maternité, paternité, d’accueil de l’enfant et d’adoption, les congés pour évènements familiaux, le congé de présence parentale, l'arrêt de travail lié à un accident du travail ou une maladie professionnelle ou un accident de trajet, le congé lié à la formation professionnelle (CIF, projet de transition professionnelle), le congé pour la journée de la défense et de la citoyenneté, le congé pour assister à la cérémonie d’accueil dans la citoyenneté française, les absences pour la participation aux commissions paritaires de la branche, les absences pour la participation à la vie statutaire d’un syndicat ou à une formation syndicale sont déjà pris en compte dans l'ancienneté et ne sont pas des périodes à renseigner ci-après :"}
    ${undefined}                              | ${"Les congés payés, le congé de maternité, paternité ou d'adoption, le congé de présence parentale, le congé parental d'éducation à temps partiel, l'arrêt de travail lié à un accident du travail ou une maladie professionnelle, le congé lié à la formation professionnelle (CIF, projet de transition professionnelle), le congé de solidarité internationale, le congé de solidarité familiale et le stage de fin d'étude de plus de 2 mois sont déjà pris en compte dans l'ancienneté et ne sont pas des périodes à renseigner ci-après :"}
  `(
    "getMessageMotifExample returns $expected when categoryPro3239 is $categoryPro3239",
    ({ categoryPro3239, expected }) => {
      expect(
        getMotifExampleMessage({
          "contrat salarié . convention collective . particuliers employeurs et emploi à domicile . indemnité de licenciement . catégorie professionnelle":
            categoryPro3239,
        })
      ).toBe(expected);
    }
  );

  test("getMessageMotifExample returns 'c' when informations is undefined", () => {
    expect(getMotifExampleMessage()).toBe(
      "Les congés payés, le congé de maternité, paternité ou d'adoption, le congé de présence parentale, le congé parental d'éducation à temps partiel, l'arrêt de travail lié à un accident du travail ou une maladie professionnelle, le congé lié à la formation professionnelle (CIF, projet de transition professionnelle), le congé de solidarité internationale, le congé de solidarité familiale et le stage de fin d'étude de plus de 2 mois sont déjà pris en compte dans l'ancienneté et ne sont pas des périodes à renseigner ci-après :"
    );
  });
});
