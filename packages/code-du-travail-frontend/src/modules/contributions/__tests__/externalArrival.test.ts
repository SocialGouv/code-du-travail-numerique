import {
  isExternalArrival,
  resetExternalArrivalForTests,
} from "../externalArrival";
import { AGREEMENT_FOCUS_HASH } from "../contributionUtils";

const CURRENT_PATH = "/contribution/675-la-periode-dessai";
const CURRENT_URL = `http://localhost${CURRENT_PATH}`;

const setNavigationEntry = (
  entry?: Partial<PerformanceNavigationTiming> | undefined
) => {
  Object.defineProperty(window.performance, "getEntriesByType", {
    configurable: true,
    writable: true,
    value: jest.fn(() => (entry ? [entry] : [])),
  });
};

const setReferrer = (referrer: string) => {
  Object.defineProperty(document, "referrer", {
    configurable: true,
    value: referrer,
  });
};

describe("isExternalArrival", () => {
  beforeEach(() => {
    resetExternalArrivalForTests();
    window.history.pushState({}, "", CURRENT_PATH);
    setNavigationEntry({ name: CURRENT_URL, type: "navigate" });
    setReferrer("");
  });

  afterEach(() => {
    window.location.hash = "";
  });

  it("détecte un accès direct (referrer vide)", () => {
    expect(isExternalArrival()).toBe(true);
  });

  it("détecte une arrivée depuis un autre site (moteur de recherche)", () => {
    setReferrer("https://www.google.com/");
    expect(isExternalArrival()).toBe(true);
  });

  it("ignore une arrivée depuis le site lui-même (navigation interne complète)", () => {
    setReferrer(`http://localhost/contribution/la-periode-dessai`);
    expect(isExternalArrival()).toBe(false);
  });

  it("ne se déclenche qu'une seule fois par chargement de document", () => {
    expect(isExternalArrival()).toBe(true);
    expect(isExternalArrival()).toBe(false);
  });

  it("ignore les pages atteintes par navigation SPA (URL différente du chargement initial)", () => {
    setNavigationEntry({ name: "http://localhost/", type: "navigate" });
    expect(isExternalArrival()).toBe(false);
  });

  it("ignore un retour via l'historique (back_forward)", () => {
    setNavigationEntry({ name: CURRENT_URL, type: "back_forward" });
    setReferrer("https://www.google.com/");
    expect(isExternalArrival()).toBe(false);
  });

  it("ignore une arrivée via le formulaire de la fiche générique (hash de focus)", () => {
    window.location.hash = AGREEMENT_FOCUS_HASH;
    expect(isExternalArrival()).toBe(false);
  });

  it("retombe sur le comportement historique quand l'API de navigation est absente", () => {
    Object.defineProperty(window.performance, "getEntriesByType", {
      configurable: true,
      writable: true,
      value: undefined,
    });
    expect(isExternalArrival()).toBe(false);
  });

  it("retombe sur le comportement historique sans entrée de navigation", () => {
    setNavigationEntry(undefined);
    expect(isExternalArrival()).toBe(false);
  });
});
