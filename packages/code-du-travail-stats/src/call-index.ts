// Index des appels et définitions de fonctions, par nom. Permet de résoudre la
// valeur RÉELLEMENT passée à un paramètre d'émetteur (cross-fichiers), de façon
// purement syntaxique (pas de type-checker).

import { Node } from "ts-morph";
import type { SourceFile } from "ts-morph";

export type CallIndex = {
  // "nom de fonction appelée" -> CallExpressions correspondantes
  callsByName: Map<string, Node[]>;
  // "nom de fonction" -> nombre de définitions (>1 = nom ambigu, non résolu)
  defsByName: Map<string, number>;
};

export function buildCallIndex(sourceFiles: SourceFile[]): CallIndex {
  const callsByName = new Map<string, Node[]>();
  // Nombre de définitions par nom de fonction : si un nom est ambigu (≥2
  // définitions, ex: deux `emitSelectEvent`), on NE résout PAS via les appelants
  // pour éviter de mélanger les call sites de fonctions homonymes.
  const defsByName = new Map<string, number>();
  const bumpDef = (nm: string | null | undefined) => {
    if (nm) defsByName.set(nm, (defsByName.get(nm) ?? 0) + 1);
  };
  for (const sf of sourceFiles) {
    sf.forEachDescendant((n) => {
      if (Node.isCallExpression(n)) {
        const callee = n.getExpression();
        let nm: string | null = null;
        if (Node.isIdentifier(callee)) nm = callee.getText();
        else if (Node.isPropertyAccessExpression(callee)) nm = callee.getName();
        if (nm) {
          const arr = callsByName.get(nm);
          if (arr) arr.push(n);
          else callsByName.set(nm, [n]);
        }
        return;
      }
      if (Node.isFunctionDeclaration(n)) bumpDef(n.getName());
      else if (Node.isVariableDeclaration(n)) {
        const init = n.getInitializer();
        if (
          init &&
          (Node.isArrowFunction(init) || Node.isFunctionExpression(init))
        )
          bumpDef(n.getName());
      }
    });
  }
  return { callsByName, defsByName };
}
