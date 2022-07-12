import { seniorityMonthRounded } from "../seniorityMonthRounded";

describe("seniorityMonthRounded", () => {
  it.each`
    seniorityInYear | expected
    ${0}            | ${0}
    ${1}            | ${1}
    ${42.03}        | ${42}
    ${42.04}        | ${42}
    ${0.92}         | ${0.92}
  `("should generate explanation", ({ seniorityInYear, expected }) => {
    expect(seniorityMonthRounded(seniorityInYear)).toStrictEqual(expected);
  });
});
