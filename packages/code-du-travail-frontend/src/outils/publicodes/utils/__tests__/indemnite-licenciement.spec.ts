import { publicodesUnitTranslator } from "../indemnite-licenciement"

describe("Indemnité de licenciement", () => {
  test.each`
  value | unit | expected
  ${"1"} | ${"an"} | ${"an"}
  ${"2"} | ${"an"} | ${"ans"}
  ${"1"} | ${"mois"} | ${"mois"}
  ${"2"} | ${"mois"} | ${"mois"}
  ${"1"} | ${undefined} | ${""}
  `("publicodesUnitTranslator", ({ value, unit, expected }) => {
    expect(publicodesUnitTranslator(value, unit)).toBe(expected)
  })
})
