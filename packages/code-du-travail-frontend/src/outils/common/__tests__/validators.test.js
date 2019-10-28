import { required, requiredBoolean, isNumber } from "../validators";

describe("required", () => {
  it("should return undefined if an input value is provided", () => {
    expect(required()).toMatchInlineSnapshot(`"Ce champ est requis"`);
    expect(required(true)).toMatchInlineSnapshot(`undefined`);
    expect(required(1)).toMatchInlineSnapshot(`undefined`);
    expect(required("test")).toMatchInlineSnapshot(`undefined`);
  });
});

describe("requiredBoolean", () => {
  it("should return undefined if an input value is provided", () => {
    expect(requiredBoolean()).toMatchInlineSnapshot(`"Ce champ est requis"`);
    expect(requiredBoolean("test")).toMatchInlineSnapshot(
      `"Ce champ est requis"`
    );
    expect(requiredBoolean(false)).toMatchInlineSnapshot(`undefined`);
    expect(requiredBoolean(true)).toMatchInlineSnapshot(`undefined`);
  });
});

describe("isNumber", () => {
  it("should return undefined if an input value is provided", () => {
    expect(isNumber()).toMatchInlineSnapshot(`"Un nombre est attendu"`);
    expect(isNumber("abec")).toMatchInlineSnapshot(`"Un nombre est attendu"`);
    expect(isNumber(0)).toMatchInlineSnapshot(`undefined`);
    expect(isNumber(1200)).toMatchInlineSnapshot(`undefined`);
  });
});
