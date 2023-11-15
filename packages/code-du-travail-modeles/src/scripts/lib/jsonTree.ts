import type {
  Question,
  Situation,
  SituationHeuresRechercheEmploi,
} from "../../simulators/types";
import type { CriteriaContainer, CriteriaItem, TreeQuestion } from "./type";

type GenerateTreeProps = {
  situations: (Situation | SituationHeuresRechercheEmploi)[];
  questions: Question[];
  prependCriteria?: (
    situation: Situation | SituationHeuresRechercheEmploi
  ) => CriteriaItem[];
  appendCriteria?: (
    situation: Situation | SituationHeuresRechercheEmploi
  ) => CriteriaItem[];
  getResult: (situation: Situation | SituationHeuresRechercheEmploi) => any;
};

function criteriaToArray(
  questions: Question[],
  situation: Situation | SituationHeuresRechercheEmploi
): CriteriaItem[] {
  return questions.reduce<CriteriaItem[]>((arr, { question, name, note }) => {
    if (situation.criteria[name]) {
      const option = situation.criteria[name] ?? "";
      arr.push({
        name: `criteria.${name}`,
        note,
        option,
        question,
        type: "select",
      });
    }

    return arr;
  }, []);
}

function populateNode({ result, criterias }: CriteriaContainer): TreeQuestion {
  const { question, option, note, name, type } = criterias.shift()!;
  return {
    name,
    note: note,
    options: criterias.length
      ? [
          {
            nextQuestion: populateNode({ criterias, result }),
            text: option,
            type,
          },
        ]
      : [
          {
            result,
            text: option,
            type,
          },
        ],
    text: question,
  };
}

function mergeNodes(
  question1: TreeQuestion,
  question2: TreeQuestion
): TreeQuestion {
  if (question1.text !== question2.text) {
    return question2;
  }
  const foundOption = question1.options.find(
    ({ text }) => text === question2.options[0].text
  );
  if (!foundOption) {
    question1.options.push(question2.options[0]);
  } else if (foundOption.nextQuestion && question2.options[0].nextQuestion) {
    foundOption.nextQuestion = mergeNodes(
      foundOption.nextQuestion,
      question2.options[0].nextQuestion
    );
  }
  return question1;
}

export function generateTree({
  situations,
  questions,
  prependCriteria = () => [],
  appendCriteria = () => [],
  getResult,
}: GenerateTreeProps) {
  const questionArray = situations.reduce<CriteriaContainer[]>(
    (arr, situation) => {
      const criteriaArray = criteriaToArray(questions, situation);
      const prependCriterias = prependCriteria(situation);
      const appendCriterias = appendCriteria(situation);
      const criterias = [
        ...prependCriterias,
        ...criteriaArray,
        ...appendCriterias,
      ];
      arr.push({
        criterias: criterias,
        result: getResult(situation),
      });
      return arr;
    },
    []
  );
  return questionArray.reduce<TreeQuestion>((tree, questionItem) => {
    return questionItem.criterias.length
      ? mergeNodes(tree, populateNode(questionItem))
      : tree;
  }, populateNode(questionArray[0]));
}
