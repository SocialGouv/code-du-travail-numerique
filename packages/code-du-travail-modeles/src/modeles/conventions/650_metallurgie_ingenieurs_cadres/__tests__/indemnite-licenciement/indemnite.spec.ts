describe("Indemnité conventionnel de licenciement pour la CC 650", () => {
  describe("35 ans", () => {
    test.each`
      age   | seniority | salary  | expectedCompensation
      ${35} | ${0.91}   | ${2562} | ${0}
      ${35} | ${1}      | ${2562} | ${512.4}
      ${35} | ${7.91}   | ${2562} | ${4985.65}
      ${35} | ${8}      | ${2668} | ${5336}
      ${35} | ${19}     | ${2668} | ${22944.8}
    `(
      "ancienneté: $seniority an, salaire de référence: $salary => $expectedCompensation €",
      ({ seniority, salary, expectedCompensation, age }) => {
        const situation = engine.setSituation({
          "contrat salarié . convention collective": "'IDCC0650'",
          "contrat salarié . convention collective . métallurgie ingénieurs et cadres . indemnité de licenciement . age": age,
          "contrat salarié . indemnité de licenciement": "oui",
          "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année": seniority,
          "contrat salarié . indemnité de licenciement . salaire de référence conventionnel": salary,
        });

        const result = situation.evaluate(
          "contrat salarié . indemnité de licenciement . résultat conventionnel"
        );
        expect(result.missingVariables).toEqual({});
        expect(result.unit?.numerators).toEqual(["€"]);
        expect(result.nodeValue).toEqual(expectedCompensation);
      }
    );
  });

  describe("54 ans", () => {
    test.each`
      age   | seniority | salary  | expectedCompensation
      ${54} | ${0.91}   | ${2562} | ${0}
      ${54} | ${1}      | ${2562} | ${512.4}
      ${54} | ${5}      | ${2562} | ${7686}
      ${54} | ${7.91}   | ${2562} | ${7686}
      ${54} | ${8}      | ${2668} | ${8004}
      ${54} | ${19}     | ${2668} | ${27533.76}
    `(
      "ancienneté: $seniority an, salaire de référence: $salary => $expectedCompensation €",
      ({ seniority, salary, expectedCompensation, age }) => {
        const situation = engine.setSituation({
          "contrat salarié . convention collective": "'IDCC0650'",
          "contrat salarié . convention collective . métallurgie ingénieurs et cadres . indemnité de licenciement . age": age,
          "contrat salarié . convention collective . métallurgie ingénieurs et cadres . indemnité de licenciement . age 55 ans":
            "'Non'",
          "contrat salarié . indemnité de licenciement": "oui",
          "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année": seniority,
          "contrat salarié . indemnité de licenciement . salaire de référence conventionnel": salary,
        });

        const result = situation.evaluate(
          "contrat salarié . indemnité de licenciement . résultat conventionnel"
        );
        expect(result.missingVariables).toEqual({});
        expect(result.unit?.numerators).toEqual(["€"]);
        expect(result.nodeValue).toEqual(expectedCompensation);
      }
    );
  });

  describe("54 ans et oui", () => {
    test.each`
      age   | seniority | salary  | expectedCompensation
      ${54} | ${0.91}   | ${2562} | ${0}
      ${54} | ${1}      | ${2562} | ${512.4}
      ${54} | ${2}      | ${2562} | ${5124}
      ${54} | ${5}      | ${2562} | ${15372}
      ${54} | ${7.91}   | ${2562} | ${15372}
      ${54} | ${8}      | ${2668} | ${16008}
      ${54} | ${19}     | ${2668} | ${29828.24}
    `(
      "ancienneté: $seniority an, salaire de référence: $salary => $expectedCompensation €",
      ({ seniority, salary, expectedCompensation, age }) => {
        const situation = engine.setSituation({
          "contrat salarié . convention collective": "'IDCC0650'",
          "contrat salarié . convention collective . métallurgie ingénieurs et cadres . indemnité de licenciement . age": age,
          "contrat salarié . convention collective . métallurgie ingénieurs et cadres . indemnité de licenciement . age 55 ans":
            "'Oui'",
          "contrat salarié . indemnité de licenciement": "oui",
          "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année": seniority,
          "contrat salarié . indemnité de licenciement . salaire de référence conventionnel": salary,
        });

        const result = situation.evaluate(
          "contrat salarié . indemnité de licenciement . résultat conventionnel"
        );
        expect(result.missingVariables).toEqual({});
        expect(result.unit?.numerators).toEqual(["€"]);
        expect(result.nodeValue).toEqual(expectedCompensation);
      }
    );
  });

  describe("55 ans", () => {
    test.each`
      age   | seniority | salary  | expectedCompensation
      ${55} | ${0.91}   | ${2562} | ${0}
      ${55} | ${1}      | ${2562} | ${512.4}
      ${55} | ${2}      | ${2562} | ${5124}
      ${55} | ${5}      | ${2562} | ${15372}
      ${55} | ${7.91}   | ${2562} | ${15372}
      ${55} | ${8}      | ${2668} | ${16008}
      ${55} | ${19}     | ${2668} | ${29828.24}
    `(
      "ancienneté: $seniority an, salaire de référence: $salary => $expectedCompensation €",
      ({ seniority, salary, expectedCompensation, age }) => {
        const situation = engine.setSituation({
          "contrat salarié . convention collective": "'IDCC0650'",
          "contrat salarié . convention collective . métallurgie ingénieurs et cadres . indemnité de licenciement . age": age,
          "contrat salarié . indemnité de licenciement": "oui",
          "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année": seniority,
          "contrat salarié . indemnité de licenciement . salaire de référence conventionnel": salary,
        });

        const result = situation.evaluate(
          "contrat salarié . indemnité de licenciement . résultat conventionnel"
        );
        expect(result.missingVariables).toEqual({});
        expect(result.unit?.numerators).toEqual(["€"]);
        expect(result.nodeValue).toEqual(expectedCompensation);
      }
    );
  });

  describe("61 ans", () => {
    test.each`
      age   | seniority | salary  | expectedCompensation
      ${61} | ${0.91}   | ${2562} | ${0}
      ${61} | ${1}      | ${2562} | ${486.78}
      ${61} | ${2}      | ${2562} | ${973.56}
      ${61} | ${5}      | ${2562} | ${2433.9}
      ${61} | ${7.91}   | ${2562} | ${4736.37}
      ${61} | ${8}      | ${2668} | ${5069.2}
      ${61} | ${19}     | ${2668} | ${21797.56}
    `(
      "ancienneté: $seniority an, salaire de référence: $salary => $expectedCompensation €",
      ({ seniority, salary, expectedCompensation, age }) => {
        const situation = engine.setSituation({
          "contrat salarié . convention collective": "'IDCC0650'",
          "contrat salarié . convention collective . métallurgie ingénieurs et cadres . indemnité de licenciement . age": age,
          "contrat salarié . convention collective . métallurgie ingénieurs et cadres . indemnité de licenciement . age plus de 60 ans":
            "'Oui'",
          "contrat salarié . indemnité de licenciement": "oui",
          "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année": seniority,
          "contrat salarié . indemnité de licenciement . salaire de référence conventionnel": salary,
        });

        const result = situation.evaluate(
          "contrat salarié . indemnité de licenciement . résultat conventionnel"
        );
        expect(result.missingVariables).toEqual({});
        expect(result.unit?.numerators).toEqual(["€"]);
        expect(result.nodeValue).toEqual(expectedCompensation);
      }
    );
  });

  describe("62 ans", () => {
    test.each`
      age   | seniority | salary  | expectedCompensation
      ${62} | ${0.91}   | ${2562} | ${0}
      ${62} | ${1}      | ${2562} | ${461.16}
      ${62} | ${2}      | ${2562} | ${922.32}
      ${62} | ${5}      | ${2562} | ${2305.8}
      ${62} | ${7.91}   | ${2562} | ${4487.09}
      ${62} | ${8}      | ${2668} | ${4802.4}
      ${62} | ${19}     | ${2668} | ${20650.32}
    `(
      "ancienneté: $seniority an, salaire de référence: $salary => $expectedCompensation €",
      ({ seniority, salary, expectedCompensation, age }) => {
        const situation = engine.setSituation({
          "contrat salarié . convention collective": "'IDCC0650'",
          "contrat salarié . convention collective . métallurgie ingénieurs et cadres . indemnité de licenciement . age": age,
          "contrat salarié . convention collective . métallurgie ingénieurs et cadres . indemnité de licenciement . age plus de 60 ans":
            "'Oui'",
          "contrat salarié . indemnité de licenciement": "oui",
          "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année": seniority,
          "contrat salarié . indemnité de licenciement . salaire de référence conventionnel": salary,
        });

        const result = situation.evaluate(
          "contrat salarié . indemnité de licenciement . résultat conventionnel"
        );
        expect(result.missingVariables).toEqual({});
        expect(result.unit?.numerators).toEqual(["€"]);
        expect(result.nodeValue).toEqual(expectedCompensation);
      }
    );
  });

  describe("63 ans", () => {
    test.each`
      age   | seniority | salary  | expectedCompensation
      ${63} | ${0.91}   | ${2562} | ${0}
      ${63} | ${1}      | ${2562} | ${409.92}
      ${63} | ${2}      | ${2562} | ${819.84}
      ${63} | ${5}      | ${2562} | ${2049.6}
      ${63} | ${7.91}   | ${2562} | ${3988.52}
      ${63} | ${8}      | ${2668} | ${4268.8}
      ${63} | ${19}     | ${2668} | ${18355.84}
    `(
      "ancienneté: $seniority an, salaire de référence: $salary => $expectedCompensation €",
      ({ seniority, salary, expectedCompensation, age }) => {
        const situation = engine.setSituation({
          "contrat salarié . convention collective": "'IDCC0650'",
          "contrat salarié . convention collective . métallurgie ingénieurs et cadres . indemnité de licenciement . age": age,
          "contrat salarié . convention collective . métallurgie ingénieurs et cadres . indemnité de licenciement . age plus de 60 ans":
            "'Oui'",
          "contrat salarié . indemnité de licenciement": "oui",
          "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année": seniority,
          "contrat salarié . indemnité de licenciement . salaire de référence conventionnel": salary,
        });

        const result = situation.evaluate(
          "contrat salarié . indemnité de licenciement . résultat conventionnel"
        );
        expect(result.missingVariables).toEqual({});
        expect(result.unit?.numerators).toEqual(["€"]);
        expect(result.nodeValue).toEqual(expectedCompensation);
      }
    );
  });

  describe("64 ans", () => {
    test.each`
      age   | seniority | salary  | expectedCompensation
      ${64} | ${0.91}   | ${2562} | ${0}
      ${64} | ${1}      | ${2562} | ${307.44}
      ${64} | ${2}      | ${2562} | ${614.88}
      ${64} | ${5}      | ${2562} | ${1537.2}
      ${64} | ${7.91}   | ${2562} | ${2991.39}
      ${64} | ${8}      | ${2668} | ${3201.6}
      ${64} | ${19}     | ${2668} | ${13766.88}
    `(
      "ancienneté: $seniority an, salaire de référence: $salary => $expectedCompensation €",
      ({ seniority, salary, expectedCompensation, age }) => {
        const situation = engine.setSituation({
          "contrat salarié . convention collective": "'IDCC0650'",
          "contrat salarié . convention collective . métallurgie ingénieurs et cadres . indemnité de licenciement . age": age,
          "contrat salarié . convention collective . métallurgie ingénieurs et cadres . indemnité de licenciement . age plus de 60 ans":
            "'Oui'",
          "contrat salarié . indemnité de licenciement": "oui",
          "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année": seniority,
          "contrat salarié . indemnité de licenciement . salaire de référence conventionnel": salary,
        });

        const result = situation.evaluate(
          "contrat salarié . indemnité de licenciement . résultat conventionnel"
        );
        expect(result.missingVariables).toEqual({});
        expect(result.unit?.numerators).toEqual(["€"]);
        expect(result.nodeValue).toEqual(expectedCompensation);
      }
    );
  });
});
