import {Question, SituationHeuresRechercheEmploi, Situation} from "../../simulators/types";

import {CriteriaItem, CriteriaContainer, TreeQuestion} from "./type";

type GenerateTreeProps = {
    situations: (SituationHeuresRechercheEmploi | Situation)[];
    questions: Question[];
    prependCriteria?: (situation: SituationHeuresRechercheEmploi | Situation) => CriteriaItem[];
    appendCriteria?: (situation: SituationHeuresRechercheEmploi | Situation) => CriteriaItem[];
    getResult: (situation: SituationHeuresRechercheEmploi | Situation) => any;
}

function criteriaToArray(questions: Question[], situation: SituationHeuresRechercheEmploi | Situation): CriteriaItem[] {
    return questions.reduce<CriteriaItem[]>((arr, { question, name, note }) => {
      
      if (!!situation.criteria[name]) {
        const option = situation.criteria[name] ?? "";
        arr.push({ question, name: `criteria.${name}`, option, note, type: "select" });
      }
      
      return arr;
    }, []);
  }
  
  function populateNode({result, criterias}: CriteriaContainer): TreeQuestion {
    const {question, option, note, name, type} = criterias.shift() as CriteriaItem;
    return {
      name,
      text: question,
      note: note,
      options: criterias.length ? [{
        text: option,
        nextQuestion: populateNode({result, criterias}),
        type
      }] : [{
        text: option,
        result,
        type
      }]
    }
  }

  function mergeNodes(question1: TreeQuestion, question2: TreeQuestion): TreeQuestion {
    if (question1.text !== question2.text) {
      return question2;
    }
    let foundOption = question1.options.find(({text}) => text === question2.options[0].text);
    if (!foundOption) {
      question1.options.push(question2.options[0]);
    } else if (foundOption?.nextQuestion && question2.options[0].nextQuestion) {
      foundOption.nextQuestion = mergeNodes(foundOption.nextQuestion, question2.options[0].nextQuestion);
    }
    return question1;
  }

  export function generateTree({situations, questions, prependCriteria = () => ([]), appendCriteria = () => ([]), getResult}: GenerateTreeProps) {
    const questionArray = situations.reduce<CriteriaContainer[]>((arr, situation) => {
      const criteriaArray = criteriaToArray(questions, situation);
      const prependCriterias = prependCriteria(situation);
      const appendCriterias = appendCriteria(situation);
      const criterias = [...prependCriterias, ...criteriaArray, ...appendCriterias];
      arr.push({ result: getResult(situation), criterias: criterias as CriteriaItem[] });
      return arr;
    }, []);
    return questionArray.reduce<TreeQuestion>((tree, questionItem) => {
      return questionItem.criterias.length ? mergeNodes(tree, populateNode(questionItem)) : tree;
    }, populateNode(questionArray[0]));
  }