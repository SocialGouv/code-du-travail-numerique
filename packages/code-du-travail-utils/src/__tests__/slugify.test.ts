import { slugify } from "../slugify";

test("slugify", () => {
  expect(slugify("pif paf")).toBe("pif-paf");
  expect(slugify("pif   paf")).toBe("pif-paf");
  expect(slugify("   pif   paf   ")).toBe("pif-paf");
  expect(slugify("Pif PAF")).toBe("pif-paf");
  expect(slugify("oaïstar")).toBe("oaistar");
  expect(slugify("oa(ï)star")).toBe("oa-i-star");
  expect(slugify("oaïstar!")).toBe("oaistar");
  expect(slugify("plic&ploc")).toBe("plic-et-ploc");
  expect(slugify("--plic-ploc---")).toBe("plic-ploc");
});
