import { cleanProps, getFlavor } from "../flavors";

describe("flavors", () => {
  test("getFlavors should return nothing", () => {
    expect(getFlavor({})).toMatch("");
  });
  test("getFlavors should return nothing", () => {
    expect(getFlavor({ primary: true })).toMatch("btn__primary");
  });
  test("getFlavors should return nothing", () => {
    expect(getFlavor({ primary: true, secondary: true })).toMatch(
      "btn__primary"
    );
  });
  test("cleanProps should return nothing", () => {
    expect(cleanProps({ primary: true, foo: "bar" })).toMatchObject({
      foo: "bar"
    });
  });
  test("cleanProps should return nothing", () => {
    expect(cleanProps({ foo: "bar" })).toMatchObject({
      foo: "bar"
    });
  });
});
