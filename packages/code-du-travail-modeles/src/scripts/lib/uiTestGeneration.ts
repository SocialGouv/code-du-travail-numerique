import fs from "fs";

import type { OptionResult, TreeOption, TreeQuestion } from "./type";

function generateAction(
  questionName: string,
  type: string,
  { text }: TreeOption
) {
  switch (type) {
    case "select":
      return `
        fireEvent.change(screen.getByTestId("${questionName}"), {
          target: { value: "${text}" },
        });
        fireEvent.click(ui.next.get());
      `;
    case "radio":
      return `
        fireEvent.click(screen.getByTestId("${questionName}-${text.toLocaleLowerCase()}"));
        fireEvent.click(ui.next.get());
      `;
    case "agreement":
      return `
        fireEvent.click(ui.next.get());
      `;
  }
}

function formatTestText(text: string) {
  return text.replace("(", "\\(").replace(")", "\\)").replace("  ", " ").trim();
}

export function generateTestResult(result: OptionResult): string {
  return `
    it("should display expected answer", () => {
      ${result.texts
        .map((text) => {
          if (!text) return "";
          const formattedText = formatTestText(text);
          return `expect(screen.queryAllByText(/${formattedText}/)[0]).toBeInTheDocument();
          `;
        })
        .join("")}
        ${result.refs.map((ref) => {
          const [refLabel] = formatTestText(ref.label).split(/[\n\r]+/g);
          return `expect(screen.queryAllByText(/${refLabel}/)[0]).toBeInTheDocument();
          `;
        })}
    });
  `;
}

export function generateTestOption(
  questionName: string,
  type: string,
  option: TreeOption
): string {
  const { text, nextQuestion, result } = option;
  return `
      describe("${questionName} = ${text}", () => {
        
        beforeEach(() => {
          ${generateAction(questionName, type, option)}
        });
        ${
          nextQuestion
            ? nextQuestion.options
                .map((option) =>
                  generateTestOption(
                    nextQuestion.key ?? nextQuestion.name,
                    nextQuestion.type,
                    option
                  )
                )
                .join("")
            : ""
        }
        ${result ? generateTestResult(result) : ""}
      });
    `;
}

function generateActionsUntilIdcc(
  { name, options, type }: TreeQuestion,
  idcc: string
): string {
  const firstOption = options[0];
  return `
    ${generateAction(name, type, firstOption)}
    ${
      type !== "agreement" && firstOption.nextQuestion
        ? generateActionsUntilIdcc(firstOption.nextQuestion, idcc)
        : ""
    }`;
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
  // console.log("question", question);
  // console.log("idccQuestion", JSON.stringify(idccQuestion));
  if (!idccQuestion) {
    return [];
  }
  return idccQuestion.options
    .filter(({ text }) => text !== "0")
    .map(({ text, nextQuestion, result }) => ({
      content: `
        import { ${componentName} } from "../../index";
        import { ui } from "../ui";
        import { fireEvent, render, screen } from "@testing-library/react";
        
        jest.spyOn(Storage.prototype, "setItem");
        Storage.prototype.getItem = jest.fn(
          () => \`
        {
          "num": ${text},
          "shortTitle": "Transports routiers et activités auxiliaires du transport",
          "id": "KALICONT000005635624",
          "title": "Transports routiers et activités auxiliaires du transport",
          "url": "https://www.legifrance.gouv.fr/affichIDCC.do?idConvention=KALICONT000005635624",
          "slug": "16-transports-routiers-et-activites-auxiliaires-du-transport"
        }
        \`
        );
    
        describe("${componentName}", () => {
          beforeEach(() => {
            render(<${componentName} icon={""} title={""} displayTitle={""} />);
                fireEvent.click(ui.introduction.startButton.get());
                ${generateActionsUntilIdcc(question, text)}
          });
          ${
            nextQuestion
              ? nextQuestion.options
                  .map((option) =>
                    generateTestOption(
                      nextQuestion.key ?? nextQuestion.name,
                      nextQuestion.type,
                      option
                    )
                  )
                  .join("")
              : ""
          }
          ${result ? generateTestResult(result) : ""}
        });
      `,
      filename: `${text}.test.tsx`,
    }));
}

export async function generateUITestFiles(
  question: TreeQuestion,
  componentName: string,
  path: string
) {
  const tests = generateTest(question, componentName);
  console.log(`Generating files for ${componentName}:`);
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path);
  }
  await Promise.all(
    tests.map(({ filename, content }) => {
      fs.writeFile(`${path}/${filename}`, content, function (err) {
        if (err) throw err;
        console.log(`${filename} Saved!`);
      });
    })
  );
}
