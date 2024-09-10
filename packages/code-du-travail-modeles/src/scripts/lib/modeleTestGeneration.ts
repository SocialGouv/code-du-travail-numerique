import fs from "fs";

import type { OptionResult, TreeQuestion } from "./type";
import { cleanValue, getCCName } from "./common";

type Situation = {
  [template: string]: string;
};

type SituationResult = {
  situation: Situation;
  expectedResult: {
    expectedValue?: number | string;
    unit?: string;
  };
  expectedReferences: { article: string; url: string }[];
  expectedNotifications: string[];
};

type FormatResultOutput = Omit<SituationResult, "situation">;

function capitalizeFirstLetter(text: string) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

function getSituation(
  question: TreeQuestion,
  templates: string[],
  formatResult: (result: OptionResult) => FormatResultOutput,
  currentSituation: Situation = {}
): SituationResult[] {
  return question.options.reduce<SituationResult[]>(
    (arr, { text, nextQuestion, result }) => {
      const template = [...templates, question.name].join(" . ");
      const situation: Situation = {
        ...currentSituation,
        [template]: `'${cleanValue(text)}'`,
      };
      if (result) {
        arr.push({
          ...formatResult(result),
          situation,
        });
      }
      if (nextQuestion) {
        arr = arr.concat(
          getSituation(
            nextQuestion,
            [...templates, `${question.name} ${cleanValue(text)}`],
            formatResult,
            situation
          )
        );
      }
      return arr;
    },
    []
  );
}

function getIdccQuestion(question: TreeQuestion): TreeQuestion | null {
  if (question.type === "agreement") {
    return question;
  }
  return question.options.reduce<TreeQuestion | null>((result, option) => {
    if (option.nextQuestion) {
      const idccQuestion = getIdccQuestion(option.nextQuestion);
      if (idccQuestion) {
        result = idccQuestion;
      }
    }
    return result;
  }, null);
}

function generateTest(
  question: TreeQuestion,
  componentName: string,
  formatResult: (result: OptionResult) => FormatResultOutput,
  insertSituation: () => string
): { filename: string; content: string }[] {
  const idccQuestion = getIdccQuestion(question);
  if (!idccQuestion) {
    return [];
  }
  const pathDir = "src/modeles/conventions";
  const folders = fs.readdirSync(pathDir);
  return idccQuestion.options
    .filter(({ text }) => text !== "0")
    .reduce<{ filename: string; content: string }[]>(
      (arr, { text, nextQuestion, result }) => {
        const foldername = folders.find((folder) =>
          folder.startsWith(`${text}_`)
        );
        if (foldername === undefined) {
          return arr;
        }
        const ccName = getCCName(`${pathDir}/${foldername}`);
        const situationLine = nextQuestion
          ? getSituation(
              nextQuestion,
              ["contrat salarié", "convention collective", ccName],
              formatResult
            ).map((situation) => {
              return JSON.stringify(situation);
            }).join(`,
            `)
          : JSON.stringify({
              situation: {},
              ...(result ? formatResult(result) : {}),
            });
        const folderPath = `${pathDir}/${foldername}/__tests__/${componentName}`;
        if (!fs.existsSync(folderPath)) {
          fs.mkdirSync(folderPath);
        }
        arr.push({
          content: `
import { ${capitalizeFirstLetter(
            componentName
          )}Publicodes } from "../../../../../publicodes/${capitalizeFirstLetter(
            componentName
          )}";

const engine = new ${capitalizeFirstLetter(
            componentName
          )}Publicodes(models${capitalizeFirstLetter(
            componentName
          )}, "${text}");
      
describe("Test de la fonctionnalité 'calculate'", () => {
  test.each([${situationLine}])(
    "%#) Vérifier que le calculate donne le bon résultat pour la situation donnée",
    ({situation, expectedResult, expectedReferences, expectedNotifications}) => {
      const result = engine.calculate({
        "contrat salarié . convention collective": "'IDCC${text.padStart(
          4,
          "0"
        )}'",
        ${insertSituation().replace(/’/, "'")}
        ...situation,
      });
      expect(result).toResultBeEqual(expectedResult.expectedValue, expectedResult.unit);
      expect(result).toHaveReferencesBeEqual(expectedReferences);
      expect(result).toContainNotifications(expectedNotifications);
  });
});`,
          filename: `${folderPath}/calculate.spec.ts`,
        });
        return arr;
      },
      []
    );
}

export async function generateModeleTestFiles(
  question: TreeQuestion,
  componentName: string,
  formatResult: (result: OptionResult) => FormatResultOutput,
  insertSituation: () => string = () => ""
) {
  const tests = generateTest(
    question,
    componentName,
    formatResult,
    insertSituation
  );
  console.log(`Generating files for ${componentName}:`);
  await Promise.all(
    tests.map(({ filename, content }) => {
      fs.writeFile(`${filename}`, content, function (err) {
        if (err) throw err;
        console.log(`${filename} Saved!`);
      });
    })
  );
}
