import { useState } from "react";
import styled from "styled-components";
import { InputRadio } from "@socialgouv/cdtn-ui";
import { useStore } from "../../store";
import { Tooltip } from "../../../common/Tooltip";
import { trackClickHelp } from "../../tracking";
import { QuestionnaireResponse } from "../../type";
import { InfoBulle } from "../../../outils/common/InfoBulle";

export const Response = ({
  response: { text, description, info, trackingName },
  index,
}: {
  response: QuestionnaireResponse;
  index: number;
}) => {
  const answer = useStore((state) => state.answer);
  return (
    <ResponseWrapper>
      <ResponseInputWrapper>
        <StyledRadio
          id={text}
          name={text}
          label={`${text} ${description ? `(${description})` : ""}`}
          onChange={() => {
            answer(index);
          }}
        />
        {info && (
          <StyledInfoBulle title={"Plus d'informations"}>
            {info}
          </StyledInfoBulle>
        )}
      </ResponseInputWrapper>
    </ResponseWrapper>
  );
};

const StyledRadio = styled(InputRadio)`
  float: left;
`;

const StyledInfoBulle = styled(InfoBulle)`
  padding: 0;
`;

const ResponseWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 12px;
`;

const ResponseInputWrapper = styled.div`
  margin-right: 12px;
`;

const InformationWrapper = styled.div`
  background: #f2f5fa;
  border-radius: 6px;
  padding: 13px 20px;
  font-size: 14px;
  margin: 5px;
`;
