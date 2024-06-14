import { IndemniteLicenciementPublicodes } from "../../../../../publicodes";

const engine = new IndemniteLicenciementPublicodes(
  modelsIndemniteLicenciement,
  "176"
);

describe("CC 176 - Affiche les questions", () => {
  it("doit demander l'age", () => {
    const result = engine.setSituation(
      {
        "contrat salarié . convention collective": "'IDCC0176'",
        "contrat salarié . indemnité de licenciement . date d'entrée":
          "01/07/2019",
      },
      "contrat salarié . indemnité de licenciement . résultat conventionnel"
    );
    expect(result.missingArgs).toHaveNextMissingRule(
      "contrat salarié . convention collective . industrie pharmaceutique . age"
    );
    expect(result.missingArgs).toHaveNextMissingQuestion(
      "Quel est l'âge du salarié à la date de notification de son licenciement&nbsp;?"
    );
  });
});
