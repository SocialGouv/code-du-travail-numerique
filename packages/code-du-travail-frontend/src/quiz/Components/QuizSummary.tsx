import styled from "styled-components";
import { QuizSummaryItem } from "./QuizSummaryItem";
import { useQuizStore } from "../store";
import { QuizQuestion } from "@cdt/data";

const getPastQuestions = (
  data: QuizQuestion,
  current: string
): QuizQuestion[] => {
  if (!current) {
    return [];
  }
  const currentArray = current
    .split(".")
    .map((index: string) => parseInt(index));
  return currentArray.reduce((q: QuizQuestion, index: number) => {
    return q.responses[index].question ?? q;
  }, data);
};

export const QuizSummary = () => {
  const data = useQuizStore((state) => state.questionTree);
  const current = useQuizStore((state) => state.currentQuestion);
  return (
    <QuizSummaryWrapper>
      <QuizSummaryItem></QuizSummaryItem>
      <QuizSummaryItem></QuizSummaryItem>
    </QuizSummaryWrapper>
  );
};

const QuizSummaryWrapper = styled.ul`
  margin: 0;
`;
