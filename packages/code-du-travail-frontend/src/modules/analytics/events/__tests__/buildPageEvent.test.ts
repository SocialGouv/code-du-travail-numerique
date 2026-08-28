import { buildPageEvent } from "../buildPageEvent";
import { PageCategory } from "../categories";
import { EVENT_ACTIONS, rateContentAction, submitNpsAction } from "../actions";

describe("EVENT_ACTIONS", () => {
  it("reste très en deçà du plafond de troncature Matomo (500 lignes)", () => {
    expect(EVENT_ACTIONS.length).toBeLessThan(500);
  });

  it("n'a aucun doublon", () => {
    expect(new Set(EVENT_ACTIONS).size).toBe(EVENT_ACTIONS.length);
  });

  // Accents et espaces se retrouvaient encodés dans les URLs de tracking et les
  // exports CSV de l'ancien schéma (`Clarté_questions`, `view_step_Indemnité…`).
  it("n'utilise que du snake_case ASCII", () => {
    EVENT_ACTIONS.forEach((action) => {
      expect(action).toMatch(/^[a-z0-9]+(_[a-z0-9]+)*$/);
    });
  });
});

describe("rateContentAction / submitNpsAction", () => {
  it("produit une action du catalogue", () => {
    expect(rateContentAction(3)).toBe("rate_content_3");
    expect(submitNpsAction(0)).toBe("submit_nps_0");
    expect(submitNpsAction(10)).toBe("submit_nps_10");
  });

  // Fabriquer une action hors catalogue ferait échouer le drift-check CI sans
  // qu'on sache d'où elle vient.
  it("refuse une note hors bornes plutôt que d'inventer une action", () => {
    expect(() => rateContentAction(0)).toThrow(RangeError);
    expect(() => rateContentAction(6)).toThrow(RangeError);
    expect(() => submitNpsAction(11)).toThrow(RangeError);
    expect(() => submitNpsAction(-1)).toThrow(RangeError);
  });
});

describe("buildPageEvent", () => {
  it("construit le triplet normalisé", () => {
    expect(
      buildPageEvent({
        category: PageCategory.CONTRIBUTION,
        action: "click_theme_tag",
        payload: { path: "contribution/mon-slug", theme: "themes/conges" },
      })
    ).toEqual({
      category: "contribution",
      action: "click_theme_tag",
      name: '{"path":"contribution/mon-slug","theme":"themes/conges"}',
    });
  });

  it("renseigne toujours name, même sans payload", () => {
    const event = buildPageEvent({
      category: PageCategory.HOME,
      action: "click_phone_number",
    });

    expect(event.name).toBe("{}");
    expect(Boolean(event.name)).toBe(true);
  });

  describe("value", () => {
    it("est reportée quand elle a du sens", () => {
      expect(
        buildPageEvent({
          category: PageCategory.OUTIL,
          action: "show_enterprise_agreements",
          payload: { count: 4 },
          value: 4,
        }).value
      ).toBe(4);
    });

    it("reste absente quand elle n'est pas fournie", () => {
      expect(
        buildPageEvent({
          category: PageCategory.OUTIL,
          action: "view_step",
        }).value
      ).toBeUndefined();
    });

    // Matomo ne conserve pas une value de 0 (matomo-org/matomo#11204). Le
    // payload doit donc toujours porter l'information, value n'étant qu'un
    // doublon d'agrégation.
    it("n'est jamais le seul porteur d'un compteur nul", () => {
      const event = buildPageEvent({
        category: PageCategory.CONVENTION_COLLECTIVE,
        action: "show_enterprise_accords",
        payload: { count: 0, siret: "12345678900011" },
        value: 0,
      });

      expect(JSON.parse(event.name).count).toBe(0);
      expect(event.name).not.toBe("0");
    });
  });
});
