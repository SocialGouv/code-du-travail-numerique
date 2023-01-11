describe("Missing variables pour l'indemnité conventionnel de licenciement pour la CC 2098", () => {
  test("Licenciement pour inaptitude", () => {
    const result = engine
      .setSituation({
        "contrat salarié . convention collective": "'IDCC2098'",
        "contrat salarié . indemnité de licenciement": "oui",
        "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année": 38,
        "contrat salarié . indemnité de licenciement . ancienneté requise en année": 38,
        "contrat salarié . indemnité de licenciement . salaire de référence conventionnel": 2800,
      })
      .evaluate(
        "contrat salarié . indemnité de licenciement . résultat conventionnel"
      );

    const keys = Object.keys(result.missingVariables);
    expect(keys).toEqual([
      "contrat salarié . convention collective . personnel presta service tertiaire . inaptitude suite à un accident non professionnelle",
    ]);
  });

  test("Catégorie professionnelle", () => {
    const result = engine
      .setSituation({
        "contrat salarié . convention collective": "'IDCC2098'",
        "contrat salarié . indemnité de licenciement": "oui",
        "contrat salarié . convention collective . personnel presta service tertiaire . inaptitude suite à un accident non professionnelle":
          "'Non'",
        "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année": 38,
        "contrat salarié . indemnité de licenciement . ancienneté requise en année": 38,
        "contrat salarié . indemnité de licenciement . salaire de référence conventionnel": 2800,
      })
      .evaluate(
        "contrat salarié . indemnité de licenciement . résultat conventionnel"
      );

    const keys = Object.keys(result.missingVariables);
    expect(keys).toEqual([
      "contrat salarié . convention collective . personnel presta service tertiaire . autre licenciement . catégorie professionnelle",
    ]);
  });

  test("Age", () => {
    const result = engine
      .setSituation({
        "contrat salarié . convention collective": "'IDCC2098'",
        "contrat salarié . indemnité de licenciement": "oui",
        "contrat salarié . convention collective . personnel presta service tertiaire . inaptitude suite à un accident non professionnelle":
          "'Non'",
        "contrat salarié . convention collective . personnel presta service tertiaire . autre licenciement . catégorie professionnelle":
          "'Cadres'",
        "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année": 38,
        "contrat salarié . indemnité de licenciement . ancienneté requise en année": 38,
        "contrat salarié . indemnité de licenciement . salaire de référence conventionnel": 2800,
      })
      .evaluate(
        "contrat salarié . indemnité de licenciement . résultat conventionnel"
      );

    const keys = Object.keys(result.missingVariables);
    expect(keys).toEqual([
      "contrat salarié . convention collective . personnel presta service tertiaire . autre licenciement . cadres . age",
    ]);
  });
});
