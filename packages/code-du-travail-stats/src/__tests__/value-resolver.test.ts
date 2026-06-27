import { makeResolver, initOf, firstObjectArg } from "./ast-test-helpers";
import type { Resolved } from "../events.schema";

// Résout l'initialiseur d'un `const __expr = <EXPR>;` (préfixé d'un préambule
// optionnel, ex: déclaration d'enum).
function resolveExpr(code: string): Resolved[] {
  const { sf, resolver } = makeResolver(code);
  return resolver.resolveValues(initOf(sf, "__expr"));
}

describe("resolveValues — littéraux", () => {
  it("chaîne littérale → literal", () => {
    expect(resolveExpr(`const __expr = "hello";`)).toEqual([
      { value: "hello", kind: "literal" },
    ]);
  });

  it("template sans substitution → literal", () => {
    expect(resolveExpr("const __expr = `plain`;")).toEqual([
      { value: "plain", kind: "literal" },
    ]);
  });

  it("parenthèses → déballe l'expression interne", () => {
    expect(resolveExpr(`const __expr = ("wrapped");`)).toEqual([
      { value: "wrapped", kind: "literal" },
    ]);
  });
});

describe("resolveValues — accès enum", () => {
  it("membre d'enum connu → sa valeur (literal)", () => {
    expect(
      resolveExpr(`enum Cat { OUTIL = "outil" } const __expr = Cat.OUTIL;`)
    ).toEqual([{ value: "outil", kind: "literal" }]);
  });

  it("accès non résolu → placeholder dynamic", () => {
    expect(resolveExpr(`const __expr = Foo.bar;`)).toEqual([
      { value: "<Foo.bar>", kind: "dynamic" },
    ]);
  });
});

describe("resolveValues — ternaires & concaténations", () => {
  it("ternaire → une valeur par branche", () => {
    expect(resolveExpr(`const __expr = cond ? "a" : "b";`)).toEqual([
      { value: "a", kind: "literal" },
      { value: "b", kind: "literal" },
    ]);
  });

  it("concaténation de littéraux → fusion", () => {
    expect(resolveExpr(`const __expr = "a" + "b";`)).toEqual([
      { value: "ab", kind: "literal" },
    ]);
  });

  it("concaténation avec enum → valeur résolue", () => {
    expect(
      resolveExpr(`enum C { K = "k" } const __expr = "p_" + C.K;`)
    ).toEqual([{ value: "p_k", kind: "literal" }]);
  });

  it("concaténation ternaire × littéral → produit cartésien", () => {
    expect(resolveExpr(`const __expr = (c ? "a" : "b") + "_x";`)).toEqual([
      { value: "a_x", kind: "literal" },
      { value: "b_x", kind: "literal" },
    ]);
  });

  it("opérateur binaire non-+ → dynamic", () => {
    const [r] = resolveExpr(`const __expr = 1 - 2;`);
    expect(r.kind).toBe("dynamic");
  });
});

describe("resolveValues — templates", () => {
  it("template avec substitution enum → literal résolu", () => {
    expect(
      resolveExpr('enum C { K = "k" } const __expr = `view_step_${C.K}`;')
    ).toEqual([{ value: "view_step_k", kind: "literal" }]);
  });

  it("template avec substitution dynamique → dynamic avec placeholder", () => {
    expect(resolveExpr("const __expr = `x_${y}`;")).toEqual([
      { value: "x_<y>", kind: "dynamic" },
    ]);
  });
});

describe("resolveValues — appels & inconnu", () => {
  it("appel de fonction → dynamic", () => {
    expect(resolveExpr(`const __expr = foo();`)).toEqual([
      { value: "<foo()>", kind: "dynamic" },
    ]);
  });
});

describe("resolveValues — paramètres typés enum (enum-param)", () => {
  it("paramètre typé enum sans appelant → une valeur par membre", () => {
    const code = `
      enum HomeEvent { A = "a", B = "b" }
      function build(action: HomeEvent) { sendEvent({ category: "c", action }); }
    `;
    const { sf, resolver } = makeResolver(code);
    const obj = firstObjectArg(sf, "sendEvent");
    expect(resolver.resolvePropertyValues(obj, "action")).toEqual([
      { value: "a", kind: "enum-param" },
      { value: "b", kind: "enum-param" },
    ]);
  });
});

describe("resolveValues — résolution via les appelants", () => {
  it("paramètre d'émetteur → valeurs réellement passées par les appelants", () => {
    const code = `
      function emit(action: string) { sendEvent({ category: "c", action }); }
      emit("click");
      emit("open");
    `;
    const { sf, resolver } = makeResolver(code);
    const obj = firstObjectArg(sf, "sendEvent");
    expect(resolver.resolvePropertyValues(obj, "action")).toEqual([
      { value: "click", kind: "literal" },
      { value: "open", kind: "literal" },
    ]);
  });

  it("nom de fonction ambigu (≥2 définitions) → on s'abstient (dynamic)", () => {
    const code = `
      function emit(action: string) { sendEvent({ category: "c", action }); }
      function emit(action: string) { return action; }
      emit("x");
    `;
    const { sf, resolver } = makeResolver(code);
    const obj = firstObjectArg(sf, "sendEvent");
    expect(resolver.resolvePropertyValues(obj, "action")).toEqual([
      { value: "<action>", kind: "dynamic" },
    ]);
  });
});

describe("resolvePropertyValues", () => {
  it("propriété littérale présente", () => {
    const { sf, resolver } = makeResolver(`sendEvent({ category: "outil" });`);
    const obj = firstObjectArg(sf, "sendEvent");
    expect(resolver.resolvePropertyValues(obj, "category")).toEqual([
      { value: "outil", kind: "literal" },
    ]);
  });

  it("propriété absente → null", () => {
    const { sf, resolver } = makeResolver(`sendEvent({ category: "outil" });`);
    const obj = firstObjectArg(sf, "sendEvent");
    expect(resolver.resolvePropertyValues(obj, "action")).toBeNull();
  });
});

describe("resolveNamePattern", () => {
  it("name littéral", () => {
    const { sf, resolver } = makeResolver(
      `sendEvent({ category: "c", action: "a", name: "n" });`
    );
    expect(resolver.resolveNamePattern(firstObjectArg(sf, "sendEvent"))).toBe(
      "n"
    );
  });

  it("name = membre d'enum → valeur résolue (sans expansion)", () => {
    const { sf, resolver } = makeResolver(
      `enum C { K = "k" } sendEvent({ category: "c", action: "a", name: C.K });`
    );
    expect(resolver.resolveNamePattern(firstObjectArg(sf, "sendEvent"))).toBe(
      "k"
    );
  });

  it("name = template → motif résolu", () => {
    const { sf, resolver } = makeResolver(
      'enum C { K = "k" } sendEvent({ category: "c", action: "a", name: `n_${C.K}` });'
    );
    expect(resolver.resolveNamePattern(firstObjectArg(sf, "sendEvent"))).toBe(
      "n_k"
    );
  });

  it("name absent → null", () => {
    const { sf, resolver } = makeResolver(
      `sendEvent({ category: "c", action: "a" });`
    );
    expect(
      resolver.resolveNamePattern(firstObjectArg(sf, "sendEvent"))
    ).toBeNull();
  });

  it("name dynamique → placeholder", () => {
    const { sf, resolver } = makeResolver(
      `sendEvent({ category: "c", action: "a", name: Foo.bar });`
    );
    expect(resolver.resolveNamePattern(firstObjectArg(sf, "sendEvent"))).toBe(
      "<Foo.bar>"
    );
  });
});
