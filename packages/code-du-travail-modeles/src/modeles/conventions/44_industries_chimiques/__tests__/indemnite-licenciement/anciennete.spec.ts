import {
  MotifKeys,
  SeniorityFactory,
  SupportedCcIndemniteLicenciement,
} from "../../../../common";

describe("CC 44", () => {
  describe("Calcul de l'ancienneté", () => {
    test.each`
      absences                                                                                                                                                                                                                                                                                                                                                                                              | entryDate       | exitDate        | expectedAnciennete
      ${[]}                                                                                                                                                                                                                                                                                                                                                                                                 | ${"20/02/2020"} | ${"20/02/2021"} | ${1}
      ${[{ motif: { motif: { key: MotifKeys.maladieNonPro } } }, { motif: { key: MotifKeys.accidentTrajet } }, { motif: { key: MotifKeys.congesSabbatique } }, { motif: { key: MotifKeys.congesCreationEntreprise } }, { motif: { key: MotifKeys.congesParentalEducation } }, { motif: { key: MotifKeys.congesSansSolde } }, { motif: { key: MotifKeys.greve } }, { motif: { key: MotifKeys.miseAPied } }]} | ${"20/02/2020"} | ${"20/02/2021"} | ${1}
      ${[{ durationInMonth: 0, motif: { key: MotifKeys.maladieNonPro } }, {
    durationInMonth: 0,
    motif: { key: MotifKeys.accidentTrajet },
  }, { durationInMonth: 0, motif: { key: MotifKeys.congesSabbatique } }, {
    durationInMonth: 0,
    motif: { key: MotifKeys.congesCreationEntreprise },
  }, { durationInMonth: 0, motif: { key: MotifKeys.congesParentalEducation } }, {
    durationInMonth: 0,
    motif: { key: MotifKeys.congesSansSolde },
  }, { durationInMonth: 0, motif: { key: MotifKeys.greve } }, {
    durationInMonth: 0,
    motif: { key: MotifKeys.miseAPied },
  }]} | ${"20/02/2020"} | ${"20/02/2021"} | ${1}
      ${[{ durationInMonth: "1", motif: { key: MotifKeys.maladieNonPro } }, {
    durationInMonth: 0,
    motif: { key: MotifKeys.accidentTrajet },
  }, { durationInMonth: 0, motif: { key: MotifKeys.congesSabbatique } }, {
    durationInMonth: 0,
    motif: { key: MotifKeys.congesCreationEntreprise },
  }, { durationInMonth: 0, motif: { key: MotifKeys.congesParentalEducation } }, {
    durationInMonth: 0,
    motif: { key: MotifKeys.congesSansSolde },
  }, { durationInMonth: 0, motif: { key: MotifKeys.greve } }, {
    durationInMonth: 0,
    motif: { key: MotifKeys.miseAPied },
  }]} | ${"20/02/2020"} | ${"20/02/2021"} | ${1}
      ${[{ durationInMonth: 0, motif: { key: MotifKeys.maladieNonPro } }, {
    durationInMonth: "1",
    motif: { key: MotifKeys.accidentTrajet },
  }, { durationInMonth: 0, motif: { key: MotifKeys.congesSabbatique } }, {
    durationInMonth: 0,
    motif: { key: MotifKeys.congesCreationEntreprise },
  }, { durationInMonth: 0, motif: { key: MotifKeys.congesParentalEducation } }, {
    durationInMonth: 0,
    motif: { key: MotifKeys.congesSansSolde },
  }, { durationInMonth: 0, motif: { key: MotifKeys.greve } }, {
    durationInMonth: 0,
    motif: { key: MotifKeys.miseAPied },
  }]} | ${"20/02/2020"} | ${"20/02/2021"} | ${0.9166666666666666}
      ${[{ durationInMonth: 0, motif: { key: MotifKeys.maladieNonPro } }, {
    durationInMonth: 0,
    motif: { key: MotifKeys.accidentTrajet },
  }, { durationInMonth: "1", motif: { key: MotifKeys.congesSabbatique } }, {
    durationInMonth: 0,
    motif: { key: MotifKeys.congesCreationEntreprise },
  }, { durationInMonth: 0, motif: { key: MotifKeys.congesParentalEducation } }, {
    durationInMonth: 0,
    motif: { key: MotifKeys.congesSansSolde },
  }, { durationInMonth: 0, motif: { key: MotifKeys.greve } }, {
    durationInMonth: 0,
    motif: { key: MotifKeys.miseAPied },
  }]} | ${"20/02/2020"} | ${"20/02/2021"} | ${0.9166666666666666}
      ${[{ durationInMonth: 0, motif: { key: MotifKeys.maladieNonPro } }, {
    durationInMonth: 0,
    motif: { key: MotifKeys.accidentTrajet },
  }, { durationInMonth: 0, motif: { key: MotifKeys.congesSabbatique } }, {
    durationInMonth: "1",
    motif: { key: MotifKeys.congesCreationEntreprise },
  }, { durationInMonth: 0, motif: { key: MotifKeys.congesParentalEducation } }, {
    durationInMonth: 0,
    motif: { key: MotifKeys.congesSansSolde },
  }, { durationInMonth: 0, motif: { key: MotifKeys.greve } }, {
    durationInMonth: 0,
    motif: { key: MotifKeys.miseAPied },
  }]} | ${"20/02/2020"} | ${"20/02/2021"} | ${0.9166666666666666}
      ${[{ durationInMonth: 0, motif: { key: MotifKeys.maladieNonPro } }, {
    durationInMonth: 0,
    motif: { key: MotifKeys.accidentTrajet },
  }, { durationInMonth: 0, motif: { key: MotifKeys.congesSabbatique } }, {
    durationInMonth: 0,
    motif: { key: MotifKeys.congesCreationEntreprise },
  }, { durationInMonth: "1", motif: { key: MotifKeys.congesParentalEducation } }, {
    durationInMonth: 0,
    motif: { key: MotifKeys.congesSansSolde },
  }, { durationInMonth: 0, motif: { key: MotifKeys.greve } }, {
    durationInMonth: 0,
    motif: { key: MotifKeys.miseAPied },
  }]} | ${"20/02/2020"} | ${"20/02/2021"} | ${0.9583333333333334}
      ${[{ durationInMonth: 0, motif: { key: MotifKeys.maladieNonPro } }, {
    durationInMonth: 0,
    motif: { key: MotifKeys.accidentTrajet },
  }, { durationInMonth: 0, motif: { key: MotifKeys.congesSabbatique } }, {
    durationInMonth: 0,
    motif: { key: MotifKeys.congesCreationEntreprise },
  }, { durationInMonth: 0, motif: { key: MotifKeys.congesParentalEducation } }, {
    durationInMonth: "1",
    motif: { key: MotifKeys.congesSansSolde },
  }, { durationInMonth: 0, motif: { key: MotifKeys.greve } }, {
    durationInMonth: 0,
    motif: { key: MotifKeys.miseAPied },
  }]} | ${"20/02/2020"} | ${"20/02/2021"} | ${0.9166666666666666}
      ${[{ durationInMonth: 0, motif: { key: MotifKeys.maladieNonPro } }, {
    durationInMonth: 0,
    motif: { key: MotifKeys.accidentTrajet },
  }, { durationInMonth: 0, motif: { key: MotifKeys.congesSabbatique } }, {
    durationInMonth: 0,
    motif: { key: MotifKeys.congesCreationEntreprise },
  }, { durationInMonth: 0, motif: { key: MotifKeys.congesParentalEducation } }, {
    durationInMonth: 0,
    motif: { key: MotifKeys.congesSansSolde },
  }, { durationInMonth: "1", motif: { key: MotifKeys.greve } }, {
    durationInMonth: 0,
    motif: { key: MotifKeys.miseAPied },
  }]} | ${"20/02/2020"} | ${"20/02/2021"} | ${0.9166666666666666}
      ${[{ durationInMonth: 0, motif: { key: MotifKeys.maladieNonPro } }, {
    durationInMonth: 0,
    motif: { key: MotifKeys.accidentTrajet },
  }, { durationInMonth: 0, motif: { key: MotifKeys.congesSabbatique } }, {
    durationInMonth: 0,
    motif: { key: MotifKeys.congesCreationEntreprise },
  }, { durationInMonth: 0, motif: { key: MotifKeys.congesParentalEducation } }, {
    durationInMonth: 0,
    motif: { key: MotifKeys.congesSansSolde },
  }, { durationInMonth: 0, motif: { key: MotifKeys.greve } }, {
    durationInMonth: "1",
    motif: { key: MotifKeys.miseAPied },
  }]} | ${"20/02/2020"} | ${"20/02/2021"} | ${0.9166666666666666}
      ${[{ durationInMonth: "1", motif: { key: MotifKeys.maladieNonPro } }, {
    durationInMonth: "1",
    motif: { key: MotifKeys.accidentTrajet },
  }, { durationInMonth: "1", motif: { key: MotifKeys.congesSabbatique } }, {
    durationInMonth: "1",
    motif: { key: MotifKeys.congesCreationEntreprise },
  }, { durationInMonth: "1", motif: { key: MotifKeys.congesParentalEducation } }, {
    durationInMonth: "1",
    motif: { key: MotifKeys.congesSansSolde },
  }, { durationInMonth: "1", motif: { key: MotifKeys.greve } }, {
    durationInMonth: "1",
    motif: { key: MotifKeys.miseAPied },
  }]} | ${"20/02/2020"} | ${"20/02/2021"} | ${0.4583333333333333}
      ${[{ durationInMonth: "1", motif: { key: MotifKeys.maladieNonPro } }, {
    durationInMonth: "1",
    motif: { key: MotifKeys.accidentTrajet },
  }, { durationInMonth: "1", motif: { key: MotifKeys.congesSabbatique } }, {
    durationInMonth: "1",
    motif: { key: MotifKeys.congesCreationEntreprise },
  }, { durationInMonth: "1", motif: { key: MotifKeys.congesParentalEducation } }, {
    durationInMonth: "1",
    motif: { key: MotifKeys.congesSansSolde },
  }, { durationInMonth: "1", motif: { key: MotifKeys.greve } }, {
    durationInMonth: "1",
    motif: { key: MotifKeys.miseAPied },
  }]} | ${"20/01/2021"} | ${"20/02/2021"} | ${-0.4583333333333333}
      ${[{ durationInMonth: 0, motif: { key: MotifKeys.maladieNonPro } }, {
    durationInMonth: 0,
    motif: { key: MotifKeys.accidentTrajet },
  }, { durationInMonth: 0, motif: { key: MotifKeys.congesSabbatique } }, {
    durationInMonth: 0,
    motif: { key: MotifKeys.congesCreationEntreprise },
  }, { durationInMonth: 0, motif: { key: MotifKeys.congesParentalEducation } }, {
    durationInMonth: 0,
    motif: { key: MotifKeys.congesSansSolde },
  }, { durationInMonth: 0, motif: { key: MotifKeys.greve } }, {
    durationInMonth: 0,
    motif: { key: MotifKeys.miseAPied },
  }]} | ${"01/01/1979"} | ${"01/01/2021"} | ${42}
      ${[{ durationInMonth: 0, motif: { key: MotifKeys.maladieNonPro } }, {
    durationInMonth: 12,
    motif: { key: MotifKeys.accidentTrajet },
  }, { durationInMonth: 0, motif: { key: MotifKeys.congesSabbatique } }, {
    durationInMonth: 0,
    motif: { key: MotifKeys.congesCreationEntreprise },
  }, { durationInMonth: 0, motif: { key: MotifKeys.congesParentalEducation } }, {
    durationInMonth: 0,
    motif: { key: MotifKeys.congesSansSolde },
  }, { durationInMonth: 0, motif: { key: MotifKeys.greve } }, {
    durationInMonth: 0,
    motif: { key: MotifKeys.miseAPied },
  }]} | ${"01/01/1979"} | ${"01/01/2021"} | ${41}
      ${[{ durationInMonth: 12, motif: { key: MotifKeys.maladieNonPro } }, {
    durationInMonth: 0,
    motif: { key: MotifKeys.accidentTrajet },
  }, { durationInMonth: 0, motif: { key: MotifKeys.congesSabbatique } }, {
    durationInMonth: 0,
    motif: { key: MotifKeys.congesCreationEntreprise },
  }, { durationInMonth: 0, motif: { key: MotifKeys.congesParentalEducation } }, {
    durationInMonth: 0,
    motif: { key: MotifKeys.congesSansSolde },
  }, { durationInMonth: 0, motif: { key: MotifKeys.greve } }, {
    durationInMonth: 0,
    motif: { key: MotifKeys.miseAPied },
  }]} | ${"01/01/1979"} | ${"01/01/2021"} | ${42}
      ${[{ durationInMonth: 24, motif: { key: MotifKeys.maladieNonPro } }, {
    durationInMonth: 0,
    motif: { key: MotifKeys.accidentTrajet },
  }, { durationInMonth: 0, motif: { key: MotifKeys.congesSabbatique } }, {
    durationInMonth: 0,
    motif: { key: MotifKeys.congesCreationEntreprise },
  }, { durationInMonth: 0, motif: { key: MotifKeys.congesParentalEducation } }, {
    durationInMonth: 0,
    motif: { key: MotifKeys.congesSansSolde },
  }, { durationInMonth: 0, motif: { key: MotifKeys.greve } }, {
    durationInMonth: 0,
    motif: { key: MotifKeys.miseAPied },
  }]} | ${"01/01/1979"} | ${"01/01/2021"} | ${42}
      ${[{ durationInMonth: 36, motif: { key: MotifKeys.maladieNonPro } }, {
    durationInMonth: 0,
    motif: { key: MotifKeys.accidentTrajet },
  }, { durationInMonth: 0, motif: { key: MotifKeys.congesSabbatique } }, {
    durationInMonth: 0,
    motif: { key: MotifKeys.congesCreationEntreprise },
  }, { durationInMonth: 0, motif: { key: MotifKeys.congesParentalEducation } }, {
    durationInMonth: 0,
    motif: { key: MotifKeys.congesSansSolde },
  }, { durationInMonth: 0, motif: { key: MotifKeys.greve } }, {
    durationInMonth: 0,
    motif: { key: MotifKeys.miseAPied },
  }]} | ${"01/01/1979"} | ${"01/01/2021"} | ${42}
      ${[{ durationInMonth: 37, motif: { key: MotifKeys.maladieNonPro } }, {
    durationInMonth: 0,
    motif: { key: MotifKeys.accidentTrajet },
  }, { durationInMonth: 0, motif: { key: MotifKeys.congesSabbatique } }, {
    durationInMonth: 0,
    motif: { key: MotifKeys.congesCreationEntreprise },
  }, { durationInMonth: 0, motif: { key: MotifKeys.congesParentalEducation } }, {
    durationInMonth: 0,
    motif: { key: MotifKeys.congesSansSolde },
  }, { durationInMonth: 0, motif: { key: MotifKeys.greve } }, {
    durationInMonth: 0,
    motif: { key: MotifKeys.miseAPied },
  }]} | ${"01/01/1979"} | ${"01/01/2021"} | ${41.916666666666664}
      ${[{ durationInMonth: 1, motif: { key: MotifKeys.congesSabbatique } }, {
    durationInMonth: 0,
    motif: { key: MotifKeys.accidentTrajet },
  }]} | ${"01/01/2020"} | ${"01/02/2021"} | ${1}
    `(
      "$# Calcul de l'ancienneté avec $entryDate et $exitDate en attendant $expectedAnciennete an",
      ({ absences, entryDate, exitDate, expectedAnciennete }) => {
        const seniority = new SeniorityFactory().create(
          SupportedCcIndemniteLicenciement.IDCC0044
        );

        const result = seniority.computeSeniority({
          absencePeriods: absences,
          dateEntree: entryDate,
          dateSortie: exitDate,
        });

        expect(result.value).toEqual(expectedAnciennete);
      }
    );
  });
});
