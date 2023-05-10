import { enumToArray, mergeTwoArray } from "../array";

test("should convert enum to array", () => {
  enum MyEnum {
    A = "a",
    B = "b",
  }

  expect(enumToArray(MyEnum)).toEqual([
    { label: "A", value: "a" },
    { label: "B", value: "b" },
  ]);
});

describe("Merge two arrays", () => {
  const data1 = { key1: "value1" };
  const data1Bis = { key1: "value11" };
  const data2 = { key2: "value2" };
  const data2Bis = { key2: "value22" };
  test("two empty arrays", () => {
    expect(mergeTwoArray([], [])).toEqual([]);
  });

  test("left array not empty, right array empty", () => {
    expect(mergeTwoArray([data1], [])).toEqual([data1]);
  });

  test("left array empty, right array not empty", () => {
    expect(mergeTwoArray([], [data1])).toEqual([data1]);
  });

  test("left and right array has same content", () => {
    expect(mergeTwoArray([data1], [data1])).toEqual([data1]);
    expect(mergeTwoArray([data1, data2], [data1, data2])).toEqual([
      data1,
      data2,
    ]);
  });

  test("right has same key with updated content", () => {
    expect(mergeTwoArray([data1], [data1Bis])).toEqual([data1Bis]);
    expect(mergeTwoArray([data1, data2], [data1Bis, data2Bis])).toEqual([
      data1Bis,
      data2Bis,
    ]);
  });
});
