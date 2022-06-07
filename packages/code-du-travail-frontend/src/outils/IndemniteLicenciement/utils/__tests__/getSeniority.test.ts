import { getSeniority } from "..";

describe("getSeniority", () => {
  it("should compute seniority", () => {
    expect(
      getSeniority({ dateEntree: "2017-04-01", dateSortie: "2018-04-01" })
    ).toEqual(1);
  });
  it("should compute seniority with periods of absence", () => {
    expect(
      getSeniority({
        absencePeriods: [{ duration: "6", type: "Congés sans solde" }],
        dateEntree: "2017-04-01",
        dateSortie: "2018-04-01",
      })
    ).toEqual(0.5);
  });
  it("should compute seniority with periods of absence divided by two for Congé parental", () => {
    expect(
      getSeniority({
        absencePeriods: [{ duration: "6", type: "Congé parental d'éducation" }],
        dateEntree: "2016-04-01",
        dateSortie: "2018-04-01",
      })
    ).toEqual(1.75);
  });
});
