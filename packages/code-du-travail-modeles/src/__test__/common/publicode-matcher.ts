import type { Rule } from "publicodes";

import type { MissingArgs } from "../../publicodes";

declare global {
  namespace jest {
    interface Matchers<R> {
      toContainTitre: () => R;
      toContainQuestion: () => R;
      toContainValidCdtnType: () => R;
      toHaveNextMissingRule: (rule: string | null) => R;
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
    const validCdtnType = ["oui-non", "liste", "entier", "montant", "date"];
    return {
      message: () =>
        `Type ${type} on ${rule.nom} is not valid. Valid types are ${validCdtnType}`,
      pass: validCdtnType.includes(type),
    };
  },
  toHaveNextMissingRule(missingVariables: MissingArgs[], rule: string | null) {
    const missingVars = missingVariables
      .filter((arg) => arg.rawNode.cdtn !== undefined)
      .sort((a, b) => b.indice - a.indice);
    if (missingVars.length === 0) {
      return {
        message: () =>
          `Expected next question to be "${rule}" but received no next question`,
        pass: rule === null,
      };
    }
    const nextRule = replaceAll(missingVars[0].name, " - ", " . ");
    return {
      message: () =>
        `Expected next question to be "${rule}" but received "${nextRule}"`,
      pass: nextRule === rule,
    };
  },
  toHaveNextMissingQuestion(
    missingVariables: MissingArgs[],
    question: string | null
  ) {
    const missingVars = missingVariables
      .filter((arg) => arg.rawNode.cdtn !== undefined)
      .sort((a, b) => b.indice - a.indice);
    if (missingVars.length === 0) {
      return {
        message: () =>
          `Expected next question to be "${question}" but received no next question`,
        pass: question === null,
      };
    }
    const nextQuestion = missingVars[0].rawNode.question;
    return {
      message: () =>
        `Expected next question to be "${question}" but received "${nextQuestion}"`,
      pass: nextQuestion === question,
    };
  },
});

const replaceAll = (string: string, search: string, replace: string) => {
  return string.split(search).join(replace);
};

export default undefined;
