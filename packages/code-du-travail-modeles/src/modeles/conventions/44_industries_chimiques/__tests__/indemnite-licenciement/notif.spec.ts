import { IndemniteLicenciementPublicodes } from "../../../../../publicodes";
import { CategoryPro44 } from "../../salary";

const engine = new IndemniteLicenciementPublicodes(
  modelsIndemniteLicenciement,
  "44"
);

const notification =
  "Le montant de l'indemnité pourrait être plus important si, avant le CDI, sous certaines conditions, le salarié a été lié à l’employeur par d'autres contrats.";

describe("Affiche la notification dans tous les cas", () => {
  test.each`
    category                     | age   | seniorityRight | seniority | salary
    ${CategoryPro44.ouvrier}     | ${50} | ${2}           | ${2}      | ${2719}
    ${CategoryPro44.ouvrier}     | ${50} | ${2}           | ${5}      | ${2719}
    ${CategoryPro44.ouvrier}     | ${55} | ${2}           | ${2}      | ${2719}
    ${CategoryPro44.ouvrier}     | ${55} | ${2}           | ${5}      | ${2719}
    ${CategoryPro44.ouvrier}     | ${57} | ${2}           | ${2}      | ${2719}
    ${CategoryPro44.ouvrier}     | ${57} | ${2}           | ${5}      | ${2719}
    ${CategoryPro44.techniciens} | ${50} | ${2}           | ${2}      | ${2719}
    ${CategoryPro44.techniciens} | ${50} | ${2}           | ${5}      | ${2719}
    ${CategoryPro44.techniciens} | ${55} | ${2}           | ${2}      | ${2719}
    ${CategoryPro44.techniciens} | ${55} | ${2}           | ${5}      | ${2719}
    ${CategoryPro44.techniciens} | ${57} | ${2}           | ${2}      | ${2719}
    ${CategoryPro44.techniciens} | ${57} | ${2}           | ${5}      | ${2719}
    ${CategoryPro44.inge}        | ${50} | ${2}           | ${2}      | ${2719}
    ${CategoryPro44.inge}        | ${50} | ${2}           | ${5}      | ${2719}
    ${CategoryPro44.inge}        | ${55} | ${2}           | ${2}      | ${2719}
    ${CategoryPro44.inge}        | ${55} | ${2}           | ${5}      | ${2719}
    ${CategoryPro44.inge}        | ${57} | ${2}           | ${2}      | ${2719}
    ${CategoryPro44.inge}        | ${57} | ${2}           | ${5}      | ${2719}
  `(
    "Avec $seniority ans (droit: $seniorityRight ans), catégorie $category, age $age, et sref : $salary => $expectedCompensation €",
    ({ category, age, seniority, seniorityRight, salary }) => {
      engine.setSituation(
        {
          "contrat salarié . convention collective": "'IDCC0044'",
          "contrat salarié . convention collective . industries chimiques . indemnité de licenciement . catégorie professionnelle": `'${category}'`,
          "contrat salarié . convention collective . industries chimiques . indemnité de licenciement . catégorie professionnelle . age":
            age,
          "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année":
            seniority,
          "contrat salarié . indemnité de licenciement . ancienneté conventionnelle requise en année":
            seniorityRight,
          "contrat salarié . indemnité de licenciement . salaire de référence conventionnel":
            salary,
        },
        "contrat salarié . indemnité de licenciement . résultat conventionnel"
      );
      const notifications = engine.getNotifications();
      expect(notifications).toHaveLength(1);
      expect(notifications[0].description).toContain(notification);
    }
  );
});
