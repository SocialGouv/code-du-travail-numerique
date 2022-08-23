import styled from "styled-components";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Button, Section, ArrowLink, icons } from "@socialgouv/cdtn-ui";
import { useStore } from "../../store";
import { Response } from "./Response";
import { Tooltip } from "../../../common/Tooltip";

const { DirectionRight } = icons;

export const Question = () => {
  const router = useRouter();
  const currentQuestion = useStore((state) => state.currentQuestion);
  const lastResponse = useStore((state) => state.lastResponse);
  const [openedTooltip, setOpenedTooltip] = useState(false);
  useEffect(() => {
    setOpenedTooltip(false);
  }, [currentQuestion]);
  return lastResponse?.slug ? (
    <ButtonSection>
      <Button
        variant="primary"
        onClick={() => router.push(`/information/${lastResponse?.slug}`)}
      >
        Afficher les informations personnalisées
        <ArrowWrapper>
          <DirectionRight />
        </ArrowWrapper>
      </Button>
    </ButtonSection>
  ) : (
    <QuestionWrapper>
      <QuestionHeaderWrapper>
        <QuestionHeader>{currentQuestion.text}</QuestionHeader>
        {currentQuestion.info && <Tooltip onChange={setOpenedTooltip} />}
      </QuestionHeaderWrapper>
      {openedTooltip && (
        <InformationWrapper>{currentQuestion.info}</InformationWrapper>
      )}
      <RadioWrapper>
        {currentQuestion.responses.map((response, index: number) => (
          <Response
            key={`${response.text}${index}`}
            response={response}
            index={index}
          ></Response>
        ))}
      </RadioWrapper>
      <Description>{currentQuestion.description}</Description>
    </QuestionWrapper>
  );
};

const QuestionWrapper = styled.div`
  border: 0.5px solid #7598d6;
  margin-left: 36px;
  padding: 14px 18px;
`;

const QuestionHeader = styled.div`
  font-weight: 600;
  font-size: 18px;
  line-height: 25px;
  display: flex;
  align-items: center;
  color: #3e486e;
  margin-right: 8px;
`;

const QuestionHeaderWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin: 0 0 11px;
`;

const Description = styled.i`
  display: block;
  margin-top: 7px;
`;

const RadioWrapper = styled.div`
  > div {
    margin: 4px 0;
  }
`;

const InformationWrapper = styled.div`
  background: #f2f5fa;
  border-radius: 6px;
  padding: 13px 20px;
  font-size: 14px;
  margin: 11px 5px;
`;

const ButtonSection = styled(Section)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ArrowWrapper = styled.div`
  width: 28px;
  height: 15px;
  margin-left: 13px;
`;
