describe("CC 1517", () => {
  describe("Calcul de l'indemnité de licenciement", () => {
    test.each`
      seniority | salaireRef | expectedCompensation
      ${0}      | ${3000}    | ${0}
      ${7 / 12} | ${3000}    | ${0}
      ${8 / 12} | ${3000}    | ${500}
      ${2}      | ${3000}    | ${1500}
      ${12}     | ${3000}    | ${9500}
      ${42}     | ${3000}    | ${39500}
    `(
      "Avec une ancienneté $seniority ans, un salaire de référence $salaireRef € => une compensation de base de $expectedCompensation €",
      ({ salaireRef, expectedCompensation, seniority }) => {
        const result = engine
          .setSituation({
            "contrat salarié . convention collective": "'IDCC1517'",
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
