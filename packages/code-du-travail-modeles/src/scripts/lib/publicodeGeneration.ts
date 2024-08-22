import fs from "fs";

import { OptionResult, TreeQuestion } from "./type";

function cleanValue(value: string) {
  const [, newValue] = value.split("|");
  return newValue.trim();
}

function generateNamespace(
  namespace: string[],
  questionName: string,
  option: string
): string {
  return `
contrat salarié . convention collective . ${namespace.join(" . ")}:
  applicable si: ${questionName} = "'${option}'"
  `;
}

function generateResult(result: OptionResult, namespace: string[]): string {
  const namespaceLine = namespace.join(" . ");
  const refLines = result.refs.map(({ url, label }) => `${label}: ${url}`);
  const content = `
contrat salarié . convention collective . ${namespaceLine} . résultat conventionnel:
  références:
    ${refLines.join(`
    `)}
  `;
  return content;
}

function generateQuestions(
  question: TreeQuestion,
  namespace: string[]
): string {
  let content = "";
  const namespaceLine = namespace.join(" . ");
  switch (question.type) {
    case "select":
      content = `
contrat salarié . convention collective . ${namespaceLine} . ${question.name}:
  titre: ${question.name}
  question: ${question.text}
  cdtn:
    type: liste
    valeurs:
      ${question.options.map(
        ({ text }) => `${cleanValue(text)}: "'${cleanValue(text)}'"`
      ).join(`
      `)}
      `;
  }
  const otherOptions = question.options.reduce<string[]>(
    (arr, { text, nextQuestion, result }) => {
      arr.push(
        generateNamespace(
          [...namespace, cleanValue(text)],
          question.name,
          cleanValue(text)
        )
      );
      if (nextQuestion) {
        arr.push(
          generateQuestions(nextQuestion, [...namespace, cleanValue(text)])
        );
      }
      if (result) {
        arr.push(generateResult(result, [...namespace, cleanValue(text)]));
      }
      return arr;
    },
    []
  );
  return `${content}
          ${otherOptions.join(`
          `)}`;
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

function generatePublicode(
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
    .filter(({ text }) => text === "16")
    .reduce<{ filename: string; content: string }[]>(
      (arr, { text, nextQuestion }) => {
        const foldername = folders.find((folder) =>
          folder.startsWith(`${text}_`)
        );
        const foldernameSplit = foldername?.split("_");
        const ccName =
          foldernameSplit?.slice(1, foldernameSplit.length).join(" ") ?? "";
        if (!foldername) return arr;
        arr.push({
          content: nextQuestion
            ? generateQuestions(nextQuestion, [ccName, componentName])
            : "",
          filename: `${pathDir}/${foldername}/${componentName}.yml`,
        });
        return arr;
      },
      []
    );
}

export async function generatePublicodeFiles(
  question: TreeQuestion,
  componentName: string
) {
  const idccQuestion = getIdccQuestion(question);
  if (!idccQuestion) {
    return [];
  }
  const publicodes = generatePublicode(question, componentName);
  await Promise.all(
    publicodes.map(({ filename, content }) => {
      fs.writeFile(`${filename}`, content, function (err) {
        if (err) throw err;
        console.log(`${filename} Saved!`);
      });
    })
  );
}
