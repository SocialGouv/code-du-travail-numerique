// Index des constantes string littérales de niveau module (`const NAME = "x"`),
// construit purement syntaxiquement (pas de type-checker). Sert à résoudre des
// identifiants qui réfèrent à une constante de tracking — typiquement le relais
// first-party qui passe par des constantes (`RATING_MATOMO_CATEGORY`,
// `RATING_MATOMO_ACTION`, endpoint…) plutôt que par des enums comme sendEvent.

import { SyntaxKind, VariableDeclarationKind } from "ts-morph";
import type { SourceFile } from "ts-morph";

export type ConstIndex = {
  // "NAME" -> ensemble des valeurs string distinctes rencontrées. Une taille > 1
  // signale un nom ambigu (homonymes dans plusieurs fichiers) → non résolu.
  constStringValues: Map<string, Set<string>>;
};

// Index vide, utilisé par défaut (ex: tests qui n'ont pas besoin de constantes).
export const EMPTY_CONST_INDEX: ConstIndex = {
  constStringValues: new Map(),
};

// N'indexe QUE les `const` de niveau module à initialiseur string littéral (ou
// template sans substitution). On exclut volontairement `let`/`var`, les consts
// locales (à l'intérieur de fonctions, hors `getVariableStatements()`) et les
// initialiseurs calculés : seules les vraies constantes string importables
// servent à identifier un event.
export function buildConstIndex(sourceFiles: SourceFile[]): ConstIndex {
  const constStringValues = new Map<string, Set<string>>();
  const add = (name: string, value: string): void => {
    const set = constStringValues.get(name);
    if (set) set.add(value);
    else constStringValues.set(name, new Set([value]));
  };
  for (const sf of sourceFiles) {
    // getVariableStatements() ne renvoie que les déclarations de niveau module.
    for (const stmt of sf.getVariableStatements()) {
      if (stmt.getDeclarationKind() !== VariableDeclarationKind.Const) continue;
      for (const decl of stmt.getDeclarations()) {
        const init = decl.getInitializer();
        if (!init) continue;
        const kind = init.getKind();
        if (
          kind === SyntaxKind.StringLiteral ||
          kind === SyntaxKind.NoSubstitutionTemplateLiteral
        ) {
          add(
            decl.getName(),
            (init as unknown as { getLiteralValue(): string }).getLiteralValue()
          );
        }
      }
    }
  }
  return { constStringValues };
}
