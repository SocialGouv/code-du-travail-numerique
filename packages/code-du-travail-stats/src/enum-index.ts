// Index des enums string référencés par le tracking. Construit purement
// syntaxiquement (pas de type-checker) à partir des fichiers source fournis.

import type { SourceFile } from "ts-morph";

export type EnumIndex = {
  // "EnumName.Member" -> "value"
  enumMap: Map<string, string>;
  // "EnumName" -> [valeurs string]
  enumMembersByName: Map<string, string[]>;
};

// Parcourt les déclarations d'enums et n'indexe que les membres à valeur string
// (les seuls résolubles en valeur d'event).
export function buildEnumIndex(sourceFiles: SourceFile[]): EnumIndex {
  const enumMap = new Map<string, string>();
  const enumMembersByName = new Map<string, string[]>();
  for (const sf of sourceFiles) {
    for (const decl of sf.getEnums()) {
      const enumName = decl.getName();
      const values: string[] = [];
      for (const member of decl.getMembers()) {
        const value = member.getValue();
        if (typeof value === "string") {
          enumMap.set(`${enumName}.${member.getName()}`, value);
          values.push(value);
        }
      }
      if (values.length) enumMembersByName.set(enumName, values);
    }
  }
  return { enumMap, enumMembersByName };
}
