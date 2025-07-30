import type { MissingArgs } from "../../../../../publicodes";
import { HeuresRechercheEmploiPublicodes } from "../../../../../publicodes";

const engine = new HeuresRechercheEmploiPublicodes(
  modelsHeuresRechercheEmploi,
  "3239"
);

describe("CC 3239 - Affiche les questions", () => {
  it("doit demander le type de rupture", () => {
    const result = engine.setSituation(
      {
        "contrat salarié . convention collective": "'IDCC3239'",
      },
      "contrat salarié . convention collective . résultat conventionnel"
    );
    expect(getFirstMissing(result.missingArgs)).toEqual(
      "contrat salarié . convention collective . particuliers employeurs et emploi à domicile . typeRupture"
    );
  });

  it("doit demander la catégorie professionnelle", () => {
    const result = engine.setSituation(
      {
        "contrat salarié . convention collective": "'IDCC3239'",
        "contrat salarié . convention collective . particuliers employeurs et emploi à domicile . typeRupture":
          "'Licenciement'",
      },
      "contrat salarié . convention collective . résultat conventionnel"
    );
    expect(getFirstMissing(result.missingArgs)).toEqual(
      "contrat salarié . convention collective . particuliers employeurs et emploi à domicile . typeRupture Licenciement . catégorie professionnelle"
    );
  });

  it("ne doit plus demander de questions pour les assistants maternels", () => {
    const result = engine.setSituation(
      {
        "contrat salarié . convention collective": "'IDCC3239'",
        "contrat salarié . convention collective . particuliers employeurs et emploi à domicile . typeRupture":
          "'Licenciement'",
        "contrat salarié . convention collective . particuliers employeurs et emploi à domicile . typeRupture Licenciement . catégorie professionnelle":
          "'Assistants maternels du particulier employeur'",
      },
      "contrat salarié . convention collective . résultat conventionnel"
    );
    expect(getFirstMissing(result.missingArgs)).toEqual(null);
  });

  it("doit demander la durée du travail pour les salariés du particulier employeur", () => {
    const result = engine.setSituation(
      {
        "contrat salarié . convention collective": "'IDCC3239'",
        "contrat salarié . convention collective . particuliers employeurs et emploi à domicile . typeRupture":
          "'Licenciement'",
        "contrat salarié . convention collective . particuliers employeurs et emploi à domicile . typeRupture Licenciement . catégorie professionnelle":
          "'Salariés du particulier employeur'",
      },
      "contrat salarié . convention collective . résultat conventionnel"
    );
    expect(getFirstMissing(result.missingArgs)).toEqual(
      "contrat salarié . convention collective . particuliers employeurs et emploi à domicile . typeRupture Licenciement . catégorie professionnelle Salariés du particulier employeur . durée du travail"
    );
  });

  it("doit demander l'ancienneté pour moins de 40 heures par semaine", () => {
    const result = engine.setSituation(
      {
        "contrat salarié . convention collective": "'IDCC3239'",
        "contrat salarié . convention collective . particuliers employeurs et emploi à domicile . typeRupture":
          "'Licenciement'",
        "contrat salarié . convention collective . particuliers employeurs et emploi à domicile . typeRupture Licenciement . catégorie professionnelle":
          "'Salariés du particulier employeur'",
        "contrat salarié . convention collective . particuliers employeurs et emploi à domicile . typeRupture Licenciement . catégorie professionnelle Salariés du particulier employeur . durée du travail":
          "'Moins de 40 heures par semaine'",
      },
      "contrat salarié . convention collective . résultat conventionnel"
    );
    expect(getFirstMissing(result.missingArgs)).toEqual(
      "contrat salarié . convention collective . particuliers employeurs et emploi à domicile . typeRupture Licenciement . catégorie professionnelle Salariés du particulier employeur . durée du travail Moins de 40 heures par semaine . ancienneté"
    );
  });

  it("ne doit plus demander de questions pour moins de 40h et moins de 2 ans", () => {
    const result = engine.setSituation(
      {
        "contrat salarié . convention collective": "'IDCC3239'",
        "contrat salarié . convention collective . particuliers employeurs et emploi à domicile . typeRupture":
          "'Licenciement'",
        "contrat salarié . convention collective . particuliers employeurs et emploi à domicile . typeRupture Licenciement . catégorie professionnelle":
          "'Salariés du particulier employeur'",
        "contrat salarié . convention collective . particuliers employeurs et emploi à domicile . typeRupture Licenciement . catégorie professionnelle Salariés du particulier employeur . durée du travail":
          "'Moins de 40 heures par semaine'",
        "contrat salarié . convention collective . particuliers employeurs et emploi à domicile . typeRupture Licenciement . catégorie professionnelle Salariés du particulier employeur . durée du travail Moins de 40 heures par semaine . ancienneté":
          "'Moins de 2 ans'",
      },
      "contrat salarié . convention collective . résultat conventionnel"
    );
    expect(getFirstMissing(result.missingArgs)).toEqual(null);
  });

  it("ne doit plus demander de questions pour moins de 40h et 2 ans ou plus", () => {
    const result = engine.setSituation(
      {
        "contrat salarié . convention collective": "'IDCC3239'",
        "contrat salarié . convention collective . particuliers employeurs et emploi à domicile . typeRupture":
          "'Licenciement'",
        "contrat salarié . convention collective . particuliers employeurs et emploi à domicile . typeRupture Licenciement . catégorie professionnelle":
          "'Salariés du particulier employeur'",
        "contrat salarié . convention collective . particuliers employeurs et emploi à domicile . typeRupture Licenciement . catégorie professionnelle Salariés du particulier employeur . durée du travail":
          "'Moins de 40 heures par semaine'",
        "contrat salarié . convention collective . particuliers employeurs et emploi à domicile . typeRupture Licenciement . catégorie professionnelle Salariés du particulier employeur . durée du travail Moins de 40 heures par semaine . ancienneté":
          "'2 ans ou plus'",
      },
      "contrat salarié . convention collective . résultat conventionnel"
    );
    expect(getFirstMissing(result.missingArgs)).toEqual(null);
  });

  it("doit demander l'ancienneté pour 40 heures ou plus par semaine", () => {
    const result = engine.setSituation(
      {
        "contrat salarié . convention collective": "'IDCC3239'",
        "contrat salarié . convention collective . particuliers employeurs et emploi à domicile . typeRupture":
          "'Licenciement'",
        "contrat salarié . convention collective . particuliers employeurs et emploi à domicile . typeRupture Licenciement . catégorie professionnelle":
          "'Salariés du particulier employeur'",
        "contrat salarié . convention collective . particuliers employeurs et emploi à domicile . typeRupture Licenciement . catégorie professionnelle Salariés du particulier employeur . durée du travail":
          "'40 heures ou plus par semaine'",
      },
      "contrat salarié . convention collective . résultat conventionnel"
    );
    expect(getFirstMissing(result.missingArgs)).toEqual(
      "contrat salarié . convention collective . particuliers employeurs et emploi à domicile . typeRupture Licenciement . catégorie professionnelle Salariés du particulier employeur . durée du travail 40 heures ou plus par semaine . ancienneté"
    );
  });

  it("ne doit plus demander de questions pour 40h ou plus et moins de 2 ans", () => {
    const result = engine.setSituation(
      {
        "contrat salarié . convention collective": "'IDCC3239'",
        "contrat salarié . convention collective . particuliers employeurs et emploi à domicile . typeRupture":
          "'Licenciement'",
        "contrat salarié . convention collective . particuliers employeurs et emploi à domicile . typeRupture Licenciement . catégorie professionnelle":
          "'Salariés du particulier employeur'",
        "contrat salarié . convention collective . particuliers employeurs et emploi à domicile . typeRupture Licenciement . catégorie professionnelle Salariés du particulier employeur . durée du travail":
          "'40 heures ou plus par semaine'",
        "contrat salarié . convention collective . particuliers employeurs et emploi à domicile . typeRupture Licenciement . catégorie professionnelle Salariés du particulier employeur . durée du travail 40 heures ou plus par semaine . ancienneté":
          "'Moins de 2 ans'",
      },
      "contrat salarié . convention collective . résultat conventionnel"
    );
    expect(getFirstMissing(result.missingArgs)).toEqual(null);
  });

  it("ne doit plus demander de questions pour 40h ou plus et 2 ans ou plus", () => {
    const result = engine.setSituation(
      {
        "contrat salarié . convention collective": "'IDCC3239'",
        "contrat salarié . convention collective . particuliers employeurs et emploi à domicile . typeRupture":
          "'Licenciement'",
        "contrat salarié . convention collective . particuliers employeurs et emploi à domicile . typeRupture Licenciement . catégorie professionnelle":
          "'Salariés du particulier employeur'",
        "contrat salarié . convention collective . particuliers employeurs et emploi à domicile . typeRupture Licenciement . catégorie professionnelle Salariés du particulier employeur . durée du travail":
          "'40 heures ou plus par semaine'",
        "contrat salarié . convention collective . particuliers employeurs et emploi à domicile . typeRupture Licenciement . catégorie professionnelle Salariés du particulier employeur . durée du travail 40 heures ou plus par semaine . ancienneté":
          "'2 ans ou plus'",
      },
      "contrat salarié . convention collective . résultat conventionnel"
    );
    expect(getFirstMissing(result.missingArgs)).toEqual(null);
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
