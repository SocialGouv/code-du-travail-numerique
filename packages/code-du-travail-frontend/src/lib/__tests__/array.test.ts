import { deepMergeArray, detectNullOrUndefinedOrNaNInArray } from "../array";

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

  test.each`
    array1                                                          | array2                                                  | key        | expected
    ${[{ month: "a", value: undefined }]}                           | ${[{ month: "a", value: 2 }]}                           | ${"month"} | ${[{ month: "a", value: 2 }]}
    ${[{ month: "a", value: undefined }, { month: "b", value: 3 }]} | ${[{ month: "a", value: 2 }]}                           | ${"month"} | ${[{ month: "a", value: 2 }, { month: "b", value: 3 }]}
    ${[{ month: "a", value: undefined }, { month: "b", value: 4 }]} | ${[{ month: "a", value: 2 }, { month: "b", value: 5 }]} | ${"month"} | ${[{ month: "a", value: 2 }, { month: "b", value: 5 }]}
  `(
    "should return $expected for $array1 and $array2 with key $key",
    ({ array1, array2, key, expected }) => {
      expect(deepMergeArray(array1, array2, key)).toEqual(expected);
    }
  );
});
