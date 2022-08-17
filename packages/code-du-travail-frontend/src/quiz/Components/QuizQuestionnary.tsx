import styled from "styled-components";
import { InputRadio } from "@socialgouv/cdtn-ui";
import { QuizQuestion } from "@cdt/data";
import { useQuizStore } from "../store";

const getQuestion = (data: QuizQuestion, current: string): QuizQuestion => {
  if (!current) {
    return data;
  }
  const currentArray = current
    .split(".")
    .map((index: string) => parseInt(index));
  return currentArray.reduce((q: QuizQuestion, index: number) => {
    return q.responses[index].question ?? q;
  }, data);
};

export const QuizQuestionnary = () => {
  const data = useQuizStore((state) => state.questionTree);
  const current = useQuizStore((state) => state.currentQuestion);
  const nextQuestion = useQuizStore((state) => state.nextQuestion);
  const question = getQuestion(data, current);
  return (
    <QuizQuestionWrapper>
      <QuizQuestionHeader>{question.text} : </QuizQuestionHeader>
      <QuizRadioWrapper>
        {question.responses.map(({ text, description }, index) => (
          <InputRadio
            key={`${text}.${index}`}
            label={`${text} ${description ? `(${description})` : ""}`}
            onChange={() => nextQuestion(index)}
          />
        ))}
      </QuizRadioWrapper>
      <QuizDescription>
        Les informations données sont identiques quel que soit votre profil.
        Seule la formulation des questions peut être différente afin de vous
        guider au mieux dans ce parcours.
      </QuizDescription>
    </QuizQuestionWrapper>
  );
};

const QuizQuestionWrapper = styled.div`
  border: 0.5px solid #7598d6;
  margin-left: 36px;
  padding: 14px 18px;
`;

const QuizQuestionHeader = styled.h3`
  margin: 0 0 11px;
`;

const QuizDescription = styled.i`
  display: block;
  margin-top: 7px;
`;

const QuizRadioWrapper = styled.div`
  > div {
    margin: 4px 0;
  }
`;
