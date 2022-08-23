import { useState } from "react";
import styled from "styled-components";
import { InputRadio } from "@socialgouv/cdtn-ui";
import { QuestionnaireResponse } from "@cdt/data";
import { useRouter } from "next/router";
import { useStore } from "../../store";
import { Tooltip } from "../../../common/Tooltip";

export const Response = ({
  response: { text, description, slug, info },
  index,
}: {
  response: QuestionnaireResponse;
  index: number;
}) => {
  const router = useRouter();
  const nextQuestion = useStore((state) => state.nextQuestion);
  const [openedTooltip, setOpenedTooltip] = useState(false);
  return (
    <ResponseWrapper>
      <ResponseInputWrapper>
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
      </ResponseInputWrapper>
      {openedTooltip && <InformationWrapper>{info}</InformationWrapper>}
    </ResponseWrapper>
  );
};

const ResponseWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 12px;
`;

const ResponseInputWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-right: 12px;
`;

const TooltipWrapper = styled.div`
  margin-left: 8px;
`;

const InformationWrapper = styled.div`
  background: #f2f5fa;
  border-radius: 6px;
  padding: 13px 20px;
  font-size: 14px;
  margin: 5px;
`;
