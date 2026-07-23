// Helpers ts-morph purs (fonctions d'un Node vers une donnée), sans état ni IO.

import { Node } from "ts-morph";
import type { ObjectLiteralExpression } from "ts-morph";

// Nom de la fonction/variable englobant un appel (pour retrouver l'émetteur).
export function findContainingFunctionName(node: Node): string | null {
  let cur: Node | undefined = node.getParent();
  while (cur) {
    if (Node.isArrowFunction(cur) || Node.isFunctionExpression(cur)) {
      const parent = cur.getParent();
      if (Node.isVariableDeclaration(parent)) return parent.getName();
      if (Node.isPropertyAssignment(parent)) return parent.getName();
    }
    if (Node.isFunctionDeclaration(cur)) {
      const name = cur.getName();
      if (name) return name;
    }
    cur = cur.getParent();
  }
  return null;
}

// Nom d'une fonction donnée par son noeud de déclaration/initialiseur.
export function functionNameOf(fn: Node): string | null {
  if (Node.isFunctionDeclaration(fn)) return fn.getName() ?? null;
  const parent = fn.getParent();
  if (Node.isVariableDeclaration(parent)) return parent.getName();
  if (Node.isPropertyAssignment(parent)) return parent.getName();
  return null;
}

// Références d'enums (`EnumName.MEMBER`) utilisées dans un objet event, triées.
export function getEnumRefs(obj: ObjectLiteralExpression): string[] {
  const refs = new Set<string>();
  obj.forEachDescendant((d) => {
    if (Node.isPropertyAccessExpression(d)) {
      const text = d.getText();
      if (/^[A-Z][A-Za-z0-9]*\.[A-Za-z_][A-Za-z0-9_]*$/.test(text)) {
        refs.add(text);
      }
    }
  });
  return [...refs].sort((a, b) => a.localeCompare(b));
}
