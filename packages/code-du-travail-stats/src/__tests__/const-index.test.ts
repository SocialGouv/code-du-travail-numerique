import { buildConstIndex } from "../const-index";
import { makeProject } from "./ast-test-helpers";

// Construit l'index des constantes string à partir d'un code en mémoire.
function index(code: string): Map<string, Set<string>> {
  const { project } = makeProject(code);
  return buildConstIndex(project.getSourceFiles()).constStringValues;
}

describe("buildConstIndex", () => {
  it("indexe une const string de module → sa valeur", () => {
    const idx = index(`const CAT = "notation_contribution";`);
    expect(idx.get("CAT")).toEqual(new Set(["notation_contribution"]));
  });

  it("indexe un template sans substitution", () => {
    const idx = index("const URL = `/api/x`;");
    expect(idx.get("URL")).toEqual(new Set(["/api/x"]));
  });

  it("ignore let et var", () => {
    const idx = index(`let A = "a"; var B = "b";`);
    expect(idx.has("A")).toBe(false);
    expect(idx.has("B")).toBe(false);
  });

  it("ignore un initialiseur non string littéral", () => {
    const idx = index(`const N = 3; const C = foo(); const T = \`x_\${y}\`;`);
    expect(idx.has("N")).toBe(false);
    expect(idx.has("C")).toBe(false);
    expect(idx.has("T")).toBe(false);
  });

  it("ignore les const locales (à l'intérieur d'une fonction)", () => {
    const idx = index(`function f() { const LOCAL = "x"; return LOCAL; }`);
    expect(idx.has("LOCAL")).toBe(false);
  });

  it("agrège les valeurs distinctes d'un même nom (ambiguïté)", () => {
    const idx = index(`const X = "a"; const X = "b";`);
    expect(idx.get("X")).toEqual(new Set(["a", "b"]));
  });
});
