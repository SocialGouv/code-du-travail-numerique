import { detectNullOrUndefinedOrNaNInArray } from "../array";

describe("detectNullOrUndefinedOrNaNInArray", () => {
  test.each`
    array                                | expected
    ${[null]}                            | ${true}
    ${[NaN]}                             | ${true}
    ${[undefined]}                       | ${true}
    ${[8]}                               | ${false}
    ${[8, null]}                         | ${true}
    ${[8, NaN]}                          | ${true}
    ${[8, undefined]}                    | ${true}
    ${[{ yo: "yo", v: 8 }]}              | ${false}
    ${[{ yo: undefined, v: 8 }]}         | ${true}
    ${[{ yo: null, v: 8 }]}              | ${true}
    ${[{ yo: NaN, v: 8 }]}               | ${true}
    ${[{ yo: { yo: "yo" }, v: 8 }]}      | ${false}
    ${[{ yo: { yo: undefined }, v: 8 }]} | ${true}
  `("should return $expected for $array", ({ array, expected }) => {
    expect(detectNullOrUndefinedOrNaNInArray(array)).toBe(expected);
  });
});
