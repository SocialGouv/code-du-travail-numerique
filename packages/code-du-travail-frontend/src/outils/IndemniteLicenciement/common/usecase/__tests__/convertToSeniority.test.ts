import { convertToSeniority } from "..";
import { MOTIFS } from "../../motifs";

describe("convertToSeniority", () => {
  test.each`
    dateEntree | dateSortie | absencePeriods | expected
    ${"01/01/2020"} | ${"01/01/2021"} | ${[]} | ${{
  absenceAccidentTrajet: 0,
  absenceCongesCreationEntreprise: 0,
  absenceCongesParentalEducation: 0,
  absenceCongesPaternite: 0,
  absenceCongesSabbatique: 0,
  absenceCongesSansSolde: 0,
  absenceGreve: 0,
  absenceMaladieOrigineNonPro: 0,
  absenceMaladiePro: 0,
  absenceMiseAPied: 0,
  entryDate: "01/01/2020",
  exitDate: "01/01/2021",
}}
    ${"01/01/2021"} | ${"01/01/2022"} | ${[{ motif: MOTIFS[0].label, durationInMonth: 1 }]} | ${{
  absenceAccidentTrajet: 0,
  absenceCongesCreationEntreprise: 0,
  absenceCongesParentalEducation: 0,
  absenceCongesPaternite: 0,
  absenceCongesSabbatique: 0,
  absenceCongesSansSolde: 0,
  absenceGreve: 0,
  absenceMaladieOrigineNonPro: 0,
  absenceMaladiePro: 1,
  absenceMiseAPied: 0,
  entryDate: "01/01/2021",
  exitDate: "01/01/2022",
}}
    ${"01/01/2021"} | ${"01/01/2022"} | ${[{ motif: MOTIFS[3].label, durationInMonth: 5 }, { motif: MOTIFS[1].label, durationInMonth: 3 }]} | ${{
  absenceAccidentTrajet: 3,
  absenceCongesCreationEntreprise: 5,
  absenceCongesParentalEducation: 0,
  absenceCongesPaternite: 0,
  absenceCongesSabbatique: 0,
  absenceCongesSansSolde: 0,
  absenceGreve: 0,
  absenceMaladieOrigineNonPro: 0,
  absenceMaladiePro: 0,
  absenceMiseAPied: 0,
  entryDate: "01/01/2021",
  exitDate: "01/01/2022",
}}
    ${"01/01/2021"} | ${"01/01/2022"} | ${[{ motif: "yo", durationInMonth: 5 }, { motif: MOTIFS[1].label, durationInMonth: 3 }]} | ${{
  absenceAccidentTrajet: 3,
  absenceCongesCreationEntreprise: 0,
  absenceCongesParentalEducation: 0,
  absenceCongesPaternite: 0,
  absenceCongesSabbatique: 0,
  absenceCongesSansSolde: 0,
  absenceGreve: 0,
  absenceMaladieOrigineNonPro: 0,
  absenceMaladiePro: 0,
  absenceMiseAPied: 0,
  entryDate: "01/01/2021",
  exitDate: "01/01/2022",
}}
    ${"01/01/2021"} | ${"01/01/2022"} | ${[{ motif: MOTIFS[1].label, durationInMonth: 3 }, { motif: MOTIFS[1].label, durationInMonth: 3 }]} | ${{
  absenceAccidentTrajet: 6,
  absenceCongesCreationEntreprise: 0,
  absenceCongesParentalEducation: 0,
  absenceCongesPaternite: 0,
  absenceCongesSabbatique: 0,
  absenceCongesSansSolde: 0,
  absenceGreve: 0,
  absenceMaladieOrigineNonPro: 0,
  absenceMaladiePro: 0,
  absenceMiseAPied: 0,
  entryDate: "01/01/2021",
  exitDate: "01/01/2022",
}}
  `(
    "should generate explanation",
    ({ dateEntree, dateSortie, absencePeriods, expected }) => {
      expect(
        convertToSeniority(dateEntree, dateSortie, absencePeriods)
      ).toStrictEqual(expected);
    }
  );
});
