import { useState } from "react";
import styled from "styled-components";
import { InputRadio } from "@socialgouv/cdtn-ui";
import { QuizResponse } from "@cdt/data";
import { useRouter } from "next/router";
import { useQuizStore } from "../store";
import { Tooltip } from "../../common/Tooltip";

export const QuizQuestionnaryItem = ({
  response: { text, description, slug, info },
  index,
}: {
  response: QuizResponse;
  index: number;
}) => {
  const router = useRouter();
  const nextQuestion = useQuizStore((state) => state.nextQuestion);
  const [openedTooltip, setOpenedTooltip] = useState(false);
  return (
    <QuizResponseWrapper>
      <QuizResponseInputWrapper>
        <InputRadio
          id={text}
          name={text}
          label={`${text} ${description ? `(${description})` : ""}`}
          onChange={() =>
            slug ? router.push(`/information/${slug}`) : nextQuestion(index)
          }
        />
        {info && (
          <TooltipWrapper>
            <Tooltip onChange={setOpenedTooltip}></Tooltip>
          </TooltipWrapper>
        )}
      </QuizResponseInputWrapper>
      {openedTooltip && <QuizInformationWrapper>{info}</QuizInformationWrapper>}
    </QuizResponseWrapper>
  );
};

const QuizResponseWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 12px;
`;

const QuizResponseInputWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-right: 12px;
`;

const TooltipWrapper = styled.div`
  margin-left: 8px;
`;

const QuizInformationWrapper = styled.div`
  background: #f2f5fa;
  border-radius: 6px;
  padding: 13px 20px;
  font-size: 14px;
  margin: 5px;
`;
