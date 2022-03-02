import { Agreement } from "../src/conventions/Search/api/type";

export const generateAgreement = (idcc: number): Agreement => ({
  id: "TEST",
  num: idcc,
  shortTitle: "TEST",
  slug: "TEST",
  title: "TEST",
});
