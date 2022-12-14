import Engine from "publicodes";

import { mergeIndemniteLicenciementModels } from "../../../../../internal/merger";
import {
  getNotifications,
  getNotificationsBloquantes,
} from "../../../../common";
import { CatPro3239 } from "../../salary";

const engine = global.__engine__;

const notification =
  "Si la rupture du contrat de travail a été notifiée avant le 01/01/2022, l’indemnité de licenciement peut ne pas correspondre au résultat donné. En effet, jusqu’au 31/12/2021 c’est la convention collective “Assistants maternels du particulier employeur (IDCC 2395)” qui s’appliquait. Celle-ci a fusionné avec la convention collective “Salariés du particulier employeur (IDCC 2111)” pour former la convention collective “Particuliers employeurs et emploi à domicile (IDCC 3239)” applicable depuis le 01/01/2022.";

const blockingNotification =
  "L’indemnité de licenciement n’est pas due en cas de suspension, modification ou retrait de l'agrément de l'assistant maternel.";

describe("Notification bloquante et non bloquante pour la CC 3239", () => {
  describe("Cas standard pour les salariés du particulier employeur", () => {
    test.each`
      category                                  | seniority | salary
      ${CatPro3239.salarieParticulierEmployeur} | ${0}      | ${2000}
      ${CatPro3239.salarieParticulierEmployeur} | ${8 / 12} | ${2000}
      ${CatPro3239.salarieParticulierEmployeur} | ${2}      | ${2000}
      ${CatPro3239.salarieParticulierEmployeur} | ${10}     | ${2000}
      ${CatPro3239.salarieParticulierEmployeur} | ${12}     | ${2000}
    `(
      "ancienneté: $seniority an, salaire de référence: $salary, catégorie $category => $expectedCompensation €",
      ({ seniority, salary, category }) => {
        const situation = engine.setSituation({
          "contrat salarié . convention collective": "'IDCC3239'",
          "contrat salarié . convention collective . particuliers employeurs et emploi à domicile . indemnité de licenciement . catégorie professionnelle": `'${category}'`,
          "contrat salarié . convention collective . particuliers employeurs et emploi à domicile . indemnité de licenciement . catégorie professionnelle . assistante maternelle . type de licenciement": `'Non'`,
          "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année": seniority,
          "contrat salarié . indemnité de licenciement . salaire de référence conventionnel": salary,
        });

        const notificationsBloquantes = getNotificationsBloquantes(situation);
        expect(notificationsBloquantes).toHaveLength(0);

        const notifications = getNotifications(situation);
        expect(notifications).toHaveLength(0);
      }
    );

    describe("Cas standard pour les assistantes maternelles", () => {
      test.each`
        category                        | seniority | salary
        ${CatPro3239.assistantMaternel} | ${0}      | ${2000}
        ${CatPro3239.assistantMaternel} | ${8 / 12} | ${2000}
        ${CatPro3239.assistantMaternel} | ${9 / 12} | ${2000}
        ${CatPro3239.assistantMaternel} | ${2}      | ${2000}
        ${CatPro3239.assistantMaternel} | ${10}     | ${2000}
        ${CatPro3239.assistantMaternel} | ${12}     | ${2000}
      `(
        "ancienneté: $seniority an, salaire de référence: $salary, catégorie $category => $expectedCompensation €",
        ({ seniority, salary, category }) => {
          const situation = engine.setSituation({
            "contrat salarié . convention collective": "'IDCC3239'",
            "contrat salarié . convention collective . particuliers employeurs et emploi à domicile . indemnité de licenciement . catégorie professionnelle": `'${category}'`,
            "contrat salarié . convention collective . particuliers employeurs et emploi à domicile . indemnité de licenciement . catégorie professionnelle . assistante maternelle . type de licenciement": `'Non'`,
            "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année": seniority,
            "contrat salarié . indemnité de licenciement . date de notification":
              "01/12/2021",
            "contrat salarié . indemnité de licenciement . salaire de référence conventionnel": salary,
          });

          const notificationsBloquantes = getNotificationsBloquantes(situation);
          expect(notificationsBloquantes).toHaveLength(0);

          const notifications = getNotifications(situation);
          expect(notifications).toHaveLength(1);
          expect(notifications[0].description).toBe(notification);
        }
      );

      describe("Assistante maternelle qui a sélectionné comme motif un retrait d'agrément", () => {
        test.each`
          seniority | salary
          ${0}      | ${2000}
          ${8 / 12} | ${2000}
          ${9 / 12} | ${2000}
          ${2}      | ${2000}
          ${10}     | ${2000}
          ${12}     | ${2000}
        `(
          "ancienneté: $seniority an, salaire de référence: $salary, => $expectedCompensation €",
          ({ seniority, salary }) => {
            const situation = engine.setSituation({
              "contrat salarié . convention collective": "'IDCC3239'",
              "contrat salarié . convention collective . particuliers employeurs et emploi à domicile . indemnité de licenciement . catégorie professionnelle": `'${CatPro3239.assistantMaternel}'`,
              "contrat salarié . convention collective . particuliers employeurs et emploi à domicile . indemnité de licenciement . catégorie professionnelle . assistante maternelle . type de licenciement": `'Oui'`,
              "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année": seniority,
              "contrat salarié . indemnité de licenciement . date de notification":
                "01/12/2021",
              "contrat salarié . indemnité de licenciement . salaire de référence conventionnel": salary,
            });

            const notificationsBloquantes = getNotificationsBloquantes(
              situation
            );
            expect(notificationsBloquantes).toHaveLength(1);
            expect(notificationsBloquantes[0].description).toBe(
              blockingNotification
            );

            const notifications = getNotifications(situation);
            expect(notifications).toHaveLength(1);
            expect(notifications[0].description).toBe(notification);
          }
        );
      });

      describe("Assistante maternelle qui a sélectionné une date de notification > 01/12/2022", () => {
        test.each`
          seniority | salary
          ${0}      | ${2000}
          ${8 / 12} | ${2000}
          ${9 / 12} | ${2000}
          ${2}      | ${2000}
          ${10}     | ${2000}
          ${12}     | ${2000}
        `(
          "ancienneté: $seniority an, salaire de référence: $salary, => $expectedCompensation €",
          ({ seniority, salary }) => {
            const situation = engine.setSituation({
              "contrat salarié . convention collective": "'IDCC3239'",
              "contrat salarié . convention collective . particuliers employeurs et emploi à domicile . indemnité de licenciement . catégorie professionnelle": `'${CatPro3239.assistantMaternel}'`,
              "contrat salarié . convention collective . particuliers employeurs et emploi à domicile . indemnité de licenciement . catégorie professionnelle . assistante maternelle . type de licenciement": `'Oui'`,
              "contrat salarié . indemnité de licenciement": "oui",
              "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année": seniority,
              "contrat salarié . indemnité de licenciement . date de notification":
                "01/12/2022",
              "contrat salarié . indemnité de licenciement . salaire de référence conventionnel": salary,
            });

            const notificationsBloquantes = getNotificationsBloquantes(
              situation
            );
            expect(notificationsBloquantes).toHaveLength(1);
            expect(notificationsBloquantes[0].description).toBe(
              blockingNotification
            );

            const notifications = getNotifications(situation);
            expect(notifications).toHaveLength(0);
          }
        );
      });
    });
  });
});
