import { isHTML } from "..";

describe("isHtml", () => {
  it.each`
    string                        | expected
    ${"Testing"}                  | ${false}
    ${"<p>Testing</p>"}           | ${true}
    ${'<img src="hello.jpg">'}    | ${true}
    ${"My <p>Testing</p> string"} | ${true}
    ${"<>"}                       | ${false}
    ${"<br>"}                     | ${true}
  `("should return $expected for this $string", ({ string, expected }) => {
    expect(isHTML(string)).toBe(expected);
  });
});
