/** @jest-environment jsdom */
import { hasClosedNps, markNpsClosed } from "../persistence";
import {
  NPS_CLOSED_COOKIE_MAX_AGE_DAYS,
  NPS_CLOSED_COOKIE_NAME,
  NPS_OPTOUT_COOKIE_NAME,
} from "../constants";

// On remplace `document.cookie` par un bac à cookies contrôlé : la lecture de
// `document.cookie` ne renvoie jamais les attributs (max-age…), on espionne donc
// aussi les écritures brutes pour les vérifier. Propriété « propre » supprimée en
// afterEach pour restaurer l'accessor jsdom hérité du prototype.
describe("persistence NPS — cookie de fermeture « simple » (cdtn-nps-closed)", () => {
  let jar: Record<string, string>;
  let writes: string[];

  beforeEach(() => {
    jar = {};
    writes = [];
    Object.defineProperty(document, "cookie", {
      configurable: true,
      get: () =>
        Object.entries(jar)
          .map(([name, value]) => `${name}=${value}`)
          .join("; "),
      set: (raw: string) => {
        writes.push(raw);
        const [pair] = raw.split(";");
        const eq = pair.indexOf("=");
        const name = pair.slice(0, eq).trim();
        const value = pair.slice(eq + 1).trim();
        // max-age=0 → suppression, comme un navigateur.
        if (/max-age=0(?!\d)/.test(raw)) delete jar[name];
        else jar[name] = value;
      },
    });
  });

  afterEach(() => {
    delete (document as { cookie?: unknown }).cookie;
  });

  it("markNpsClosed pose le cookie cdtn-nps-closed avec max-age = 1 jour", () => {
    markNpsClosed();
    expect(writes).toHaveLength(1);
    const raw = writes[0];
    expect(raw).toContain(`${NPS_CLOSED_COOKIE_NAME}=1`);
    expect(raw).toContain(
      `max-age=${NPS_CLOSED_COOKIE_MAX_AGE_DAYS * 24 * 60 * 60}`
    );
    expect(raw).toContain("path=/");
    expect(raw).toContain("SameSite=Lax");
  });

  it("hasClosedNps relit le cookie posé par markNpsClosed", () => {
    expect(hasClosedNps()).toBe(false);
    markNpsClosed();
    expect(hasClosedNps()).toBe(true);
  });

  it("hasClosedNps ne renvoie pas de faux positif sur un cookie à préfixe partagé", () => {
    // cdtn-nps-optout partage le préfixe « cdtn-nps- » : la comparaison stricte du
    // nom doit l'ignorer (le simple close et l'opt-out sont deux états distincts).
    jar[NPS_OPTOUT_COOKIE_NAME] = "1";
    expect(hasClosedNps()).toBe(false);
  });
});
