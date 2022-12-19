describe("Indemnité conventionnel de licenciement pour la CC 1596", () => {
  describe("Cas standard", () => {
    test.each`
      age     | seniority  | salary  | expectedCompensation
      ${"54"} | ${23 / 12} | ${2000} | ${0}
      ${"56"} | ${23 / 12} | ${2000} | ${0}
      ${"54"} | ${2}       | ${2000} | ${400}
      ${"56"} | ${2}       | ${2000} | ${440}
      ${"54"} | ${5}       | ${2000} | ${1000}
      ${"56"} | ${5}       | ${2000} | ${1100}
      ${"54"} | ${6}       | ${2000} | ${1800}
      ${"56"} | ${6}       | ${2000} | ${1980}
      ${"54"} | ${1.5}     | ${2800} | ${0}
      ${"54"} | ${2}       | ${2800} | ${560}
      ${"54"} | ${4.91}    | ${2800} | ${1374.8}
      ${"54"} | ${5}       | ${2800} | ${1400}
      ${"54"} | ${6}       | ${2800} | ${2520}
      ${"54"} | ${15}      | ${2800} | ${6300}
      ${"54"} | ${20}      | ${2800} | ${9100}
      ${"56"} | ${1.5}     | ${2800} | ${0}
      ${"56"} | ${2}       | ${2800} | ${616}
      ${"56"} | ${4.91}    | ${2800} | ${1512.28}
      ${"56"} | ${5}       | ${2800} | ${1540}
      ${"56"} | ${6}       | ${2800} | ${2772}
      ${"56"} | ${15}      | ${2800} | ${6930}
      ${"56"} | ${20}      | ${2800} | ${10010}
    `(
      "ancienneté: $seniority an, salaire de référence: $salary, => $expectedCompensation €",
      ({ seniority, salary, expectedCompensation, age }) => {
        const result = engine
          .setSituation({
            "contrat salarié . convention collective": "'IDCC1596'",
            "contrat salarié . convention collective . batiment ouvriers employés . indemnité de licenciement . age": parseFloat(
              age
            ),
            "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année": seniority,
            "contrat salarié . indemnité de licenciement . salaire de référence conventionnel": salary,
          })
          .evaluate(
            "contrat salarié . indemnité de licenciement . résultat conventionnel"
          );
        expect(result.missingVariables).toEqual({});
        expect(result.unit?.numerators).toEqual(["€"]);
        expect(result.nodeValue).toEqual(expectedCompensation);
      }
    );
  });
  describe("Cas complexe", () => {
    test.each`
      seniority | salary  | expectedCompensation
      ${0}      | ${2000} | ${0}
      ${2}      | ${2000} | ${400}
      ${5}      | ${2000} | ${1000}
      ${6}      | ${2000} | ${1800}
    `(
      "ancienneté: $seniority an, salaire de référence: $salary, => $expectedCompensation €",
      ({ seniority, salary, expectedCompensation }) => {
        const result = engine
          .setSituation({
            "contrat salarié . convention collective": "'IDCC1596'",
            "contrat salarié . convention collective . batiment ouvriers employés . indemnité de licenciement . age":
              "54",
            "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année": seniority,
            "contrat salarié . indemnité de licenciement . salaire de référence conventionnel": salary,
          })
          .evaluate(
            "contrat salarié . indemnité de licenciement . résultat conventionnel"
          );
        expect(result.missingVariables).toEqual({});
        expect(result.unit?.numerators).toEqual(["€"]);
        expect(result.nodeValue).toEqual(expectedCompensation);
      }
    );
  });
});
