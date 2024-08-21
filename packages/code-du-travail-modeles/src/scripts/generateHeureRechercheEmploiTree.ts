import {
  SituationHeuresRechercheEmploi,
  heuresRechercheEmploiData,
} from "../simulators";
import { generateTree } from "./lib";
import { TreeQuestionType } from "./lib/type";

export function generateHeureRechercheEmploiTree() {
  const situations = heuresRechercheEmploiData.situations;
  const questions: TreeQuestionType[] = [
    {
      name: "agreementSearch",
      question: "Vous avez sélectionné la convention collective",
      type: "agreement",
    },
    {
      name: "typeRupture",
      question: "Pour quelle raison le contrat de travail a-t-il été rompu ?",
      type: "select",
    },
    ...heuresRechercheEmploiData.questions.map((question) => ({
      name: question.name,
      question: question.question,
      note: question.note,
      type: "select" as "agreement" | "radio" | "select",
      key: `criteria.${question.name}`,
    })),
  ];
  return generateTree<SituationHeuresRechercheEmploi>({
    getCriterias: (situation) => {
      return {
        ...situation.criteria,
        typeRupture: situation.typeRupture ?? "",
        agreementSearch: situation.idcc.toString(),
      };
    },
    getResult: ({ answer, answer2, answer3, ref, refUrl }) => ({
      refs: ref && refUrl ? [{ label: ref, url: refUrl }] : [],
      texts: answer
        ? [
            answer.replace(/\n/g, " ").replace(/ {2}/g, " ").trim(),
            answer2?.replace(/\n/g, " ").replace(/ {2}/g, " ").trim() ?? "",
            answer3?.replace(/\n/g, " ").replace(/ {2}/g, " ").trim() ?? "",
          ]
        : [
            "D’après les éléments saisis, dans votre situation, la convention collective ne prévoit pas d’heures d’absence autorisée pour rechercher un emploi.",
          ],
    }),
    questions,
    situations,
  });
}
