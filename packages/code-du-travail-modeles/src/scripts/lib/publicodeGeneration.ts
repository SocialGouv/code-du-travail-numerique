import fs from "fs";

import { TreeQuestion } from "./type";

function generatePublicode(
  question: TreeQuestion,
  componentName: string
): { filename: string; content: string } {
  const { name } = question;
  return {
    filename: `${componentName}.yml`,
    content: "toto",
  };
}

export async function generatePublicodeFiles(
  question: TreeQuestion,
  componentName: string,
  path: string
) {
  // const tests = generateTest(question, componentName);
  // console.log(`Generating files for ${componentName}:`);
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path);
  }
  const fileContent = `
    contrat salarié . convention collective . transports routiers . ${componentName}:
    applicable si: ${componentName}
    valeur: oui
  `;
  const { filename, content } = generatePublicode(question, componentName);
  fs.writeFile(`${path}/${filename}`, content, function (err) {
    if (err) throw err;
    console.log(`${filename} Saved!`);
  });
  // await Promise.all(
  //   tests.map(({ filename, content }) => {
  //     fs.writeFile(`${path}/${filename}`, content, function (err) {
  //       if (err) throw err;
  //       console.log(`${filename} Saved!`);
  //     });
  //   })
  // );
}
