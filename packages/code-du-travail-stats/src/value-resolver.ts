// Cœur de l'extraction : résout une expression (category / action / name) en une
// LISTE de valeurs possibles, purement syntaxiquement (pas de type-checker).
//
//   - membre d'enum (Enum.MEMBER)            → sa valeur string
//   - paramètre typé enum (action: MyEnum)   → une valeur PAR membre (enum-param)
//   - paramètre d'émetteur                   → valeurs réellement passées par les
//                                              appelants (récursif, cross-fichiers)
//   - ternaire / concaténation de littéraux  → une valeur par branche / produit
//   - template `view_step_${Enum.X}`         → littéral si toutes substitutions résolues
//   - reste calculé à runtime                → placeholder <...> (resolution: dynamic)

import { Node, SyntaxKind } from "ts-morph";
import type { ObjectLiteralExpression } from "ts-morph";
import type { EventResolution, Resolved } from "./events.schema";
import type { EnumIndex } from "./enum-index";
import type { CallIndex } from "./call-index";
import type { ConstIndex } from "./const-index";
import { EMPTY_CONST_INDEX } from "./const-index";
import { compact, dedupResolved, worstKind } from "./text-utils";
import { functionNameOf } from "./ast-utils";

export type Resolver = {
  // Résout une expression en liste de valeurs possibles.
  resolveValues(node: Node, visited?: Set<string>): Resolved[];
  // Résout une propriété d'un objet. null = propriété absente.
  resolvePropertyValues(
    obj: ObjectLiteralExpression,
    propName: string
  ): Resolved[] | null;
  // Le `name` n'identifie pas l'event : une seule valeur (pas d'expansion enum).
  resolveNamePattern(obj: ObjectLiteralExpression): string | null;
};

export function createResolver(
  enumIndex: EnumIndex,
  callIndex: CallIndex,
  constIndex: ConstIndex = EMPTY_CONST_INDEX
): Resolver {
  const { enumMap, enumMembersByName } = enumIndex;
  const { callsByName, defsByName } = callIndex;
  const { constStringValues } = constIndex;

  // Vrai si `idNode` réfère à un paramètre d'une fonction englobante. Sert à ne
  // PAS résoudre un paramètre via la table des constantes (un paramètre peut
  // être homonyme d'une constante de module : le paramètre prime).
  function isEnclosingParam(idNode: Node): boolean {
    const name = idNode.getText();
    let cur: Node | undefined = idNode.getParent();
    while (cur) {
      if (
        Node.isArrowFunction(cur) ||
        Node.isFunctionDeclaration(cur) ||
        Node.isFunctionExpression(cur) ||
        Node.isMethodDeclaration(cur)
      ) {
        if (cur.getParameters().some((p) => p.getName() === name)) return true;
      }
      cur = cur.getParent();
    }
    return false;
  }

  // Un identifiant qui réfère à un paramètre typé enum → ses valeurs possibles.
  // Résolution purement syntaxique (annotation de type), sans type-checker.
  function paramEnumValues(idNode: Node): string[] | null {
    const name = idNode.getText();
    let cur: Node | undefined = idNode.getParent();
    while (cur) {
      if (
        Node.isArrowFunction(cur) ||
        Node.isFunctionDeclaration(cur) ||
        Node.isFunctionExpression(cur) ||
        Node.isMethodDeclaration(cur)
      ) {
        for (const param of cur.getParameters()) {
          if (param.getName() === name) {
            const typeNode = param.getTypeNode();
            if (typeNode && Node.isTypeReference(typeNode)) {
              return (
                enumMembersByName.get(typeNode.getTypeName().getText()) ?? null
              );
            }
            return null;
          }
        }
      }
      cur = cur.getParent();
    }
    return null;
  }

  // `view_step_${Enum.MEMBER}` -> view_step_<valeur résolue> ; `_${title}` ->
  // _<title>. Reste "literal" si toutes les substitutions sont des enums résolus.
  function resolveTemplate(node: Node): Resolved {
    let text = node.getText();
    if (text.startsWith("`") && text.endsWith("`")) text = text.slice(1, -1);
    let kind: EventResolution = "literal";
    const value = text.replace(/\$\{([^}]+)\}/g, (_m, raw) => {
      const expr = String(raw).trim();
      const parts = expr.split(".");
      if (parts.length >= 2) {
        const resolved = enumMap.get(parts.slice(-2).join("."));
        if (resolved !== undefined) return resolved;
      }
      kind = "dynamic";
      return `<${expr}>`;
    });
    return { value: compact(value), kind };
  }

  // Un identifiant = paramètre d'émetteur → valeurs RÉELLEMENT passées par les
  // appelants (récursif, cross-fichiers). Plus précis que le type de l'enum :
  // ne liste que les valeurs effectivement émises. `visited` coupe les cycles.
  function resolveParamViaCallers(
    idNode: Node,
    visited: Set<string>
  ): Resolved[] | null {
    if (visited.size > 12) return null;
    const name = idNode.getText();
    let cur: Node | undefined = idNode.getParent();
    let fnName: string | null = null;
    let paramIndex = -1;
    while (cur) {
      if (
        Node.isArrowFunction(cur) ||
        Node.isFunctionDeclaration(cur) ||
        Node.isFunctionExpression(cur) ||
        Node.isMethodDeclaration(cur)
      ) {
        const idx = cur.getParameters().findIndex((p) => p.getName() === name);
        if (idx >= 0) {
          paramIndex = idx;
          fnName = functionNameOf(cur);
          break;
        }
      }
      cur = cur.getParent();
    }
    if (paramIndex < 0 || !fnName) return null;
    // Nom de fonction ambigu (homonymes) → résolution non fiable, on s'abstient.
    if (defsByName.get(fnName) !== 1) return null;
    const key = `${fnName}#${paramIndex}`;
    if (visited.has(key)) return [];
    visited.add(key);
    const calls = callsByName.get(fnName);
    if (!calls || calls.length === 0) return null;
    const out: Resolved[] = [];
    for (const call of calls) {
      if (!Node.isCallExpression(call)) continue;
      const arg = call.getArguments()[paramIndex];
      if (arg) out.push(...resolveValues(arg, visited));
    }
    return out.length ? dedupResolved(out) : null;
  }

  // Résout une expression category/action en une LISTE de valeurs possibles.
  function resolveValues(
    node: Node,
    visited: Set<string> = new Set()
  ): Resolved[] {
    if (
      node.getKind() === SyntaxKind.StringLiteral ||
      node.getKind() === SyntaxKind.NoSubstitutionTemplateLiteral
    ) {
      const v = (
        node as unknown as { getLiteralValue(): string }
      ).getLiteralValue();
      return [{ value: v, kind: "literal" }];
    }
    if (Node.isParenthesizedExpression(node)) {
      return resolveValues(node.getExpression(), visited);
    }
    if (Node.isPropertyAccessExpression(node)) {
      const fullText = node.getText();
      const parts = fullText.split(".");
      if (parts.length >= 2) {
        const resolved = enumMap.get(parts.slice(-2).join("."));
        if (resolved !== undefined)
          return [{ value: resolved, kind: "literal" }];
      }
      return [{ value: `<${fullText}>`, kind: "dynamic" }];
    }
    if (Node.isIdentifier(node)) {
      const name = node.getText();
      // 1) valeurs RÉELLEMENT passées par les appelants. On ne garde ce résultat
      //    que s'il apporte au moins une valeur concrète ; les valeurs non
      //    résolues sont repliées en un seul placeholder <param>.
      const viaCallers = resolveParamViaCallers(node, visited);
      if (viaCallers && viaCallers.some((r) => !r.value.includes("<"))) {
        return dedupResolved(
          viaCallers.map((r) =>
            r.value.includes("<")
              ? { value: `<${name}>`, kind: "dynamic" as const }
              : r
          )
        );
      }
      // 2) sinon, repli sur le type enum du paramètre (espace possible).
      const members = paramEnumValues(node);
      if (members && members.length) {
        return members.map((v) => ({ value: v, kind: "enum-param" as const }));
      }
      // 3) constante string de module (`const NAME = "x"`). Exclut les
      //    paramètres (un param prime sur une constante homonyme) et les noms
      //    ambigus (même nom, valeurs différentes selon le fichier).
      if (!isEnclosingParam(node)) {
        const constVals = constStringValues.get(name);
        if (constVals && constVals.size === 1) {
          return [{ value: [...constVals][0], kind: "literal" }];
        }
      }
      return [{ value: `<${name}>`, kind: "dynamic" }];
    }
    if (Node.isConditionalExpression(node)) {
      return [
        ...resolveValues(node.getWhenTrue(), visited),
        ...resolveValues(node.getWhenFalse(), visited),
      ];
    }
    if (Node.isBinaryExpression(node)) {
      // Concaténation de chaînes : produit cartésien gauche × droite.
      if (node.getOperatorToken().getKind() === SyntaxKind.PlusToken) {
        const left = resolveValues(node.getLeft(), visited);
        const right = resolveValues(node.getRight(), visited);
        if (left.length * right.length <= 12) {
          const out: Resolved[] = [];
          for (const l of left)
            for (const r of right)
              out.push({
                value: l.value + r.value,
                kind: worstKind([l.kind, r.kind]),
              });
          return out;
        }
      }
      return [
        { value: `<${compact(node.getText()).slice(0, 80)}>`, kind: "dynamic" },
      ];
    }
    if (Node.isTemplateExpression(node)) {
      return [resolveTemplate(node)];
    }
    if (Node.isCallExpression(node)) {
      const text = compact(node.getText());
      return [
        {
          value: `<${text.length > 80 ? text.slice(0, 77) + "..." : text}>`,
          kind: "dynamic",
        },
      ];
    }
    return [
      { value: `<${compact(node.getText()).slice(0, 80)}>`, kind: "dynamic" },
    ];
  }

  // Résout une propriété d'un objet en liste de valeurs. null = propriété absente.
  function resolvePropertyValues(
    obj: ObjectLiteralExpression,
    propName: string
  ): Resolved[] | null {
    const prop = obj.getProperty(propName);
    if (!prop) return null;
    if (Node.isPropertyAssignment(prop)) {
      const init = prop.getInitializer();
      if (!init) return null;
      return resolveValues(init);
    }
    if (Node.isShorthandPropertyAssignment(prop)) {
      return resolveValues(prop.getNameNode());
    }
    return [
      { value: `<${prop.getSymbol()?.getName() ?? "?"}>`, kind: "dynamic" },
    ];
  }

  // Le `name` n'identifie pas l'event : une seule valeur (pas d'expansion enum).
  function resolveNamePattern(obj: ObjectLiteralExpression): string | null {
    const prop = obj.getProperty("name");
    if (!prop) return null;
    let node: Node | undefined;
    if (Node.isPropertyAssignment(prop)) node = prop.getInitializer();
    else if (Node.isShorthandPropertyAssignment(prop))
      node = prop.getNameNode();
    if (!node) return null;
    // On NE déplie PAS les enums du name (sinon name = longue liste). On prend
    // la valeur littérale si possible, sinon un placeholder unique.
    if (
      node.getKind() === SyntaxKind.StringLiteral ||
      node.getKind() === SyntaxKind.NoSubstitutionTemplateLiteral
    ) {
      return (
        node as unknown as { getLiteralValue(): string }
      ).getLiteralValue();
    }
    if (Node.isPropertyAccessExpression(node)) {
      const parts = node.getText().split(".");
      const resolved = enumMap.get(parts.slice(-2).join("."));
      return resolved ?? `<${node.getText()}>`;
    }
    if (Node.isTemplateExpression(node)) return resolveTemplate(node).value;
    return `<${compact(node.getText()).slice(0, 80)}>`;
  }

  return { resolveValues, resolvePropertyValues, resolveNamePattern };
}
