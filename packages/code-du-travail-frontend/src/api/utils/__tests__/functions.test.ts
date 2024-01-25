import {
  removeUndefinedNestedValues,
  removeUndefinedValues,
} from "../functions";

describe("removeUndefinedValues", () => {
  it("should return the same object when no values are undefined", () => {
    const input = { a: 1, b: "test", c: true };
    const result = removeUndefinedValues(input);
    expect(result).toEqual(input);
  });

  it("should remove properties with undefined values", () => {
    const input = { a: 1, b: undefined, c: true };
    const expected = { a: 1, c: true };
    const result = removeUndefinedValues(input);
    expect(result).toEqual(expected);
  });

  it("should return an empty object when all properties are undefined", () => {
    const input = { a: undefined, b: undefined };
    const result = removeUndefinedValues(input);
    expect(result).toEqual({});
  });

  it("should not remove nested undefined values", () => {
    const input = { a: { b: undefined } };
    const expected = { a: { b: undefined } };
    const result = removeUndefinedValues(input);
    expect(result).toEqual(expected);
  });
});

describe("removeUndefinedNestedValues", () => {
  it("should return the same object when no values are undefined", () => {
    const input = { a: 1, b: "test", c: true, d: { e: 2 } };
    const result = removeUndefinedNestedValues(input);
    expect(result).toEqual(input);
  });

  it("should remove properties with undefined values", () => {
    const input = { a: 1, b: undefined, c: true };
    const expected = { a: 1, c: true };
    const result = removeUndefinedNestedValues(input);
    expect(result).toEqual(expected);
  });

  it("should return an empty object when all properties are undefined", () => {
    const input = { a: undefined, b: undefined };
    const result = removeUndefinedNestedValues(input);
    expect(result).toEqual({});
  });

  it("should remove nested undefined values", () => {
    const input = { a: { b: undefined } };
    const result = removeUndefinedNestedValues(input);
    expect(result).toEqual({});
  });

  it("should work", () => {
    const inputObject = {
      a: 1,
      b: undefined,
      c: {
        d: "hello",
        e: {
          f: undefined,
          g: "world",
        },
        h: undefined,
      },
      i: [1, undefined, { j: "foo", k: undefined }, 4],
    };
    const result = removeUndefinedNestedValues(inputObject);
    expect(result).toEqual({
      a: 1,
      c: { d: "hello", e: { g: "world" } },
      i: [1, { j: "foo" }, 4],
    });
  });
});
