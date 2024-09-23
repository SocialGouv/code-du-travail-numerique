import { MotifKeys, SeniorityFactory, SupportedCc } from "../../../../common";

describe("CC 3248", () => {
  describe("Calcul de l'ancienneté pour les groupes F,G,H,I (cadre)", () => {
    test.each`
      absences                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | entryDate       | exitDate        | expectedAnciennete
      ${[]}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | ${"20/02/2020"} | ${"20/02/2021"} | ${1}
      ${[{ durationInMonth: 1, motif: { key: MotifKeys.maladieNonPro } }]}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | ${"20/02/2020"} | ${"20/02/2021"} | ${1}
      ${[{ durationInMonth: 1, motif: { key: MotifKeys.maladieNonPro } }, { durationInMonth: 1, motif: { key: MotifKeys.accidentTrajet } }, { durationInMonth: 1, motif: { key: MotifKeys.congesSabbatique } }, { durationInMonth: 1, motif: { key: MotifKeys.congesCreationEntreprise } }, { durationInMonth: 1, motif: { key: MotifKeys.congesParentalEducation } }, { durationInMonth: 1, motif: { key: MotifKeys.congesSansSolde } }, { durationInMonth: 1, motif: { key: MotifKeys.greve } }, { durationInMonth: 1, motif: { key: MotifKeys.miseAPied } }]} | ${"20/02/2020"} | ${"20/02/2025"} | ${5}
    `(
      "Calcul de l'ancienneté avec $entryDate et $exitDate en attendant $expectedAnciennete an",
      ({ absences, entryDate, exitDate, expectedAnciennete }) => {
        const seniority = new SeniorityFactory().create(SupportedCc.IDCC3248);

        const result = seniority.computeSeniority({
          absencePeriods: absences,
          categoriePro: "'F, G, H ou I'",
          dateEntree: entryDate,
          dateSortie: exitDate,
          hasBeenDayContract: false,
          hasBeenExecutive: false,
        });

        expect(result.value).toEqual(expectedAnciennete);
      }
    );
  });

  describe("Calcul de l'ancienneté requise pour les groupes A,B,C,D,E (pas au forfait jour)", () => {
    test.each`
      absences                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | entryDate       | exitDate        | expectedAnciennete
      ${[]}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | ${"20/02/2020"} | ${"20/02/2021"} | ${1}
      ${[{ durationInMonth: 1, motif: { key: MotifKeys.maladieNonPro } }]}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | ${"20/02/2020"} | ${"20/02/2021"} | ${1}
      ${[{ durationInMonth: 12, motif: { key: MotifKeys.maladieNonPro } }]}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | ${"20/02/2020"} | ${"20/02/2025"} | ${5}
      ${[{ durationInMonth: 13, motif: { key: MotifKeys.maladieNonPro } }]}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | ${"20/02/2020"} | ${"20/02/2025"} | ${3.9166666666666665}
      ${[{ durationInMonth: 1, motif: { key: MotifKeys.maladieNonPro } }, { durationInMonth: 1, motif: { key: MotifKeys.accidentTrajet } }, { durationInMonth: 1, motif: { key: MotifKeys.congesSabbatique } }, { durationInMonth: 1, motif: { key: MotifKeys.congesCreationEntreprise } }, { durationInMonth: 1, motif: { key: MotifKeys.congesParentalEducation } }, { durationInMonth: 1, motif: { key: MotifKeys.congesSansSolde } }, { durationInMonth: 1, motif: { key: MotifKeys.greve } }, { durationInMonth: 1, motif: { key: MotifKeys.miseAPied } }]} | ${"20/02/2020"} | ${"20/02/2025"} | ${5}
    `(
      "Calcul de l'ancienneté avec $entryDate et $exitDate en attendant $expectedAnciennete an",
      ({ absences, entryDate, exitDate, expectedAnciennete }) => {
        const seniority = new SeniorityFactory().create(SupportedCc.IDCC3248);

        const result = seniority.computeRequiredSeniority({
          absencePeriods: absences,
          categoriePro: "'A, B, C, D ou E'",
          dateEntree: entryDate,
          dateNotification: exitDate,
          dateSortie: exitDate,
          hasBeenDayContract: false,
          hasBeenExecutive: false,
        });

        expect(result.value).toEqual(expectedAnciennete);
      }
    );
  });

  describe("Calcul de l'ancienneté pour les groupes A,B,C,D,E (pas au forfait jour)", () => {
    test.each`
      absences                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | entryDate       | exitDate        | expectedAnciennete
      ${[]}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | ${"20/02/2020"} | ${"20/02/2021"} | ${1}
      ${[{ durationInMonth: 1, motif: { key: MotifKeys.maladieNonPro } }]}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | ${"20/02/2020"} | ${"20/02/2021"} | ${1}
      ${[{ durationInMonth: 12, motif: { key: MotifKeys.maladieNonPro } }]}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | ${"20/02/2020"} | ${"20/02/2025"} | ${5}
      ${[{ durationInMonth: 13, motif: { key: MotifKeys.maladieNonPro } }]}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | ${"20/02/2020"} | ${"20/02/2025"} | ${3.9166666666666665}
      ${[{ durationInMonth: 1, motif: { key: MotifKeys.maladieNonPro } }, { durationInMonth: 1, motif: { key: MotifKeys.accidentTrajet } }, { durationInMonth: 1, motif: { key: MotifKeys.congesSabbatique } }, { durationInMonth: 1, motif: { key: MotifKeys.congesCreationEntreprise } }, { durationInMonth: 1, motif: { key: MotifKeys.congesParentalEducation } }, { durationInMonth: 1, motif: { key: MotifKeys.congesSansSolde } }, { durationInMonth: 1, motif: { key: MotifKeys.greve } }, { durationInMonth: 1, motif: { key: MotifKeys.miseAPied } }]} | ${"20/02/2020"} | ${"20/02/2025"} | ${5}
    `(
      "Calcul de l'ancienneté avec $entryDate et $exitDate en attendant $expectedAnciennete an",
      ({ absences, entryDate, exitDate, expectedAnciennete }) => {
        const seniority = new SeniorityFactory().create(SupportedCc.IDCC3248);

        const result = seniority.computeSeniority({
          absencePeriods: absences,
          categoriePro: "'A, B, C, D ou E'",
          dateEntree: entryDate,
          dateSortie: exitDate,
          hasBeenDayContract: false,
          hasBeenExecutive: false,
        });

        expect(result.value).toEqual(expectedAnciennete);
      }
    );
  });

  describe("Calcul de l'ancienneté pour les groupes A,B,C,D,E (absence de plus de 12 mois)", () => {
    test.each`
      absences                                                                         | hasLongPeriod
      ${[]}                                                                            | ${"non"}
      ${[{ durationInMonth: 6, motif: { key: MotifKeys.maladieNonPro } }]}             | ${"non"}
      ${[{ durationInMonth: 13, motif: { key: MotifKeys.maladieNonPro } }]}            | ${"non"}
      ${[{ durationInMonth: 11, motif: { key: MotifKeys.congesCreationEntreprise } }]} | ${"non"}
      ${[{ durationInMonth: 13, motif: { key: MotifKeys.congesCreationEntreprise } }]} | ${"oui"}
      ${[{ durationInMonth: 11, motif: { key: MotifKeys.congesSabbatique } }]}         | ${"non"}
      ${[{ durationInMonth: 13, motif: { key: MotifKeys.congesSabbatique } }]}         | ${"oui"}
      ${[{ durationInMonth: 11, motif: { key: MotifKeys.congesSansSolde } }]}          | ${"non"}
      ${[{ durationInMonth: 13, motif: { key: MotifKeys.congesSansSolde } }]}          | ${"oui"}
    `(
      `Avec une absence longue $absences[1], on s'attend à la détection d'une longue période d'absence : $hasLongPeriod`,
      ({ absences, hasLongPeriod }) => {
        const seniority = new SeniorityFactory().create(SupportedCc.IDCC3248);

        const result = seniority.computeSeniority({
          absencePeriods: absences,
          categoriePro: "'A, B, C, D ou E'",
          dateEntree: "01/01/2010",
          dateSortie: "01/01/2025",
          hasBeenDayContract: false,
          hasBeenExecutive: false,
        });

        const extraInfos = result.extraInfos ?? {};
        expect(
          extraInfos[
            "contrat salarié . convention collective . métallurgie . indemnité de licenciement . catégorie professionnelle . ABCDE . congés plus de 12 mois"
          ]
        ).toEqual(hasLongPeriod);
      }
    );
  });

  describe("Calcul de l'ancienneté pour les groupes A,B,C,D,E (au forfait jour)", () => {
    test.each`
      absences                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | entryDate       | exitDate        | expectedAnciennete
      ${[]}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | ${"20/02/2020"} | ${"20/02/2021"} | ${1.5}
      ${[{ durationInMonth: 1, motif: { key: MotifKeys.maladieNonPro } }]}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | ${"20/02/2020"} | ${"20/02/2021"} | ${1.5}
      ${[{ durationInMonth: 12, motif: { key: MotifKeys.maladieNonPro } }]}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | ${"20/02/2020"} | ${"20/02/2025"} | ${7.5}
      ${[{ durationInMonth: 13, motif: { key: MotifKeys.maladieNonPro } }]}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | ${"20/02/2020"} | ${"20/02/2025"} | ${5.875}
      ${[{ durationInMonth: 1, motif: { key: MotifKeys.maladieNonPro } }, { durationInMonth: 1, motif: { key: MotifKeys.accidentTrajet } }, { durationInMonth: 1, motif: { key: MotifKeys.congesSabbatique } }, { durationInMonth: 1, motif: { key: MotifKeys.congesCreationEntreprise } }, { durationInMonth: 1, motif: { key: MotifKeys.congesParentalEducation } }, { durationInMonth: 1, motif: { key: MotifKeys.congesSansSolde } }, { durationInMonth: 1, motif: { key: MotifKeys.greve } }, { durationInMonth: 1, motif: { key: MotifKeys.miseAPied } }]} | ${"20/02/2020"} | ${"20/02/2025"} | ${7.5}
    `(
      "Calcul de l'ancienneté avec $entryDate et $exitDate en attendant $expectedAnciennete an",
      ({ absences, entryDate, exitDate, expectedAnciennete }) => {
        const seniority = new SeniorityFactory().create(SupportedCc.IDCC3248);

        const result = seniority.computeSeniority({
          absencePeriods: absences,
          categoriePro: "'A, B, C, D ou E'",
          dateEntree: entryDate,
          dateSortie: exitDate,
          hasBeenDayContract: true,
          hasBeenExecutive: false,
        });

        expect(result.value).toEqual(expectedAnciennete);
      }
    );
  });

  describe("Calcul de l'ancienneté pour les groupes A,B,C,D,E (passage au forfait jour)", () => {
    test.each`
      absences                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | entryDate       | exitDate        | expectedAnciennete
      ${[]}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | ${"20/02/2020"} | ${"20/02/2025"} | ${6.5}
      ${[{ durationInMonth: 13, motif: { key: MotifKeys.maladieNonPro, value: 1 }, startedAt: "01/05/2020" }]}                                                                                                                                                                                                                                                                                                                                                                                                                                                   | ${"20/02/2020"} | ${"20/02/2025"} | ${5.416666666666667}
      ${[{ durationInMonth: 13, motif: { key: MotifKeys.maladieNonPro, value: 1 }, startedAt: "01/05/2022" }]}                                                                                                                                                                                                                                                                                                                                                                                                                                                   | ${"20/02/2020"} | ${"20/02/2025"} | ${4.875}
      ${[{ durationInMonth: 1, motif: { key: MotifKeys.maladieNonPro } }, { durationInMonth: 1, motif: { key: MotifKeys.accidentTrajet } }, { durationInMonth: 1, motif: { key: MotifKeys.congesSabbatique } }, { durationInMonth: 1, motif: { key: MotifKeys.congesCreationEntreprise } }, { durationInMonth: 1, motif: { key: MotifKeys.congesParentalEducation } }, { durationInMonth: 1, motif: { key: MotifKeys.congesSansSolde } }, { durationInMonth: 1, motif: { key: MotifKeys.greve } }, { durationInMonth: 1, motif: { key: MotifKeys.miseAPied } }]} | ${"20/02/2020"} | ${"20/02/2025"} | ${6.5}
      ${[{ durationInMonth: 3, motif: { key: MotifKeys.maladieNonPro }, startedAt: "01/01/2022" }]}                                                                                                                                                                                                                                                                                                                                                                                                                                                              | ${"20/02/2020"} | ${"20/02/2025"} | ${6.5}
    `(
      "Calcul de l'ancienneté avec $entryDate et $exitDate en attendant $expectedAnciennete an",
      ({ absences, entryDate, exitDate, expectedAnciennete }) => {
        const seniority = new SeniorityFactory().create(SupportedCc.IDCC3248);

        const result = seniority.computeSeniority({
          absencePeriods: absences,
          categoriePro: "'A, B, C, D ou E'",
          dateBecomeDayContract: "20/02/2022",
          dateEntree: entryDate,
          dateSortie: exitDate,
          hasBeenDayContract: true,
          hasBeenExecutive: false,
        });

        expect(result.value).toEqual(expectedAnciennete);
      }
    );
  });

  describe("Calcul de l'ancienneté pour les groupes A,B,C,D,E (passage au forfait jour et cadre)", () => {
    test.each`
      absences                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | entryDate       | exitDate        | expectedAnciennete
      ${[]}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | ${"20/02/2020"} | ${"20/02/2025"} | ${5.541666666666667}
      ${[{ durationInMonth: 13, motif: { key: MotifKeys.maladieNonPro, value: 1 }, startedAt: "01/05/2020" }]}                                                                                                                                                                                                                                                                                                                                                                                                                                                   | ${"20/02/2020"} | ${"20/02/2025"} | ${5.541666666666667}
      ${[{ durationInMonth: 13, motif: { key: MotifKeys.maladieNonPro, value: 1 }, startedAt: "01/05/2022" }]}                                                                                                                                                                                                                                                                                                                                                                                                                                                   | ${"20/02/2020"} | ${"20/02/2025"} | ${5.541666666666667}
      ${[{ durationInMonth: 1, motif: { key: MotifKeys.maladieNonPro } }, { durationInMonth: 1, motif: { key: MotifKeys.accidentTrajet } }, { durationInMonth: 1, motif: { key: MotifKeys.congesSabbatique } }, { durationInMonth: 1, motif: { key: MotifKeys.congesCreationEntreprise } }, { durationInMonth: 1, motif: { key: MotifKeys.congesParentalEducation } }, { durationInMonth: 1, motif: { key: MotifKeys.congesSansSolde } }, { durationInMonth: 1, motif: { key: MotifKeys.greve } }, { durationInMonth: 1, motif: { key: MotifKeys.miseAPied } }]} | ${"20/02/2020"} | ${"20/02/2025"} | ${5.541666666666667}
      ${[{ durationInMonth: 3, motif: { key: MotifKeys.maladieNonPro }, startedAt: "01/01/2022" }]}                                                                                                                                                                                                                                                                                                                                                                                                                                                              | ${"20/02/2020"} | ${"20/02/2025"} | ${5.541666666666667}
    `(
      "Calcul de l'ancienneté avec $entryDate et $exitDate en attendant $expectedAnciennete an",
      ({ absences, entryDate, exitDate, expectedAnciennete }) => {
        const seniority = new SeniorityFactory().create(SupportedCc.IDCC3248);

        const result = seniority.computeSeniority({
          absencePeriods: absences,
          categoriePro: "'A, B, C, D ou E'",
          dateBecomeDayContract: "20/02/2020",
          dateEntree: entryDate,
          dateSortie: exitDate,
          hasBeenDayContract: true,
          hasBeenExecutive: true,
        });

        expect(result.value).toEqual(expectedAnciennete);
      }
    );
  });

  describe("Calcul de l'ancienneté pour les groupes A,B,C,D,E (passage au forfait jour) - Cas spécifique", () => {
    test.each`
      absences                                                                                                | entryDate       | exitDate        | expectedAnciennete
      ${[{ durationInMonth: 6, motif: { key: MotifKeys.maladieNonPro, value: 1 }, startedAt: "01/01/2022" }]} | ${"01/01/2013"} | ${"01/01/2024"} | ${12.5}
    `(
      "Calcul de l'ancienneté avec $entryDate et $exitDate en attendant $expectedAnciennete an",
      ({ absences, entryDate, exitDate, expectedAnciennete }) => {
        const seniority = new SeniorityFactory().create(SupportedCc.IDCC3248);

        const result = seniority.computeSeniority({
          absencePeriods: absences,
          categoriePro: "'A, B, C, D ou E'",
          dateBecomeDayContract: "01/01/2021",
          dateEntree: entryDate,
          dateSortie: exitDate,
          hasBeenDayContract: true,
          hasBeenExecutive: false,
        });

        expect(result.value).toEqual(expectedAnciennete);
      }
    );
  });

  describe("Calcul de l'ancienneté pour les groupes A,B,C,D,E (passage au forfait jour) - Cas spécifique issue #5634", () => {
    test("Calcul de l'ancienneté", () => {
      const seniority = new SeniorityFactory().create(SupportedCc.IDCC3248);

      const result = seniority.computeSeniority({
        absencePeriods: [],
        categoriePro: "'A, B, C, D ou E'",
        dateBecomeDayContract: "04/09/2022",
        dateEntree: "02/01/2012",
        dateSortie: "02/12/2024",
        hasBeenDayContract: true,
        hasBeenExecutive: false,
      });

      expect(result.value).toEqual(14);
    });
  });

  describe("Calcul de l'ancienneté pour les groupes A,B,C,D,E au forfait jour avant cadre - Cas spécifique issue #5635", () => {
    test("Calcul de l'ancienneté", () => {
      const seniority = new SeniorityFactory().create(SupportedCc.IDCC3248);

      const result = seniority.computeSeniority({
        absencePeriods: [],
        categoriePro: "'A, B, C, D ou E'",
        dateEntree: "01/01/2018",
        dateSortie: "01/03/2024",
        hasBeenDayContract: true,
        hasBeenExecutive: true,
      });

      expect(result.value).toEqual(6.25);
    });
  });
});
