import { icons } from "@socialgouv/cdtn-ui";
import { useState } from "react";
import styled from "styled-components";
const { HelpCircle: HelpIcon } = icons;

export const Tooltip = ({ onChange }) => {
  const [opened, setOpened] = useState(false);
  const [hovered, setHovered] = useState(false);
  return (
    <TooltipWrapper
      onClick={() => {
        onChange(!opened);
        setOpened(!opened);
      }}
      onMouseEnter={() => {
        setHovered(true);
      }}
      onMouseLeave={() => {
        setHovered(false);
      }}
      data-testid="tooltip"
    >
      {hovered || opened ? (
        <OpenedTooltipIcon aria-label="?"></OpenedTooltipIcon>
      ) : (
        <TooltipIcon aria-label="?"></TooltipIcon>
      )}
    </TooltipWrapper>
  );
};

const TooltipWrapper = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const OpenedTooltipIcon = styled(HelpIcon)`
  color: #ff7067;
  margin-top: 2px;
  padding: 2px;
`;

const TooltipIcon = styled(HelpIcon)`
  color: #7598d6;
  margin-top: 2px;
  padding: 2px;
`;
