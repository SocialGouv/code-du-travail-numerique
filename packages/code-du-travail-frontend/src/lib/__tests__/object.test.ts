import { deepEqualObject } from "..";

describe("deepEqualObject", () => {
  test.each`
    a                                 | b                                 | expected
    ${{ a: "yo", b: "sisi" }}         | ${{ a: "yo", b: "sisi" }}         | ${true}
    ${{ a: "yo" }}                    | ${{ b: "sisi" }}                  | ${false}
    ${{ yo: { a: "yo", b: "sisi" } }} | ${{ yo: { a: "yo", b: "sisi" } }} | ${true}
    ${{ yo: { a: "yo", b: "sisi" } }} | ${{ yo: { a: "no", b: "sisi" } }} | ${false}
  `("should return $expected for $a and $b", ({ a, b, expected }) => {
    expect(deepEqualObject(a, b)).toBe(expected);
  });
});
