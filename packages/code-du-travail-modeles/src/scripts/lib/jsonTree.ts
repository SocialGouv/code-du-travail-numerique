import type { Criteria } from "../../simulators/types";
import type {
  CriteriaContainer,
  CriteriaItem,
  OptionResult,
  TreeQuestion,
  TreeQuestionType,
} from "./type";

type GenerateTreeProps<T> = {
  situations: T[];
  questions: TreeQuestionType[];
  getCriterias?: (situation: T) => Criteria | undefined;
  getResult: (
    situation: T,
    arr: CriteriaContainer[],
    criterias: CriteriaItem[]
  ) => OptionResult;
};

function criteriaToArray(
  questions: TreeQuestionType[],
  criteria: Criteria
): CriteriaItem[] {
  return questions.reduce<CriteriaItem[]>(
    (arr, { question, name, note, type, key }) => {
      if (criteria[name]) {
        const option = criteria[name] ?? "";
        arr.push({
          name,
          note,
          option,
          question,
          type: type ?? "select",
          key,
        });
      }
      return arr;
    },
    []
  );
}

function populateNode({ result, criterias }: CriteriaContainer): TreeQuestion {
  const { question, option, note, name, type, key } = criterias.shift()!;
  return {
    name,
    note: note,
    type,
    key,
    options: criterias.length
      ? [
          {
            nextQuestion: populateNode({ criterias, result }),
            text: option,
          },
        ]
      : [
          {
            result,
            text: option,
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

export function generateTree<T>({
  situations,
  questions,
  getCriterias = () => ({}),
  getResult,
}: GenerateTreeProps<T>) {
  const questionArray = situations.reduce<CriteriaContainer[]>(
    (arr, situation) => {
      const criteria = getCriterias(situation);
      if (!criteria) {
        return arr;
      }
      const criterias = criteriaToArray(questions, criteria);
      arr.push({
        criterias: criterias,
        result: getResult(situation, arr, criterias),
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
