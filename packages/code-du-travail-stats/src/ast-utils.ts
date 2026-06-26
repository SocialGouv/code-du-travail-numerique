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

// Objet passé à `body: JSON.stringify({...})` dans les options d'un `fetch`, ou
// null si les options ne décrivent pas un tel corps. Sert à reconnaître les
// relais de tracking first-party (proxy serveur → Matomo) qui n'utilisent pas
// sendEvent mais POSTent l'event sérialisé en JSON.
export function relayPayloadObject(
  options: ObjectLiteralExpression
): ObjectLiteralExpression | null {
  const bodyProp = options.getProperty("body");
  if (!bodyProp || !Node.isPropertyAssignment(bodyProp)) return null;
  const init = bodyProp.getInitializer();
  if (!init || !Node.isCallExpression(init)) return null;
  if (init.getExpression().getText() !== "JSON.stringify") return null;
  const arg = init.getArguments()[0];
  return arg && Node.isObjectLiteralExpression(arg) ? arg : null;
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
