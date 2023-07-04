import { Agreement } from "@socialgouv/cdtn-utils";

export const generateAgreement = (idcc: number): Agreement => ({
  id: "TEST",
  num: idcc,
  shortTitle: "TEST",
  slug: "TEST",
  title: "TEST",
});
