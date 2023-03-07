import styled from "styled-components";
import { useStore } from "../../store";
import { Response } from "./Response";
import { ShowInfo } from "./ShowInfo";
import { Fieldset, Legend } from "@socialgouv/cdtn-ui";
import { InfoBulle } from "../../../outils/common/InfoBulle";
import { trackClickHelp } from "../../tracking";

type QuestionProps = {
  widgetMode: boolean;
};

export const Question = ({ widgetMode }: QuestionProps) => {
  const currentQuestion = useStore((state) => state.currentQuestion);
  const lastResponse = useStore((state) => state.lastResponse);
  return lastResponse?.slug ? (
    <ShowInfo slug={lastResponse.slug} widgetMode={widgetMode}></ShowInfo>
  ) : (
    <Fieldset>
      <QuestionHeaderWrapper>
        <LegendWrapper>{currentQuestion?.text}</LegendWrapper>
        {currentQuestion?.info && (
          <StyledInfoBulle
            title={"Plus d'informations"}
            dataTestid={`Tooltip-${currentQuestion?.text}`}
            onVisibilityChange={() => {
              trackClickHelp(currentQuestion.trackingName);
            }}
          >
            {currentQuestion?.info}
          </StyledInfoBulle>
        )}
      </QuestionHeaderWrapper>

      {currentQuestion?.responses.map((response, index: number) => (
        <Response
          key={`${response.text}${index}`}
          response={response}
          index={index}
        ></Response>
      ))}
      <Description>{currentQuestion?.description}</Description>
    </Fieldset>
  );
};

const StyledInfoBulle = styled(InfoBulle)`
  padding: 0;
`;

const LegendWrapper = styled(Legend)`
  font-weight: 600;
  float: left;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const QuestionHeaderWrapper = styled.div`
  margin: 0 0 11px;
  display: inline-block;
`;

const Description = styled.i`
  display: block;
  margin-top: 7px;
`;

const InformationWrapper = styled.div`
  background: #f2f5fa;
  border-radius: 6px;
  padding: 13px 20px;
  font-size: 14px;
  margin: 11px 5px;
`;
