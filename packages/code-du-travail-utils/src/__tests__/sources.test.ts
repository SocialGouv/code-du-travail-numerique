import {
  SOURCES,
  routeBySource,
  labelBySource,
  getLabelBySource,
  getRouteBySource,
  getSourceByRoute,
} from "../sources";

describe("sources utilities", () => {
  it("getLabelBySource retourne le bon libellé pour quelques sources clés", () => {
    expect(getLabelBySource(SOURCES.CCN)).toBe("Conventions collectives");
    expect(getLabelBySource(SOURCES.CDT)).toBe("Code du travail");
    expect(getLabelBySource(SOURCES.GLOSSARY)).toBe("Glossaire");
    expect(getLabelBySource(SOURCES.TOOLS)).toBe("Outils");
    expect(getLabelBySource(SOURCES.INFOGRAPHICS)).toBe("Infographies");
  });

  it("getRouteBySource retourne la bonne route pour quelques sources clés", () => {
    expect(getRouteBySource(SOURCES.CCN)).toBe("convention-collective");
    expect(getRouteBySource(SOURCES.CDT)).toBe("code-du-travail");
    expect(getRouteBySource(SOURCES.GLOSSARY)).toBe("glossaire");
    expect(getRouteBySource(SOURCES.TOOLS)).toBe("outils");
    expect(getRouteBySource(SOURCES.INFOGRAPHICS)).toBe("infographies");
  });

  it("getSourceByRoute retourne une source existante pour chaque route connue", () => {
    const allRoutes = Object.values(routeBySource);

    for (const route of allRoutes) {
      const source = getSourceByRoute(route);
      expect(typeof source).toBe("string");
      // Toutes les clés de routeBySource sont des valeurs de SOURCES
      // donc on vérifie que la source retournée fait bien partie des valeurs de SOURCES
      expect(Object.values(SOURCES)).toContain(source);
    }
  });

  it("getSourceByRoute gère le cas de route ambiguë (même slug pour plusieurs sources)", () => {
    // Les deux sources suivantes pointent vers "fiche-ministere-travail"
    const ambiguousRoute = "fiche-ministere-travail";
    const result = getSourceByRoute(ambiguousRoute);
    // Le résultat peut être l'une des deux, suivant l'ordre de définition dans routeBySource
    expect([SOURCES.SHEET_MT, SOURCES.SHEET_MT_PAGE]).toContain(result);
  });

  it("getSourceByRoute retourne undefined pour une route inconnue", () => {
    expect(getSourceByRoute("route-inconnue-xyz")).toBeUndefined();
  });

  it("toutes les valeurs de SOURCES existent comme clés dans routeBySource et labelBySource", () => {
    const sourceValues = Object.values(SOURCES);
    const routeKeys = Object.keys(routeBySource);
    const labelKeys = Object.keys(labelBySource);

    // Chaque valeur de SOURCES doit exister dans les deux maps
    for (const src of sourceValues) {
      expect(routeKeys).toContain(src);
      expect(labelKeys).toContain(src);
    }
  });

  it("routeBySource et labelBySource ne contiennent pas de clés supplémentaires non référencées par SOURCES", () => {
    const sourceValues = new Set(Object.values(SOURCES));
    const extraInRoute = Object.keys(routeBySource).filter(
      (k) =>
        !sourceValues.has(
          k as unknown as (typeof SOURCES)[keyof typeof SOURCES]
        )
    );
    const extraInLabel = Object.keys(labelBySource).filter(
      (k) =>
        !sourceValues.has(
          k as unknown as (typeof SOURCES)[keyof typeof SOURCES]
        )
    );

    expect(extraInRoute).toHaveLength(0);
    expect(extraInLabel).toHaveLength(0);
  });

  it("cohérence de mapping: getRouteBySource(src) doit matcher le slug qui renvoie src avec getSourceByRoute", () => {
    for (const src of Object.values(SOURCES)) {
      const slug = getRouteBySource(src as keyof typeof routeBySource);
      // Certaines sources partagent la même route; dans ce cas, on vérifie
      // simplement que la route renvoie une source valide (pas nécessairement la même)
      const back = getSourceByRoute(slug);
      expect(Object.values(SOURCES)).toContain(back);
    }
  });
});
