import type { Rule } from "publicodes";

declare global {
  namespace jest {
    interface Matchers<R> {
      toContainTitre: () => R;
      toContainQuestion: () => R;
      toContainValidCdtnType: () => R;
    }
  }
}

expect.extend({
  toContainQuestion(rule: Rule) {
    if (rule.question === undefined || rule.question === null) {
      return {
        message: () => `Missing property 'question' on ${rule.nom}`,
        pass: false,
      };
    }
    return {
      message: () =>
        `Invalid 'question' on ${rule.nom}. Question can't be empty`,
      pass: rule.question.trim() !== "",
    };
  },
  toContainTitre(rule: Rule) {
    if (rule.titre === undefined || rule.titre === null) {
      return {
        message: () => `Missing property 'titre' on ${rule.nom}`,
        pass: false,
      };
    }
    return {
      message: () => `Invalid 'titre' on ${rule.nom}. Titre can't be empty`,
      pass: rule.titre.trim() !== "",
    };
  },
  toContainValidCdtnType(rule: Rule) {
    const cdtnRule = (rule as any).cdtn;
    if (!cdtnRule) {
      return {
        message: () => `Missing 'cdtn' property on ${rule.nom}`,
        pass: false,
      };
    }
    const type = cdtnRule.type;
    if (!type) {
      return {
        message: () => `Missing 'cdtn.type' property on ${rule.nom}`,
        pass: false,
      };
    }
    const validCdtnType = ["oui-non", "liste", "entier", "montant"];
    return {
      message: () =>
        `Type ${type} on ${rule.nom} is not valid. Valid types are ${validCdtnType}`,
      pass: validCdtnType.includes(type),
    };
  },
});

export default undefined;
