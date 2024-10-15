import { Situation, preavisLicenciementData } from "../simulators";
import { cleanRefLabel, generateTree } from "./lib";
import { CriteriaItem, TreeQuestionType } from "./lib/type";

export function getPrependPreavisLicenciementCriteria(
  situation: Situation,
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
    getResult: ({ answer, answer2, answer3, ref, refUrl, refs, note }) => {
      // const regExpMatchMonth = /[0-9]{1,} (mois|jour|semaine)(s){0,1}/;
      // const [matchedNumber] = regExpMatchMonth.exec(answer ?? "") ?? [];
      // const [number, unit] = (matchedNumber ?? answer ?? "").split(" ");
      // const regExp = /\(([^)]+)\)/;
      // const regExpValue = regExp.exec(answer ?? "");
      // const isNan = isNaN(parseInt(number));
      const result = {
        refs:
          refs?.map(({ ref, refUrl }) => ({
            label: cleanRefLabel(ref),
            url: refUrl,
          })) ??
          (ref && refUrl ? [{ label: cleanRefLabel(ref), url: refUrl }] : []),
        texts: [
          !answer3 || answer3 === "0" ? "Aucun préavis" : (answer ?? ""),
          // ...(answer && !isNan ? [`${number} ${unit}`] : ["0"]),
          ...(answer2
            ? answer2
                .split("\n")
                .filter((text) => !!text)
                .map((text) => text.replace("-", "").trim())
            : []),
          ...(note ? [...(Array.isArray(note) ? note : [note])] : []),
          // ...(regExpValue?.[1] ? [regExpValue[1]] : []),
        ],
      };
      return result;
    },
    questions,
    situations,
  });
}
