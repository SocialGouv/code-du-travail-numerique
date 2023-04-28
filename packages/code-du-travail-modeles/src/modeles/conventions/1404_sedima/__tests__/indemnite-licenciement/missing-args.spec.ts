import type { MissingArgs } from "../../../../../publicodes";
import { IndemniteLicenciementPublicodes } from "../../../../../publicodes";

const engine = new IndemniteLicenciementPublicodes(
  modelsIndemniteLicenciement,
  "1404"
);

describe("CC 1404 - Affiche les questions", () => {
  it("doit demander le cdi d'opération", () => {
    const result = engine.setSituation(
      {
        "contrat salarié . convention collective": "'IDCC1404'",
      },
      "contrat salarié . indemnité de licenciement . résultat conventionnel"
    );
    expect(getFirstMissing(result.missingArgs)).toEqual(
      "contrat salarié . convention collective . sedima . question cdi opération"
    );
  });

  it("doit demander l'impossibilité de mission", () => {
    const result = engine.setSituation(
      {
        "contrat salarié . convention collective": "'IDCC1404'",
        "contrat salarié . convention collective . sedima . question cdi opération":
          "'Oui'",
      },
      "contrat salarié . indemnité de licenciement . résultat conventionnel"
    );
    expect(getFirstMissing(result.missingArgs)).toEqual(
      "contrat salarié . convention collective . sedima . cdi opération . question mission impossible"
    );
  });

  it("doit demander le salaire total", () => {
    const result = engine.setSituation(
      {
        "contrat salarié . convention collective": "'IDCC1404'",
        "contrat salarié . convention collective . sedima . cdi opération . question mission impossible":
          "'Oui'",
        "contrat salarié . convention collective . sedima . question cdi opération":
          "'Oui'",
      },
      "contrat salarié . indemnité de licenciement . résultat conventionnel"
    );
    expect(getFirstMissing(result.missingArgs)).toEqual(
      "contrat salarié . convention collective . sedima . cdi opération . mission impossible . salaires total"
    );
  });

  it("doit demander la durée dans l'entreprise", () => {
    const result = engine.setSituation(
      {
        "contrat salarié . convention collective": "'IDCC1404'",
        "contrat salarié . convention collective . sedima . cdi opération . question mission impossible":
          "'Non'",
        "contrat salarié . convention collective . sedima . question cdi opération":
          "'Oui'",
      },
      "contrat salarié . indemnité de licenciement . résultat conventionnel"
    );
    expect(getFirstMissing(result.missingArgs)).toEqual(
      "contrat salarié . convention collective . sedima . cdi opération . mission possible . durée"
    );
  });

  it("doit demander le salaire de la 1ère année", () => {
    const result = engine.setSituation(
      {
        "contrat salarié . convention collective": "'IDCC1404'",
        "contrat salarié . convention collective . sedima . cdi opération . mission possible . durée":
          "6",
        "contrat salarié . convention collective . sedima . cdi opération . question mission impossible":
          "'Non'",
        "contrat salarié . convention collective . sedima . question cdi opération":
          "'Oui'",
      },
      "contrat salarié . indemnité de licenciement . résultat conventionnel"
    );
    expect(getFirstMissing(result.missingArgs)).toEqual(
      "contrat salarié . convention collective . sedima . cdi opération . mission possible . salaires 1e année"
    );
  });

  it("doit demander le salaire de la 2ème année", () => {
    const result = engine.setSituation(
      {
        "contrat salarié . convention collective": "'IDCC1404'",
        "contrat salarié . convention collective . sedima . cdi opération . mission possible . durée":
          "18",
        "contrat salarié . convention collective . sedima . cdi opération . mission possible . salaires 1e année":
          "3000",
        "contrat salarié . convention collective . sedima . cdi opération . question mission impossible":
          "'Non'",
        "contrat salarié . convention collective . sedima . question cdi opération":
          "'Oui'",
      },
      "contrat salarié . indemnité de licenciement . résultat conventionnel"
    );
    expect(getFirstMissing(result.missingArgs)).toEqual(
      "contrat salarié . convention collective . sedima . cdi opération . mission possible . salaires 2e année"
    );
  });

  it("doit demander le salaire de la 3ème année et plus", () => {
    const result = engine.setSituation(
      {
        "contrat salarié . convention collective": "'IDCC1404'",
        "contrat salarié . convention collective . sedima . cdi opération . mission possible . durée":
          "30",
        "contrat salarié . convention collective . sedima . cdi opération . mission possible . salaires 1e année":
          "3000",
        "contrat salarié . convention collective . sedima . cdi opération . mission possible . salaires 2e année":
          "3000",
        "contrat salarié . convention collective . sedima . cdi opération . question mission impossible":
          "'Non'",
        "contrat salarié . convention collective . sedima . question cdi opération":
          "'Oui'",
      },
      "contrat salarié . indemnité de licenciement . résultat conventionnel"
    );
    expect(getFirstMissing(result.missingArgs)).toEqual(
      "contrat salarié . convention collective . sedima . cdi opération . mission possible . salaires 3e année et plus"
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
