// Helpers de test : construit des projets ts-morph en mémoire et fournit de quoi
// récupérer des noeuds précis de l'AST. Ce fichier N'EST PAS un suite de tests
// (pas de `.test.ts`) ; il est seulement importé par les vrais tests.

import { Project, SyntaxKind } from "ts-morph";
import type { Node, ObjectLiteralExpression, SourceFile } from "ts-morph";
import { buildEnumIndex } from "../enum-index";
import { buildCallIndex } from "../call-index";
import { createResolver } from "../value-resolver";
import type { Resolver } from "../value-resolver";

// Crée un projet ts-morph en mémoire avec un unique fichier `input.ts`.
export function makeProject(code: string): {
  project: Project;
  sf: SourceFile;
} {
  const project = new Project({ useInMemoryFileSystem: true });
  const sf = project.createSourceFile("input.ts", code);
  return { project, sf };
}

// Crée un résolveur à partir du code donné (index enum + call construits dessus).
export function makeResolver(code: string): {
  sf: SourceFile;
  resolver: Resolver;
} {
  const { project, sf } = makeProject(code);
  const files = project.getSourceFiles();
  const resolver = createResolver(buildEnumIndex(files), buildCallIndex(files));
  return { sf, resolver };
}

// Initialiseur d'une déclaration `const <name> = <expr>` (recherche récursive).
export function initOf(sf: SourceFile, name: string): Node {
  return sf.getVariableDeclarationOrThrow(name).getInitializerOrThrow();
}

// Objet littéral passé en premier argument du premier appel à `<callee>(...)`.
export function firstObjectArg(
  sf: SourceFile,
  callee: string
): ObjectLiteralExpression {
  const call = sf
    .getDescendantsOfKind(SyntaxKind.CallExpression)
    .find((c) => c.getExpression().getText() === callee);
  if (!call) throw new Error(`Aucun appel à ${callee}`);
  return call
    .getArguments()[0]
    .asKindOrThrow(SyntaxKind.ObjectLiteralExpression);
}
