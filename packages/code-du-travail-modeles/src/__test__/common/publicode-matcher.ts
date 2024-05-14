import type { Rule } from "publicodes";

import {
  mergeIndemniteLicenciementModels,
  mergePreavisRetraiteModels,
  mergeRuptureConventionnelle,
} from "../../internal/merger";
import type { References } from "../../modeles";
import type {
  ChosenResult,
  MissingArgs,
  PublicodesOutput,
} from "../../publicodes";

declare global {
  const modelsIndemniteLicenciement: Record<string, any>;
  const modelsPreavisRetraite: Record<string, any>;
  const modelsRuptureConventionnel: Record<string, any>;
  namespace jest {
    interface Matchers<R> {
      toContainTitre: () => R;
      toContainQuestion: () => R;
      toContainValidCdtnType: () => R;
      toHaveNextMissingRule: (rule: string | null) => R;
      toHaveNextMissingQuestion: (question: string | null) => R;
      toHaveReferencesBeEqual: (references: References[]) => R;
      toNextMissingRuleBeEqual: (rule: string | null) => R;
      toNextMissingQuestionBeEqual: (question: string | null) => R;
      toChosenResultBeEqual: (chosenResult: ChosenResult | null) => R;
      toFormulaBeEqual: (
        formula: string | null,
        explanations?: string[] | null
      ) => R;
      toResultBeEqual: (
        amount: number | null,
        unit: string | null | undefined
      ) => R;
      toAgreementResultBeEqual: (
        amount: number | null,
        unit?: string | null
      ) => R;
      toAgreementResultBeNull: () => R;
      toLegalResultBeEqual: (
        amount: number | null,
        unit: string | null | undefined
      ) => R;
      toIneligibilityBeEqual: (ineligibility: string | null) => R;
      toIneligibilityContain: (ineligibility: string | null) => R;
    }
  }
}

expect.extend({
  toAgreementResultBeEqual(
    result: PublicodesOutput<any>,
    amount: string | null,
    unit?: string | null
  ) {
    if (result.type !== "result") {
      return {
        message: () =>
          `Expected a agreement result but received "${
            result.type
          }"\n\n### Detail:\n${JSON.stringify(result)}\n\n`,
        pass: false,
      };
    }

    if (amount === null && !unit) {
      return {
        message: () =>
          `Expected no agreement result but received "${result.detail.agreementResult}"`,
        pass: result.detail.agreementResult === undefined,
      };
    }

    return {
      message: () =>
        `Expected agreement amount to be "${amount} ${unit}" but received "${result.detail.agreementResult?.value} ${result.detail.agreementResult?.unit?.numerators[0]}"`,
      pass:
        (amount === undefined ||
          amount === result.detail.agreementResult?.value) &&
        (unit === undefined ||
          unit === result.detail.agreementResult?.unit?.numerators[0]),
    };
  },
  toChosenResultBeEqual: (
    result: PublicodesOutput<any>,
    chosenResult: ChosenResult | null
  ) => {
    if (result.type !== "result") {
      return {
        message: () => `Expected a result but received "${result.type}"`,
        pass: false,
      };
    }
    return {
      message: () =>
        `Expected chosen result to be "${chosenResult}" but received "${result.detail.chosenResult}"`,
      pass: chosenResult === result.detail.chosenResult,
    };
  },
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
  toFormulaBeEqual: (
    result: PublicodesOutput<any>,
    formula: string,
    explanations: string[] | undefined
  ) => {
    if (result.type !== "result") {
      return {
        message: () => `Expected a result but received "${result.type}"`,
        pass: false,
      };
    }
    return {
      message: () =>
        `Expected formula to be "${formula}" with explanations "${explanations}" but received "${result.formula.formula}" with explanations ${result.formula.explanations}`,
      pass:
        formula === result.formula.formula &&
        (explanations === undefined ||
          JSON.stringify(explanations) ===
            JSON.stringify(result.formula.explanations)),
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
  toHaveReferencesBeEqual(
    result: PublicodesOutput<any>,
    references: References[]
  ) {
    if (result.type !== "result") {
      return {
        message: () => `Expected a legal result but received "${result.type}"`,
        pass: false,
      };
    }
    return {
      message: () =>
        `Expected to receive ${references.length} references but received ${
          result.references.length
        } references.
Expected:
${JSON.stringify(references)}
Received:
${JSON.stringify(result.references)}`,
      pass: JSON.stringify(references) === JSON.stringify(result.references),
    };
  },
  toIneligibilityBeEqual(
    result: PublicodesOutput<any>,
    ineligibility: string | null
  ) {
    if (ineligibility === null) {
      return {
        message: () =>
          `Not expected an ineligibility but received an ineligibility`,
        pass: result.type !== "ineligibility",
      };
    }

    if (result.type !== "ineligibility") {
      return {
        message: () => `Expected a ineligibility but received "${result.type}"`,
        pass: false,
      };
    }

    return {
      message: () =>
        `Expected ineligibility to be "${ineligibility}" but received "${result.ineligibility}"`,
      pass: ineligibility === result.ineligibility,
    };
  },
  toIneligibilityContain(
    result: PublicodesOutput<any>,
    ineligibility: string | null
  ) {
    if (ineligibility === null) {
      return {
        message: () =>
          `Not expected an ineligibility but received an ineligibility`,
        pass: result.type !== "ineligibility",
      };
    }

    if (result.type !== "ineligibility") {
      return {
        message: () => `Expected a ineligibility but received "${result.type}"`,
        pass: false,
      };
    }

    return {
      message: () =>
        `Expected ineligibility to be "${ineligibility}" but received "${result.ineligibility}"`,
      pass: result.ineligibility.includes(ineligibility),
    };
  },
  toLegalResultBeEqual(
    result: PublicodesOutput<any>,
    amount: string | null,
    unit: string | null | undefined
  ) {
    if (result.type !== "result") {
      return {
        message: () => `Expected a legal result but received "${result.type}"`,
        pass: false,
      };
    }
    if (amount === null && !unit) {
      return {
        message: () =>
          `Expected no legal result but received "${result.detail.legalResult}"`,
        pass: result.detail.legalResult === undefined,
      };
    }

    return {
      message: () =>
        `Expected legal amount to be "${amount} ${unit}" but received "${result.detail.legalResult?.result?.value} ${result.detail.legalResult?.result?.unit?.numerators[0]}"`,
      pass:
        amount === result.detail.legalResult?.value &&
        unit === result.detail.legalResult?.unit?.numerators[0],
    };
  },
  toNextMissingQuestionBeEqual(
    result: PublicodesOutput<any>,
    question: string | null
  ) {
    if (question === null && result.type === "missing-args") {
      const missingVars = result.missingArgs
        .filter((arg) => arg.rawNode.cdtn !== undefined)
        .sort((a, b) => b.indice - a.indice);
      return {
        message: () =>
          `Expected no missing args but received missing args.\n\n### Detail:\n${JSON.stringify(
            missingVars
          )}\n\n`,
        pass: missingVars.length === 0,
      };
    }
    if (result.type !== "missing-args") {
      return {
        message: () => `Expected missing args but received "${result.type}"`,
        pass: question === null,
      };
    }
    const missingVariables = result.missingArgs;
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
    return {
      message: () =>
        `Expected next question to be "${question}" but received "${missingVars[0].rawNode.question}"`,
      pass: missingVars[0].rawNode.question === question,
    };
  },
  toNextMissingRuleBeEqual(result: PublicodesOutput<any>, rule: string | null) {
    if (rule === null && result.type === "missing-args") {
      const missingVars = result.missingArgs
        .filter((arg) => arg.rawNode.cdtn !== undefined)
        .sort((a, b) => b.indice - a.indice);
      return {
        message: () =>
          `Expected no missing args but received missing args.\n\n### Detail:\n${JSON.stringify(
            missingVars
          )}\n\n`,
        pass: missingVars.length === 0,
      };
    }
    if (result.type !== "missing-args") {
      return {
        message: () => `Expected missing args but received "${result.type}"`,
        pass: rule === null,
      };
    }
    const missingVariables = result.missingArgs;
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
  toResultBeEqual(
    result: PublicodesOutput<any>,
    amount: string | null,
    unit: string | null | undefined
  ) {
    if (result.type !== "result") {
      return {
        message: () => `Expected a result but received "${result.type}"`,
        pass: false,
      };
    }

    return {
      message: () =>
        `Expected amount to be "${amount} ${unit}" but received "${result.result.value} ${result.result.unit?.numerators[0]}"`,
      pass:
        amount === result.result.value &&
        unit === result.result.unit?.numerators[0],
    };
  },
});

const replaceAll = (string: string, search: string, replace: string) => {
  return string.split(search).join(replace);
};

(global as any).modelsIndemniteLicenciement =
  mergeIndemniteLicenciementModels();
(global as any).modelsPreavisRetraite = mergePreavisRetraiteModels();
(global as any).modelsRuptureConventionnel = mergeRuptureConventionnelle();

export default undefined;
