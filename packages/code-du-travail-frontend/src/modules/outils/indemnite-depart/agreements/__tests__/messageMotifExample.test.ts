import { CatPro3239 } from "@socialgouv/modeles-social";
import { getMotifExampleMessage } from "../messages";

const defaultLicenciementMessage =
  "<b>Ne pas déclarer les absences suivantes :</b><br/><ul><li>Congés payés</li><li>Congé de maternité, de paternité ou d'adoption</li><li>Arrêt de travail lié à un accident du travail ou maladie professionnelle</li><li>Congé parental d'éducation à temps partiel</li><li>Congé de présence parentale</li><li>Congé lié à la formation professionnelle (CIF, projet de transition professionnelle)</li><li>Congé de solidarité familiale</li><li>Stage de fin d'étude de plus de 2 mois</li><li>Congé de solidarité internationale</li></ul><b>Pour le calcul de l'indemnité de licenciement, ces absences n'ont pas d'impact sur le calcul de l'ancienneté.</b>";

const defaultRuptureMessage =
  "<b>Ne pas déclarer les absences suivantes :</b><br/><ul><li>Congés payés</li><li>Congé de maternité, de paternité ou d'adoption</li><li>Arrêt de travail lié à un accident du travail ou maladie professionnelle</li><li>Congé parental d'éducation à temps partiel</li><li>Congé de présence parentale</li><li>Congé lié à la formation professionnelle (CIF, projet de transition professionnelle)</li><li>Congé de solidarité familiale</li><li>Stage de fin d'étude de plus de 2 mois</li><li>Congé de solidarité internationale</li></ul><b>Pour le calcul de l'indemnité de rupture conventionnelle, ces absences n'ont pas d'impact sur le calcul de l'ancienneté.</b>";

const cc3239LicenciementMessage =
  "<b>Ne pas déclarer les absences suivantes :</b><br/><ul><li>Les jours fériés à l'exception des jours fériés tombant sur une semaine non travaillée prévue au contrat de travail</li><li>les congés payés</li><li>le congé maternité, paternité, d'accueil de l'enfant et d'adoption</li><li>les congés pour évènements familiaux</li><li>le congé de présence parentale</li><li>l'arrêt de travail lié à un accident du travail ou une maladie professionnelle ou un accident de trajet</li><li>le congé lié à la formation professionnelle (CIF, projet de transition professionnelle)</li><li>le congé pour la journée de la défense et de la citoyenneté</li><li>le congé pour assister à la cérémonie d'accueil dans la citoyenneté française</li><li>les absences pour la participation aux commissions paritaires de la branche</li><li>les absences pour la participation à la vie statutaire d'un syndicat ou à une formation syndicale sont déjà pris en compte dans l'ancienneté et ne sont pas des périodes à renseigner ci-après :</li></ul><b>Pour le calcul de l'indemnité de licenciement, ces absences n'ont pas d'impact sur le calcul de l'ancienneté.</b>";

const cc3239RuptureMessage =
  "<b>Ne pas déclarer les absences suivantes :</b><br/><ul><li>Les jours fériés à l'exception des jours fériés tombant sur une semaine non travaillée prévue au contrat de travail</li><li>les congés payés</li><li>le congé maternité, paternité, d'accueil de l'enfant et d'adoption</li><li>les congés pour évènements familiaux</li><li>le congé de présence parentale</li><li>l'arrêt de travail lié à un accident du travail ou une maladie professionnelle ou un accident de trajet</li><li>le congé lié à la formation professionnelle (CIF, projet de transition professionnelle)</li><li>le congé pour la journée de la défense et de la citoyenneté</li><li>le congé pour assister à la cérémonie d'accueil dans la citoyenneté française</li><li>les absences pour la participation aux commissions paritaires de la branche</li><li>les absences pour la participation à la vie statutaire d'un syndicat ou à une formation syndicale sont déjà pris en compte dans l'ancienneté et ne sont pas des périodes à renseigner ci-après :</li></ul><b>Pour le calcul de l'indemnité de rupture conventionnelle, ces absences n'ont pas d'impact sur le calcul de l'ancienneté.</b>";

describe("getMessageMotifExample", () => {
  test.each`
    categoryPro3239                           | isRuptureConventionnelle | expected
    ${CatPro3239.assistantMaternel}           | ${false}                 | ${cc3239LicenciementMessage}
    ${CatPro3239.salarieParticulierEmployeur} | ${false}                 | ${cc3239LicenciementMessage}
    ${undefined}                              | ${false}                 | ${defaultLicenciementMessage}
    ${CatPro3239.assistantMaternel}           | ${true}                  | ${cc3239RuptureMessage}
    ${CatPro3239.salarieParticulierEmployeur} | ${true}                  | ${cc3239RuptureMessage}
    ${undefined}                              | ${true}                  | ${defaultRuptureMessage}
  `(
    "getMessageMotifExample returns expected message when categoryPro3239 is $categoryPro3239 and isRuptureConventionnelle is $isRuptureConventionnelle",
    ({ categoryPro3239, isRuptureConventionnelle, expected }) => {
      expect(
        getMotifExampleMessage(
          {
            "contrat salarié . convention collective . particuliers employeurs et emploi à domicile . indemnité de licenciement . catégorie professionnelle":
              categoryPro3239,
          },
          isRuptureConventionnelle
        )
      ).toBe(expected);
    }
  );

  test("getMessageMotifExample with default parameters", () => {
    expect(getMotifExampleMessage()).toBe(defaultLicenciementMessage);
  });

  test("getMessageMotifExample with isRuptureConventionnelle=true and undefined informations", () => {
    expect(getMotifExampleMessage(undefined, true)).toBe(defaultRuptureMessage);
  });
});
