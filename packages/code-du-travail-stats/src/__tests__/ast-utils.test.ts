import { SyntaxKind } from "ts-morph";
import type { Node } from "ts-morph";
import {
  findContainingFunctionName,
  functionNameOf,
  getEnumRefs,
} from "../ast-utils";
import { makeProject, firstObjectArg } from "./ast-test-helpers";

// Premier appel à `foo()` du fichier (sert de noeud "profond" pour les tests).
function fooCall(code: string): Node {
  const { sf } = makeProject(code);
  return sf
    .getDescendantsOfKind(SyntaxKind.CallExpression)
    .find((c) => c.getExpression().getText() === "foo")!;
}

describe("findContainingFunctionName", () => {
  it("trouve le nom d'une arrow assignée à une const", () => {
    expect(
      findContainingFunctionName(fooCall("const handler = () => { foo(); };"))
    ).toBe("handler");
  });

  it("trouve le nom d'une déclaration de fonction", () => {
    expect(
      findContainingFunctionName(fooCall("function doThing() { foo(); }"))
    ).toBe("doThing");
  });

  it("trouve le nom d'une arrow en property assignment", () => {
    expect(
      findContainingFunctionName(
        fooCall("const o = { onClick: () => { foo(); } };")
      )
    ).toBe("onClick");
  });

  it("renvoie null hors de toute fonction", () => {
    expect(findContainingFunctionName(fooCall("foo();"))).toBeNull();
  });
});

describe("functionNameOf", () => {
  it("nomme une déclaration de fonction", () => {
    const { sf } = makeProject("function f() {}");
    const fn = sf.getFunctionOrThrow("f");
    expect(functionNameOf(fn)).toBe("f");
  });

  it("nomme une arrow assignée à une const", () => {
    const { sf } = makeProject("const g = () => {};");
    const arrow = sf.getDescendantsOfKind(SyntaxKind.ArrowFunction)[0];
    expect(functionNameOf(arrow)).toBe("g");
  });

  it("renvoie null pour une arrow anonyme", () => {
    const { sf } = makeProject("[].map(() => {});");
    const arrow = sf.getDescendantsOfKind(SyntaxKind.ArrowFunction)[0];
    expect(functionNameOf(arrow)).toBeNull();
  });
});

describe("getEnumRefs", () => {
  it("collecte les références Enum.Member, triées et dédupliquées", () => {
    const { sf } = makeProject(
      `foo({ a: Cat.OUTIL, b: Action.CLICK, c: Cat.OUTIL });`
    );
    expect(getEnumRefs(firstObjectArg(sf, "foo"))).toEqual([
      "Action.CLICK",
      "Cat.OUTIL",
    ]);
  });

  it("ignore les accès qui ne ressemblent pas à un membre d'enum", () => {
    const { sf } = makeProject(`foo({ a: obj.prop, b: "x" });`);
    expect(getEnumRefs(firstObjectArg(sf, "foo"))).toEqual([]);
  });
});
