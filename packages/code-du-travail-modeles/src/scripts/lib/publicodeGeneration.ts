import fs from "fs";

import { OptionResult, TreeQuestion } from "./type";
import { cleanValue, getCCName } from "./common";

type ParseResult = (texts: string[]) => {
  value: string;
  notification: string | string[];
};

function generateNamespace(
  namespace: string[],
  questionName: string,
  option: string
): string {
  return `
contrat salarié . convention collective . ${namespace.join(" . ")}:
  applicable si: ${questionName} = '${option}'`;
}

function generateNotification(notification: string | string[]) {
  if (Array.isArray(notification)) {
    const notificationList = notification.map(
      (notif) => `
    - ${notif}`
    );
    return notificationList;
  }
  return notification;
}

function generateResult(
  result: OptionResult,
  namespace: string[],
  parseResult: ParseResult
): string {
  const namespaceLine = namespace.join(" . ");
  const refLines = result.refs.map(
    ({ url, label }) => `"${label.replace(/"/g, '\\"')}": ${url}`
  );

  const { value, notification } = parseResult(result.texts);
  const notificationLine = notification?.length
    ? `
  type: notification
  description: ${generateNotification(notification)}`
    : "";
  const content = `
contrat salarié . convention collective . ${namespaceLine} . résultat conventionnel:
  valeur: ${value}${notificationLine}
  remplace: contrat salarié . convention collective . résultat conventionnel
  références:
    ${refLines.join(
      `
    `
    )}`;
  return content;
}

function generateQuestions(
  question: TreeQuestion,
  namespace: string[],
  parseResult: ParseResult
): string {
  let content = "";
  const namespaceLine = namespace.join(" . ").replace(/’/, "'");
  if (!question.commonNamespace) {
    switch (question.type) {
      case "select":
        content = `
contrat salarié . convention collective . ${namespaceLine} . ${cleanValue(
          question.name
        )}:
  titre: ${question.name}
  question: ${question.text}
  cdtn:
    type: liste
    valeurs:
      ${question.options
        .map(({ text }) => `${cleanValue(text)}: "'${cleanValue(text)}'"`)
        .join(
          `
      `
        )}`;
    }
  }
  const otherOptions = question.options.reduce<string[]>(
    (arr, { text, nextQuestion, result }) => {
      const questionName = question.commonNamespace
        ? question.commonNamespace
        : cleanValue(question.name);
      const namespaceItem = `${questionName} ${cleanValue(text)}`;
      if (content || question.commonNamespace) {
        arr.push(
          generateNamespace(
            [...namespace, namespaceItem],
            questionName,
            cleanValue(text)
          )
        );
      }
      if (nextQuestion) {
        arr.push(
          generateQuestions(
            nextQuestion,
            content || question.commonNamespace
              ? [...namespace, namespaceItem]
              : namespace,
            parseResult
          )
        );
      }
      if (result) {
        arr.push(
          generateResult(
            result,
            content || question.commonNamespace
              ? [...namespace, namespaceItem]
              : namespace,
            parseResult
          )
        );
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
  componentName: string,
  parseResult: ParseResult
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
        if (!foldername) return arr;
        arr.push({
          content: nextQuestion
            ? generateQuestions(nextQuestion, [ccName], parseResult)
            : result
            ? generateResult(result, [ccName], parseResult)
            : "",
          filename: `${pathDir}/${foldername}/${componentName}.yaml`,
        });
        return arr;
      },
      []
    );
}

export async function generatePublicodeFiles(
  question: TreeQuestion,
  componentName: string,
  parseResult: ParseResult
) {
  const idccQuestion = getIdccQuestion(question);
  if (!idccQuestion) {
    return [];
  }
  const publicodes = generatePublicode(question, componentName, parseResult);
  await Promise.all(
    publicodes.map(({ filename, content }) => {
      fs.writeFile(`${filename}`, content, function (err) {
        if (err) throw err;
        console.log(`${filename} Saved!`);
      });
    })
  );
}