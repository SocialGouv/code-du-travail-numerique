import { Situation, preavisLicenciementData } from "../simulators";
import { generateTree } from "./lib";
import { CriteriaItem, TreeQuestionType } from "./lib/type";

export function getPrependPreavisLicenciementCriteria(
  situation: Situation
): CriteriaItem[] {
  const { idcc } = situation;
  return [
    {
      name: "seriousMisconduct",
      option: "non",
      question: "Le licenciement est-il dû à une faute grave (ou lourde) ?",
      type: "radio",
    },
    {
      name: "disabledWorker",
      option: "non",
      question: "Le licenciement est-il dû à une faute grave (ou lourde) ?",
      type: "radio",
    },
    {
      name: "cdt.ancienneté",
      option: "15| Moins de 6 mois",
      question: "Quelle est l'ancienneté du salarié ?",
      type: "select",
    },
    {
      name: "agreementSearch",
      option: idcc.toString(),
      question: "Vous avez sélectionné la convention collective",
      type: "agreement",
    },
  ];
}

export function generatePreavisLicenciementTree() {
  const situations = preavisLicenciementData.situations;
  const questions: TreeQuestionType[] = [
    {
      name: "seriousMisconduct",
      question: "Le licenciement est-il dû à une faute grave (ou lourde) ?",
      type: "radio",
    },
    {
      name: "disabledWorker",
      question: "Le licenciement est-il dû à une faute grave (ou lourde) ?",
      type: "radio",
    },
    {
      name: "cdt.ancienneté",
      question: "Quelle est l'ancienneté du salarié ?",
      type: "select",
    },
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
    ...preavisLicenciementData.questions.map((question) => ({
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
        seriousMisconduct: "non",
        disabledWorker: "non",
        "cdt.ancienneté": "15| Moins de 6 mois",
        agreementSearch: situation.idcc.toString(),
      };
    },
    getResult: (situation) => {
      const { answer, answer3, ref, refUrl } = situation as Situation;
      return {
        refs: ref && refUrl ? [{ label: ref, url: refUrl }] : [],
        texts: answer
          ? [
              answer3 !== "0"
                ? answer?.replace(/\n/g, " ").replace(/ {2}/g, " ").trim()
                : "Aucun préavis",
            ]
          : [],
      };
    },
    questions,
    situations,
  });
}
