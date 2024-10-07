import { isNumber, required, requiredBoolean } from "../validators";

describe("required", () => {
  it("should return undefined if an input value is provided", () => {
    expect(required()).toMatchInlineSnapshot(
      `"Vous devez répondre à cette question"`,
    );
    expect(required(true)).toMatchInlineSnapshot(`undefined`);
    expect(required(1)).toMatchInlineSnapshot(`undefined`);
    expect(required("test")).toMatchInlineSnapshot(`undefined`);
  });
});

describe("requiredBoolean", () => {
  it("should return undefined if an input value is provided", () => {
    expect(requiredBoolean()).toMatchInlineSnapshot(
      `"Vous devez répondre à cette question"`,
    );
    expect(requiredBoolean("test")).toMatchInlineSnapshot(
      `"Vous devez répondre à cette question"`,
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
