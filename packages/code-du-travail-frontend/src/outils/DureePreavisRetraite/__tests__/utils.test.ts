import { formatSeniority } from "../steps/utils";

test("should format seniority to avoid failing in publicodes", () => {
  expect(formatSeniority("4")).toBe("4");
  expect(formatSeniority("03")).toBe("3");
  expect(formatSeniority("ab")).toBe("0");
});
