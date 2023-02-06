import {
  getMonth,
  getYear,
  monthToNumber,
  rankByMonthArrayDescFrench,
} from "../date";

describe("date", () => {
  it.each`
    month        | rank
    ${null}      | ${0}
    ${""}        | ${0}
    ${"janvier"} | ${1}
    ${"février"} | ${2}
    ${"mars"}    | ${3}
    ${"dsqdsq"}  | ${0}
    ${"fevrier"} | ${2}
    ${"AVRIL"}   | ${4}
    ${"FEVRIER"} | ${2}
  `("should return the $rank for $month", ({ month, rank }) => {
    expect(monthToNumber(month)).toEqual(rank);
  });

  it.each`
    input             | year
    ${null}           | ${0}
    ${""}             | ${0}
    ${"janvier 2020"} | ${2020}
    ${"février 2021"} | ${2021}
    ${"mars 2022"}    | ${2022}
    ${"dsqdsq xsws"}  | ${0}
    ${"fevrier 2022"} | ${2022}
    ${"AVRIL 2015"}   | ${2015}
    ${"FEVRIER  "}    | ${0}
  `("should return the $year for $input", ({ input, year }) => {
    expect(getYear(input)).toEqual(year);
  });

  it.each`
    input             | month
    ${null}           | ${""}
    ${""}             | ${""}
    ${"janvier 2020"} | ${"janvier"}
    ${"février 2021"} | ${"février"}
    ${"mars 2022"}    | ${"mars"}
    ${"dsqdsq xsws"}  | ${"dsqdsq"}
  `("should return the $month for $input", ({ input, month }) => {
    expect(getMonth(input)).toEqual(month);
  });

  it.each`
    arr                                                                                                                                                   | expected
    ${[undefined]}                                                                                                                                        | ${[undefined]}
    ${[]}                                                                                                                                                 | ${[]}
    ${[{ month: "février", value: 3 }]}                                                                                                                   | ${[{ month: "février", value: 3 }]}
    ${[{ month: "février", value: 3 }, { month: "mars", value: 2 }]}                                                                                      | ${[{ month: "mars", value: 2 }, { month: "février", value: 3 }]}
    ${[{ month: "décembre", value: 3 }, { month: "novembre", value: 2 }]}                                                                                 | ${[{ month: "décembre", value: 3 }, { month: "novembre", value: 2 }]}
    ${[{ month: "décembre 2012", value: 3 }, { month: "novembre 2020", value: 2 }]}                                                                       | ${[{ month: "novembre 2020", value: 2 }, { month: "décembre 2012", value: 3 }]}
    ${[{ month: "janvier 2015", value: 3 }, { month: "février 2016", value: 3 }, { month: "mars 2015", value: 3 }, { month: "novembre 2020", value: 3 }]} | ${[{ month: "novembre 2020", value: 3 }, { month: "février 2016", value: 3 }, { month: "mars 2015", value: 3 }, { month: "janvier 2015", value: 3 }]}
  `("should return $expected with $arr", ({ arr, expected }) => {
    expect(rankByMonthArrayDescFrench(arr)).toEqual(expected);
  });
});
