import { Agreement } from "src/modules/outils/indemnite-depart/types";
import {
  isNoConventionCollective,
  NO_CONVENTION_COLLECTIVE_IDCC,
  splitNoConventionCollective,
} from "../noConventionCollective";

const officialA: Agreement = {
  num: 5021,
  id: "5021",
  shortTitle: "CC A",
  title: "CC A",
  contributions: true,
};
const officialB: Agreement = {
  num: 3228,
  id: "3228",
  shortTitle: "CC B",
  title: "CC B",
  contributions: true,
};
const sentinel: Agreement = {
  num: NO_CONVENTION_COLLECTIVE_IDCC,
  id: "9999",
  shortTitle: "___Sans convention collective___",
  title: "___Sans convention collective___",
  contributions: false,
};

describe("isNoConventionCollective", () => {
  it("détecte la sentinelle 9999", () => {
    expect(isNoConventionCollective(sentinel)).toBe(true);
  });

  it("ne traite pas une convention officielle comme sentinelle", () => {
    expect(isNoConventionCollective(officialA)).toBe(false);
  });

  it("ne traite pas la convention 9998 comme sentinelle", () => {
    expect(isNoConventionCollective({ num: 9998 })).toBe(false);
  });
});

describe("splitNoConventionCollective", () => {
  it("aucune convention => liste vide, drapeau faux", () => {
    expect(splitNoConventionCollective([])).toEqual({
      conventions: [],
      hasEstablishmentWithoutConvention: false,
    });
  });

  it("uniquement la sentinelle => liste vide, drapeau vrai", () => {
    expect(splitNoConventionCollective([sentinel])).toEqual({
      conventions: [],
      hasEstablishmentWithoutConvention: true,
    });
  });

  it("conventions officielles + sentinelle => sentinelle retirée, drapeau vrai", () => {
    expect(
      splitNoConventionCollective([officialA, sentinel, officialB])
    ).toEqual({
      conventions: [officialA, officialB],
      hasEstablishmentWithoutConvention: true,
    });
  });

  it("uniquement des conventions officielles => liste inchangée, drapeau faux", () => {
    expect(splitNoConventionCollective([officialA, officialB])).toEqual({
      conventions: [officialA, officialB],
      hasEstablishmentWithoutConvention: false,
    });
  });
});
