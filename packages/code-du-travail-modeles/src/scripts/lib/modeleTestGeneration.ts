import fs from "fs";

import type { TreeQuestion } from "./type";
import { cleanValue } from "./common";

type Situation = {
  [template: string]: string;
};

type SituationResult = {
  situation: Situation;
  expectedResult: {
    expectedValue: number;
    unit?: string;
  };
  expectedReferences: { article: string; url: string }[];
};

function capitalizeFirstLetter(text: string) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

function getSituation(
  question: TreeQuestion,
  templates: string[],
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
        const [value, unit] = result.texts[0].split(" ");
        const expectedValue = parseInt(value);
        if (isNaN(expectedValue)) {
          arr.push({
            situation,
            expectedResult: { expectedValue: 0, unit: "mois" },
            expectedReferences: result.refs.map(({ label, url }) => ({
              article: label,
              url,
            })),
          });
        } else {
          arr.push({
            situation,
            expectedResult: { expectedValue, unit },
            expectedReferences: result.refs.map(({ label, url }) => ({
              article: label,
              url,
            })),
          });
        }
      }
      if (nextQuestion) {
        arr = arr.concat(
          getSituation(
            nextQuestion,
            [...templates, `${question.name} ${cleanValue(text)}`],
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
  componentName: string
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
      (arr, { text, nextQuestion }) => {
        const foldername = folders.find((folder) =>
          folder.startsWith(`${text}_`)
        );
        if (foldername === undefined) {
          return arr;
        }
        const foldernameSplit = foldername.split("_");
        const ccName =
          foldernameSplit?.slice(1, foldernameSplit.length).join(" ") ?? "";
        const situationLine = nextQuestion
          ? getSituation(nextQuestion, [
              "contrat salarié",
              "convention collective",
              ccName,
            ]).map((situation) => {
              return JSON.stringify(situation);
            }).join(`,
            `)
          : "";
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
    "Vérifier que le calculate donne le bon résultat pour la situation donnée",
    ({situation, expectedResult, expectedReferences}) => {
      const result = engine.calculate({
        "contrat salarié . convention collective": "'IDCC${text.padStart(
          4,
          "0"
        )}'",
        "contrat salarié . convention collective . ancienneté légal": "'Moins de 6 mois'",
        ...situation,
      });
      expect(result).toResultBeEqual(expectedResult.expectedValue, expectedResult.unit);
      expect(result).toHaveReferencesBeEqual(expectedReferences);
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
  componentName: string
) {
  const tests = generateTest(question, componentName);
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
