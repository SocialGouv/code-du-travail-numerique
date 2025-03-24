import { calculateNumberOfElements } from "../calculateNumberOfElements";

describe("calculateNumberOfElements", () => {
  it.each`
    input           | result
    ${[undefined]}  | ${0}
    ${["yo"]}       | ${1}
    ${[null, "yo"]} | ${1}
    ${[1, 2]}       | ${2}
    ${[1, 0]}       | ${2}
    ${[1, 0, "s"]}  | ${3}
  `("should return $result for $input", ({ input, result }) => {
    expect(calculateNumberOfElements(...input)).toBe(result);
  });
});
