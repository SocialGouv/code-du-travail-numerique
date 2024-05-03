import { Agreement } from "../src/outils/types";

export const generateAgreement = (idcc: number): Agreement => ({
  id: "TEST",
  num: idcc,
  shortTitle: "TEST",
  slug: "TEST",
  title: "TEST",
  contributions: false,
});
