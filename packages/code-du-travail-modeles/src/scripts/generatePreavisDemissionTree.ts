import { Situation, preavisDemissionData } from "../simulators";
import { generateTree } from "./lib";
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
    getResult: ({ answer, ref, refUrl }) => ({
      refs: ref && refUrl ? [{ label: ref, url: refUrl }] : [],
      texts: answer
        ? [answer?.replace(/\n/g, " ").replace(/ {2}/g, " ").trim()]
        : [],
    }),
    questions,
    situations,
  });
}
