import { buildEnumIndex } from "../enum-index";
import { makeProject } from "./ast-test-helpers";

describe("buildEnumIndex", () => {
  it("indexe les membres d'enum string par Enum.Member et par nom", () => {
    const { project } = makeProject(
      `enum Cat { OUTIL = "outil", HOME = "home" }`
    );
    const { enumMap, enumMembersByName } = buildEnumIndex(
      project.getSourceFiles()
    );
    expect(enumMap.get("Cat.OUTIL")).toBe("outil");
    expect(enumMap.get("Cat.HOME")).toBe("home");
    expect(enumMembersByName.get("Cat")).toEqual(["outil", "home"]);
  });

  it("ignore les membres d'enum numériques (non résolubles en valeur d'event)", () => {
    const { project } = makeProject(`enum N { A = 1, B = 2 }`);
    const { enumMap, enumMembersByName } = buildEnumIndex(
      project.getSourceFiles()
    );
    expect(enumMap.size).toBe(0);
    expect(enumMembersByName.has("N")).toBe(false);
  });

  it("agrège plusieurs enums", () => {
    const { project } = makeProject(`enum A { X = "x" } enum B { Y = "y" }`);
    const { enumMembersByName } = buildEnumIndex(project.getSourceFiles());
    expect([...enumMembersByName.keys()].sort()).toEqual(["A", "B"]);
  });
});
