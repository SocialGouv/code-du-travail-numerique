describe("CC 1527", () => {
  describe("Calcul de l'indemnité de licenciement", () => {
    test.each`
      seniority      | salaireRef           | expectedCompensation
      ${7 / 12}      | ${1911.076923076923} | ${0}
      ${8 / 12}      | ${1911.076923076923} | ${318.51}
      ${11}          | ${1911.076923076923} | ${5414.72}
      ${12 - 1 / 12} | ${1911.076923076923} | ${5998.66}
      ${13 - 2 / 12} | ${1990}              | ${6854.44}
    `(
      "Avec une ancienneté $seniority ans, un salaire de référence $salaireRef € => une compensation de base de $expectedCompensation €",
      ({ salaireRef, expectedCompensation, seniority }) => {
        const result = engine
          .setSituation({
            "contrat salarié . convention collective": "'IDCC1527'",
            "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année": seniority,
            "contrat salarié . indemnité de licenciement . ancienneté requise en année": seniority,
            "contrat salarié . indemnité de licenciement . salaire de référence conventionnel": salaireRef,
          })
          .evaluate(
            "contrat salarié . indemnité de licenciement . résultat conventionnel"
          );
        expect(result.unit?.numerators).toEqual(["€"]);
        expect(result.missingVariables).toEqual({});
        expect(result.nodeValue).toEqual(expectedCompensation);
      }
    );
  });
});
