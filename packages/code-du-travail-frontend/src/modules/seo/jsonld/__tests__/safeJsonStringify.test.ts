import { safeJsonStringify } from "../safeJsonStringify";

describe("safeJsonStringify()", () => {
  it("escapes characters that could break out of a <script> tag", () => {
    expect(safeJsonStringify({ a: "</script><script>alert(1)</script>" })).toBe(
      JSON.stringify({ a: "</script><script>alert(1)</script>" })
        .replace(/</g, "\\u003c")
        .replace(/>/g, "\\u003e")
        .replace(/&/g, "\\u0026")
        .replace(/\u2028/g, "\\u2028")
        .replace(/\u2029/g, "\\u2029")
    );
  });
});
