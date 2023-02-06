import { enumToArray } from "../array";

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
