import { PreavisLicenciementPublicodes } from "../../../../../publicodes";

const engine = new PreavisLicenciementPublicodes(
  modelsPreavisLicenciement,
  "1486"
);

describe("Vérification des arguments manquants pour la CC 1486", () => {
  test("Devrait demander la catégorie professionnelle", () => {
    const result = engine.calculate({
      "contrat salarié . convention collective": "'IDCC1486'",
      "contrat salarié . convention collective . ancienneté légal":
        "'Moins de 6 mois'",
      "contrat salarié . travailleur handicapé": "non",
    });
    expect(result).toNextMissingQuestionBeEqual(
      "Quelle est la catégorie professionnelle du salarié ?"
    );
  });

  test("Devrait demander l'ancienneté pour les chargés d'enquête intermittents", () => {
    const result = engine.calculate({
      "contrat salarié . convention collective": "'IDCC1486'",
      "contrat salarié . convention collective . ancienneté légal":
        "'Moins de 6 mois'",
      "contrat salarié . convention collective . bureaux études techniques . catégorie professionnelle":
        "'Chargés d'enquête intermittents'",
    });
    expect(result).toNextMissingQuestionBeEqual(
      "Quelle est l'ancienneté du salarié ?"
    );
  });

  test("Devrait demander le coefficient pour les ETAM", () => {
    const result = engine.calculate({
      "contrat salarié . convention collective": "'IDCC1486'",
      "contrat salarié . convention collective . ancienneté légal":
        "'Moins de 6 mois'",
      "contrat salarié . convention collective . bureaux études techniques . catégorie professionnelle":
        "'Employés, Techniciens ou Agents de maîtrise ETAM'",
    });
    expect(result).toNextMissingQuestionBeEqual(
      "Quel est le coefficient hiérarchique du salarié ?"
    );
  });

  test("Devrait demander l'ancienneté pour les ETAM avec un coefficient de 240 à 355", () => {
    const result = engine.calculate({
      "contrat salarié . convention collective": "'IDCC1486'",
      "contrat salarié . convention collective . ancienneté légal":
        "'Moins de 6 mois'",
      "contrat salarié . convention collective . bureaux études techniques . catégorie professionnelle":
        "'Employés, Techniciens ou Agents de maîtrise ETAM'",
      "contrat salarié . convention collective . bureaux études techniques . catégorie professionnelle Employés, Techniciens ou Agents de maîtrise ETAM . coefficient":
        "'de 240 à 355'",
    });
    expect(result).toNextMissingQuestionBeEqual(
      "Quelle est l'ancienneté du salarié ?"
    );
  });
});
