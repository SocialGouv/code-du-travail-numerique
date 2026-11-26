import { CatPro3239 } from "@socialgouv/modeles-social";
import { getMotifExampleMessage } from "../messages";

const defaultMessage =
  "<h5 class=\"fr-text--md fr-mb-0 fr-text--bold\">Ne pas déclarer les absences suivantes :</h5><ul><li>Congés payés</li><li>Congé de maternité, de paternité ou d'adoption</li><li>Arrêt de travail lié à un accident du travail ou maladie professionnelle</li><li>Congé parental d'éducation à temps partiel</li><li>Congé de présence parentale</li><li>Congé lié à la formation professionnelle (CIF, projet de transition professionnelle)</li><li>Congé de solidarité familiale</li><li>Stage de fin d'étude de plus de 2 mois</li><li>Congé de solidarité internationale</li></ul><b>Pour le calcul de l'indemnité, ces absences n'ont pas d'impact sur le calcul de l'ancienneté.</b>";

const cc3239Message =
  "<h5 class=\"fr-text--md fr-mb-0 fr-text--bold\">Ne pas déclarer les absences suivantes :</h5><ul><li>Les jours fériés à l'exception des jours fériés tombant sur une semaine non travaillée prévue au contrat de travail</li><li>les congés payés</li><li>le congé maternité, paternité, d'accueil de l'enfant et d'adoption</li><li>les congés pour évènements familiaux</li><li>le congé de présence parentale</li><li>l'arrêt de travail lié à un accident du travail ou une maladie professionnelle ou un accident de trajet</li><li>le congé lié à la formation professionnelle (CIF, projet de transition professionnelle)</li><li>le congé pour la journée de la défense et de la citoyenneté</li><li>le congé pour assister à la cérémonie d'accueil dans la citoyenneté française</li><li>les absences pour la participation aux commissions paritaires de la branche</li><li>les absences pour la participation à la vie statutaire d'un syndicat ou à une formation syndicale sont déjà pris en compte dans l'ancienneté et ne sont pas des périodes à renseigner ci-après :</li></ul><b>Pour le calcul de l'indemnité, ces absences n'ont pas d'impact sur le calcul de l'ancienneté.</b>";

const seniorityNotice =
  "<b>Pour le calcul de l'indemnité, ces absences n'ont pas d'impact sur le calcul de l'ancienneté.</b>";

describe("getMessageMotifExample", () => {
  test.each`
    categoryPro3239                           | expected
    ${CatPro3239.assistantMaternel}           | ${cc3239Message}
    ${CatPro3239.salarieParticulierEmployeur} | ${cc3239Message}
    ${undefined}                              | ${defaultMessage}
  `(
    "getMessageMotifExample returns expected message when categoryPro3239 is $categoryPro3239",
    ({ categoryPro3239, expected }) => {
      expect(
        getMotifExampleMessage({
          "contrat salarié . convention collective . particuliers employeurs et emploi à domicile . indemnité de licenciement . catégorie professionnelle":
            categoryPro3239,
        })
      ).toBe(expected);
    }
  );

  test("getMessageMotifExample with undefined informations", () => {
    expect(getMotifExampleMessage()).toBe(defaultMessage);
  });

  test("getMessageMotifExample ends with a generic seniority notice that does not name the simulator", () => {
    expect(getMotifExampleMessage().endsWith(seniorityNotice)).toBe(true);
    expect(getMotifExampleMessage()).not.toMatch(
      /licenciement,|rupture conventionnelle|retraite,/
    );
  });
});
