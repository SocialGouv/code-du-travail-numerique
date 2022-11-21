import { useState } from "react";
import styled from "styled-components";
import { InputRadio, theme } from "@socialgouv/cdtn-ui";
import { QuestionnaireResponse } from "@socialgouv/modeles-social";
import { useStore } from "../../store";
import { Tooltip } from "../../../common/Tooltip";
import { trackClickHelp } from "../../tracking";
const { breakpoints } = theme;

export const Response = ({
  response: { text, description, info, trackingName },
  index,
}: {
  response: QuestionnaireResponse;
  index: number;
}) => {
  const answer = useStore((state) => state.answer);
  const [openedTooltip, setOpenedTooltip] = useState(false);
  return (
    <ResponseWrapper>
      <ResponseInputWrapper>
        <InputRadio
          id={text}
          name={text}
          label={`${text} ${description ? `(${description})` : ""}`}
          onChange={() => {
            answer(index);
          }}
        />
        {info && (
          <TooltipWrapper>
            <Tooltip
              onChange={(opened) => {
                setOpenedTooltip(opened);
                if (opened) {
                  trackClickHelp(trackingName);
                }
              }}
              data-testid={`Tooltip-${text}`}
            ></Tooltip>
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
  display: flex;
  align-items: center;
  justify-content: center;
`;

const InformationWrapper = styled.div`
  background: #f2f5fa;
  border-radius: 6px;
  padding: 13px 20px;
  font-size: 14px;
  margin: 5px;
`;
