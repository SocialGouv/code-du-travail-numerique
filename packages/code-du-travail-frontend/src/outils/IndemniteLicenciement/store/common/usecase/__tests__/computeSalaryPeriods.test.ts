import { computeSalaryPeriods } from "..";

describe("computeSalaryPeriods", () => {
  it("should compute salary periods for the last 12 months", () => {
    expect(
      computeSalaryPeriods({
        dateEntree: "2017-02-01",
        dateNotification: "2018-04-01",
      })
    ).toEqual([
      "mars 2018",
      "février 2018",
      "janvier 2018",
      "décembre 2017",
      "novembre 2017",
      "octobre 2017",
      "septembre 2017",
      "août 2017",
      "juillet 2017",
      "juin 2017",
      "mai 2017",
      "avril 2017",
    ]);
  });
  it("should compute salary periods for 2 months", () => {
    expect(
      computeSalaryPeriods({
        absencePeriods: [{ durationInMonth: 6, motif: "Congés sans solde" }],
        dateEntree: "2017-04-01",
        dateNotification: "2017-12-01",
      })
    ).toEqual(["novembre 2017", "octobre 2017"]);
  });
});
