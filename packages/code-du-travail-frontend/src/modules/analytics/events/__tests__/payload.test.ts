import { serializeEventPayload } from "../payload";

describe("serializeEventPayload", () => {
  it("renvoie toujours une chaîne non vide, même sans contexte", () => {
    expect(serializeEventPayload()).toBe("{}");
    expect(serializeEventPayload({})).toBe("{}");
  });

  // Le bug qui a motivé l'enveloppe JSON : Matomo jette les noms falsy
  // (`empty("0") === true` en PHP). 76 % des `show_accords` arrivaient sans nom,
  // et la chaîne "0" n'existait nulle part dans les rapports.
  describe("seau zéro", () => {
    it("conserve un compteur nul dans un nom non falsy", () => {
      const name = serializeEventPayload({ count: 0 });

      expect(name).toBe('{"count":0}');
      expect(name).not.toBe("0");
      expect(name).not.toBe("");
      expect(Boolean(name)).toBe(true);
      expect(JSON.parse(name).count).toBe(0);
    });

    it("distingue un compteur nul d'un compteur absent", () => {
      expect(serializeEventPayload({ count: 0 })).toBe('{"count":0}');
      expect(serializeEventPayload({ count: undefined })).toBe("{}");
    });

    it("conserve les autres valeurs falsy utiles", () => {
      expect(serializeEventPayload({ query: "", supported: false })).toBe(
        '{"query":"","supported":false}'
      );
    });
  });

  describe("clés optionnelles", () => {
    it("omet les clés undefined et null plutôt que de les rendre à null", () => {
      expect(
        serializeEventPayload({ theme: undefined, algo: null, target: "a" })
      ).toBe('{"target":"a"}');
    });
  });

  describe("ordre stable", () => {
    it("place path en tête puis trie le reste", () => {
      expect(
        serializeEventPayload({ theme: "t", path: "contribution/x", algo: "a" })
      ).toBe('{"path":"contribution/x","algo":"a","theme":"t"}');
    });

    it("produit le même nom quel que soit l'ordre de déclaration", () => {
      const a = serializeEventPayload({ b: "2", a: "1", path: "p" });
      const b = serializeEventPayload({ path: "p", a: "1", b: "2" });

      expect(a).toBe(b);
    });
  });

  describe("limite Matomo de 500 caractères", () => {
    it("raccourcit les verbatims trop longs et garde un JSON parsable", () => {
      const name = serializeEventPayload({
        path: "contribution/mon-slug",
        comment: "x".repeat(900),
      });

      expect(name.length).toBeLessThanOrEqual(500);
      expect(() => JSON.parse(name)).not.toThrow();
      expect(JSON.parse(name).path).toBe("contribution/mon-slug");
      expect(JSON.parse(name).comment).toMatch(/…$/);
    });

    it("laisse intact un payload qui tient dans la limite", () => {
      const name = serializeEventPayload({ path: "contribution/x", count: 3 });

      expect(name).toBe('{"path":"contribution/x","count":3}');
    });
  });
});
