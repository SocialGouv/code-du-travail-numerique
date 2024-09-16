import { Situation, preavisDemissionData } from "../simulators";
import { generateTree, cleanRefLabel } from "./lib";
import { TreeQuestionType } from "./lib/type";

export function generatePreavisDemissionTree() {
  const situations = preavisDemissionData.situations;
  const questions: TreeQuestionType[] = [
    {
      name: "agreementSearch",
      question: "Vous avez sélectionné la convention collective",
      type: "agreement",
    },
    ...preavisDemissionData.questions.map((question) => ({
      name: question.name,
      question: question.question,
      note: question.note,
      type: "select" as "agreement" | "radio" | "select",
      key: `criteria.${question.name}`,
    })),
  ];
  return generateTree<Situation>({
    getCriterias: (situation) => {
      return {
        ...situation.criteria,
        agreementSearch: situation.idcc.toString(),
      };
    },
    getResult: ({ answer, answer2, ref, refUrl, refs, note }) => {
      const [number, unit] = (answer ?? "").split(" ");
      const regExp = /\(([^)]+)\)/;
      const regExpValue = regExp.exec(answer ?? "");
      const isNan = isNaN(parseInt(number));
      const result = {
        refs:
          refs?.map(({ ref, refUrl }) => ({
            label: cleanRefLabel(ref),
            url: refUrl,
          })) ??
          (ref && refUrl ? [{ label: cleanRefLabel(ref), url: refUrl }] : []),
        texts: [
          ...(answer && !isNan ? [`${number} ${unit}`] : ["0"]),
          ...(answer2
            ? answer2
                .split("\n")
                .filter((text) => !!text)
                .map((text) => text.replace("-", "").trim())
            : []),
          ...(note ? [...(Array.isArray(note) ? note : [note])] : []),
          ...(regExpValue?.[1] ? [regExpValue[1]] : []),
        ],
      };
      return result;
    },
    questions,
    situations,
  });
}
