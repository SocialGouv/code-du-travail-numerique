import { buildCallIndex } from "../call-index";
import { makeProject } from "./ast-test-helpers";

describe("buildCallIndex", () => {
  it("indexe les appels par nom de callee (identifiant et accès membre)", () => {
    const { project } = makeProject(`emit("a"); emit("b"); obj.track("c");`);
    const { callsByName } = buildCallIndex(project.getSourceFiles());
    expect(callsByName.get("emit")?.length).toBe(2);
    expect(callsByName.get("track")?.length).toBe(1);
  });

  it("compte les définitions de fonction (déclaration et arrow const)", () => {
    const { project } = makeProject(
      `function f() {} const g = () => {}; const h = 3;`
    );
    const { defsByName } = buildCallIndex(project.getSourceFiles());
    expect(defsByName.get("f")).toBe(1);
    expect(defsByName.get("g")).toBe(1);
    expect(defsByName.has("h")).toBe(false);
  });

  it("détecte les noms de fonction ambigus (≥2 définitions)", () => {
    const { project } = makeProject(`function dup() {} const dup = () => {};`);
    const { defsByName } = buildCallIndex(project.getSourceFiles());
    expect(defsByName.get("dup")).toBe(2);
  });
});
