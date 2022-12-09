import Engine from "publicodes";

import { mergeIndemniteLicenciementModels } from "../../../../../internal/merger";
import { getReferences } from "../../../../common";

const engine = new Engine(mergeIndemniteLicenciementModels());

describe("Vérification des références juridiques pour la CC 16", () => {
  describe("Ouvriers (Autres licenciements)", () => {
    const references = [
      {
        article:
          "Article 5 bis de l’Accord du 16 juin 1961 relatif aux ouvriers - annexe I",
        url:
          "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005849373?idConteneur=KALICONT000005635624",
      },
    ];

    test.each`
      seniority | expectedReferences
      ${2}      | ${references}
      ${6}      | ${references}
      ${24}     | ${references}
    `(
      "avec une ancienneté de $seniority ans",
      ({ seniority, expectedReferences }) => {
        const result = getReferences(
          engine.setSituation({
            "contrat salarié . convention collective": "'IDCC0016'",
            "contrat salarié . convention collective . transports routiers . indemnité de licenciement . age": 45,
            "contrat salarié . convention collective . transports routiers . indemnité de licenciement . catégorie professionnelle":
              "'Ouvriers'",
            "contrat salarié . convention collective . transports routiers . indemnité de licenciement . catégorie professionnelle . Ouvriers . incapacité de conduite":
              "'Non'",
            "contrat salarié . convention collective . transports routiers . indemnité de licenciement . droit à la retraite au titre du régime en vigueur dans l'entreprise":
              "'Oui'",
            "contrat salarié . indemnité de licenciement": "oui",
            "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année": seniority,
            "contrat salarié . indemnité de licenciement . salaire de référence conventionnel": 1000,
          }),
          "résultat conventionnel"
        );

        expect(result).toHaveLength(expectedReferences.length);
        expect(result).toEqual(expect.arrayContaining(expectedReferences));
      }
    );
  });
  describe("Ouvriers (Incapacité temporaire à la conduite)", () => {
    const references = [
      {
        article:
          "Article 11 Ter de l’Accord du 16 juin 1961 relatif aux ouvriers - annexe I",
        url:
          "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005849397?idConteneur=KALICONT000005635624",
      },
    ];

    test.each`
      seniority | expectedReferences
      ${2}      | ${references}
      ${6}      | ${references}
      ${24}     | ${references}
    `(
      "avec une ancienneté de $seniority ans",
      ({ seniority, expectedReferences }) => {
        const result = getReferences(
          engine.setSituation({
            "contrat salarié . convention collective": "'IDCC0016'",
            "contrat salarié . convention collective . transports routiers . indemnité de licenciement . age": 45,
            "contrat salarié . convention collective . transports routiers . indemnité de licenciement . catégorie professionnelle":
              "'Ouvriers'",
            "contrat salarié . convention collective . transports routiers . indemnité de licenciement . catégorie professionnelle . Ouvriers . incapacité de conduite":
              "'Oui'",
            "contrat salarié . convention collective . transports routiers . indemnité de licenciement . catégorie professionnelle . Ouvriers . incapacité de conduite définitive":
              "'Non'",
            "contrat salarié . convention collective . transports routiers . indemnité de licenciement . droit à la retraite au titre du régime en vigueur dans l'entreprise":
              "'Oui'",
            "contrat salarié . indemnité de licenciement": "oui",
            "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année": seniority,
            "contrat salarié . indemnité de licenciement . salaire de référence conventionnel": 1000,
          }),
          "résultat conventionnel"
        );

        expect(result).toHaveLength(expectedReferences.length);
        expect(result).toEqual(expect.arrayContaining(expectedReferences));
      }
    );
  });
  describe("Ouvriers (Incapacité définitive à la conduite)", () => {
    const references = [
      {
        article:
          "Article 11 Ter de l’Accord du 16 juin 1961 relatif aux ouvriers - annexe I",
        url:
          "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005849397?idConteneur=KALICONT000005635624",
      },
    ];

    test.each`
      seniority | expectedReferences
      ${2}      | ${references}
      ${6}      | ${references}
      ${24}     | ${references}
    `(
      "avec une ancienneté de $seniority ans",
      ({ seniority, expectedReferences }) => {
        const result = getReferences(
          engine.setSituation({
            "contrat salarié . convention collective": "'IDCC0016'",
            "contrat salarié . convention collective . transports routiers . indemnité de licenciement . age": 45,
            "contrat salarié . convention collective . transports routiers . indemnité de licenciement . catégorie professionnelle":
              "'Ouvriers'",
            "contrat salarié . convention collective . transports routiers . indemnité de licenciement . catégorie professionnelle . Ouvriers . incapacité de conduite":
              "'Oui'",
            "contrat salarié . convention collective . transports routiers . indemnité de licenciement . catégorie professionnelle . Ouvriers . incapacité de conduite définitive":
              "'Oui'",
            "contrat salarié . convention collective . transports routiers . indemnité de licenciement . droit à la retraite au titre du régime en vigueur dans l'entreprise":
              "'Oui'",
            "contrat salarié . indemnité de licenciement": "oui",
            "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année": seniority,
            "contrat salarié . indemnité de licenciement . salaire de référence conventionnel": 1000,
          }),
          "résultat conventionnel"
        );

        expect(result).toHaveLength(expectedReferences.length);
        expect(result).toEqual(expect.arrayContaining(expectedReferences));
      }
    );
  });
  describe("Ingénieurs et cadres", () => {
    const references = [
      {
        article:
          "Article 17 de l’Accord du 30 octobre 1951 relatif aux ingénieurs et cadres Annexe IV",
        url:
          "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005849570?idConteneur=KALICONT000005635624",
      },
    ];

    test.each`
      seniority | expectedReferences
      ${2}      | ${references}
      ${6}      | ${references}
      ${24}     | ${references}
    `(
      "avec une ancienneté de $seniority ans",
      ({ seniority, expectedReferences }) => {
        const result = getReferences(
          engine.setSituation({
            "contrat salarié . convention collective": "'IDCC0016'",
            "contrat salarié . convention collective . transports routiers . indemnité de licenciement . age": 60,
            "contrat salarié . convention collective . transports routiers . indemnité de licenciement . catégorie professionnelle":
              "'Ingénieurs et cadres'",
            "contrat salarié . convention collective . transports routiers . indemnité de licenciement . catégorie professionnelle . Ingénieurs et cadres . ancienneté avant cadre": 0,
            "contrat salarié . convention collective . transports routiers . indemnité de licenciement . catégorie professionnelle . Ingénieurs et cadres . avant employé ou technicien": `${"'Non'"}`,
            "contrat salarié . convention collective . transports routiers . indemnité de licenciement . droit à la retraite au titre du régime en vigueur dans l'entreprise": `${"'Oui'"}`,
            "contrat salarié . indemnité de licenciement": "oui",
            "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année": seniority,
            "contrat salarié . indemnité de licenciement . salaire de référence conventionnel": 1000,
          }),
          "résultat conventionnel"
        );

        expect(result).toHaveLength(expectedReferences.length);
        expect(result).toEqual(expect.arrayContaining(expectedReferences));
      }
    );
  });
  describe("TAM", () => {
    const references = [
      {
        article:
          "Article 18 de l’Accord du 30 mars 1951 relatif aux techniciens et agents de maîtrise Annexe III",
        url:
          "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005849264?idConteneur=KALICONT000005635624",
      },
    ];

    test.each`
      seniority | expectedReferences
      ${2}      | ${references}
      ${6}      | ${references}
      ${24}     | ${references}
    `(
      "avec une ancienneté de $seniority ans",
      ({ seniority, expectedReferences }) => {
        const result = getReferences(
          engine.setSituation({
            "contrat salarié . convention collective": "'IDCC0016'",
            "contrat salarié . convention collective . transports routiers . indemnité de licenciement . age": 45,
            "contrat salarié . convention collective . transports routiers . indemnité de licenciement . catégorie professionnelle":
              "'TAM'",
            "contrat salarié . convention collective . transports routiers . indemnité de licenciement . droit à la retraite au titre du régime en vigueur dans l'entreprise": `${"'Oui'"}`,
            "contrat salarié . indemnité de licenciement": "oui",
            "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année": seniority,
            "contrat salarié . indemnité de licenciement . salaire de référence conventionnel": 1000,
          }),
          "résultat conventionnel"
        );

        expect(result).toHaveLength(expectedReferences.length);
        expect(result).toEqual(expect.arrayContaining(expectedReferences));
      }
    );
  });
  describe("Employés", () => {
    const references = [
      {
        article:
          "Article 14 de l’Accord du 27 février 1951 relatif aux employés Annexe II",
        url:
          "https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005849373?idConteneur=KALICONT000005635624",
      },
    ];

    test.each`
      seniority | expectedReferences
      ${2}      | ${references}
      ${6}      | ${references}
      ${24}     | ${references}
    `(
      "avec une ancienneté de $seniority ans",
      ({ seniority, expectedReferences }) => {
        const result = getReferences(
          engine.setSituation({
            "contrat salarié . convention collective": "'IDCC0016'",
            "contrat salarié . convention collective . transports routiers . indemnité de licenciement . age": 45,
            "contrat salarié . convention collective . transports routiers . indemnité de licenciement . catégorie professionnelle":
              "'Employés'",
            "contrat salarié . convention collective . transports routiers . indemnité de licenciement . droit à la retraite au titre du régime en vigueur dans l'entreprise": `${"'Oui'"}`,
            "contrat salarié . indemnité de licenciement": "oui",
            "contrat salarié . indemnité de licenciement . ancienneté conventionnelle en année": seniority,
            "contrat salarié . indemnité de licenciement . salaire de référence conventionnel": 1000,
          }),
          "résultat conventionnel"
        );

        expect(result).toHaveLength(expectedReferences.length);
        expect(result).toEqual(expect.arrayContaining(expectedReferences));
      }
    );
  });
});
