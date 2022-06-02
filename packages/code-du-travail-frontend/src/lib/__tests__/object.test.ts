import { deepEqualObject } from "..";

describe("deepEqualObject", () => {
  test.each`
    a                         | b                         | expected
    ${{ a: "yo", b: "sisi" }} | ${{ a: "yo", b: "sisi" }} | ${true}
    ${{ a: "yo" }}            | ${{ b: "sisi" }}          | ${false}
  `("should return $expected for $a and $b", ({ a, b, expected }) => {
    expect(deepEqualObject(a, b)).toBe(expected);
  });
});
