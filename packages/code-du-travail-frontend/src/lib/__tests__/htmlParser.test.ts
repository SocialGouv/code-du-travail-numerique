import { htmlParser } from "..";

describe("htmlParser", () => {
  test.each`
    input                                        | expected
    ${"<button>hello</button>"}                  | ${""}
    ${'<div class=".oembed-source">hello</div>'} | ${""}
  `("should return $expected for $input", ({ input, expected }) => {
    expect(htmlParser(input)).toBe(expected);
  });
});
