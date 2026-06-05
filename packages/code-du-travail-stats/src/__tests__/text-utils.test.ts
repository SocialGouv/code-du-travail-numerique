import { compact, worstKind, dedupResolved } from "../text-utils";
import type { Resolved } from "../events.schema";

describe("compact", () => {
  it("réduit les espaces multiples et les sauts de ligne en un seul espace", () => {
    expect(compact("a\n  b\t c")).toBe("a b c");
  });

  it("trim les bords", () => {
    expect(compact("  hello  ")).toBe("hello");
  });

  it("laisse une chaîne déjà compacte inchangée", () => {
    expect(compact("view_step_1")).toBe("view_step_1");
  });
});

describe("worstKind", () => {
  it("renvoie literal quand tout est literal", () => {
    expect(worstKind(["literal", "literal"])).toBe("literal");
  });

  it("renvoie enum-param si présent et pas de dynamic", () => {
    expect(worstKind(["literal", "enum-param"])).toBe("enum-param");
  });

  it("dynamic l'emporte sur tout", () => {
    expect(worstKind(["literal", "enum-param", "dynamic"])).toBe("dynamic");
  });

  it("renvoie literal sur une liste vide", () => {
    expect(worstKind([])).toBe("literal");
  });
});

describe("dedupResolved", () => {
  it("garde la première provenance pour une valeur dupliquée", () => {
    const input: Resolved[] = [
      { value: "click", kind: "literal" },
      { value: "click", kind: "dynamic" },
      { value: "open", kind: "enum-param" },
    ];
    expect(dedupResolved(input)).toEqual([
      { value: "click", kind: "literal" },
      { value: "open", kind: "enum-param" },
    ]);
  });

  it("renvoie une liste vide pour une entrée vide", () => {
    expect(dedupResolved([])).toEqual([]);
  });
});
