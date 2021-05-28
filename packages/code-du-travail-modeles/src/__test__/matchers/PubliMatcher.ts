import { Rule } from "publicodes";

declare global {
  namespace jest {
    interface Matchers<R> {
      toContainTitre: () => R;
      toContainValidCdtnType: () => R;
    }
  }
}

expect.extend({
  toContainTitre(rule: Rule) {
    if (rule.titre === undefined || rule.titre === null) {
      return {
        pass: false,
        message: () => `Missing property 'titre' on ${rule.nom}`,
      };
    }
    return {
      pass: rule.titre.trim() !== "",
      message: () => `Invalid 'titre' on ${rule.nom}. Titre can't be empty`,
    };
  },
  toContainValidCdtnType(rule: Rule) {
    const cdtnRule = (rule as any).cdtn;
    if (!cdtnRule) {
      return {
        pass: false,
        message: () => `Missing 'cdtn' property on ${rule.nom}`,
      };
    }
    const type = cdtnRule["type"];
    if (!type) {
      return {
        pass: false,
        message: () => `Missing 'cdtn.type' property on ${rule.nom}`,
      };
    }
    const validCdtnType = ["oui-non", "liste", "entier"];
    return {
      pass: validCdtnType.includes(type),
      message: () =>
        `Type ${type} on ${rule.nom} is not valid. Valid types are ${validCdtnType}`,
    };
  },
});

export default undefined;
