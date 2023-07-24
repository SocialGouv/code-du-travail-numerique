import type { MissingArgs } from "../../../../../publicodes";
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
    expect(getFirstMissing(result.missingArgs)).toEqual(
      "contrat salarié . convention collective . industrie pharmaceutique . age"
    );
  });
});

const getFirstMissing = (missingVariables: MissingArgs[]): string | null => {
  const missingVars = missingVariables
    .filter((arg) => arg.rawNode.cdtn !== undefined)
    .sort((a, b) => b.indice - a.indice);
  if (missingVars.length === 0) {
    return null;
  }
  return replaceAll(missingVars[0].name, " - ", " . ");
};

const replaceAll = (string: string, search: string, replace: string) => {
  return string.split(search).join(replace);
};
